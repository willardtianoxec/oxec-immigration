import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createAppointment,
  getAppointments,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPosts,
  getBlogPostBySlug,
  searchBlogPosts,
  createSuccessCase,
  updateSuccessCase,
  deleteSuccessCase,
  getSuccessCases,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostBySlug,
  getPosts,
  searchPosts,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { sendAppointmentEmail } from "./_core/emailService";
import { calculateCRS as calculateCRSLogic } from "./crsCalculator";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),

  // Appointment booking
  appointments: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        consultationSubject: z.string().min(1),
        consultationType: z.enum(["phone", "in-person"]),
        preferredDate: z.date().optional(),
        preferredTimeSlots: z.string().optional(),
        gender: z.string().optional(),
        maritalStatus: z.string().optional(),
        education: z.string().optional(),
        englishLevel: z.string().optional(),
        hasExamScore: z.boolean().optional(),
        workExperience: z.string().optional(),
        hasRefusal: z.boolean().optional(),
        refusalReason: z.string().optional(),
        hasCriminalRecord: z.boolean().optional(),
        criminalRecordDetails: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createAppointment(input);
        
        // Send email to Business@oxecimm.com
        await sendAppointmentEmail(input);
        
        // Notify owner
        await notifyOwner({
          title: "新预约申请 - " + input.name,
          content: `新预约申请来自 ${input.name} (${input.email})\n预约事项: ${input.consultationSubject}\n咨询方式: ${input.consultationType === 'phone' ? '电话咨询' : '线下咨询'}\n预约时间段: ${input.preferredTimeSlots || '未指定'}`,
        });
        
        return { success: true };
      }),
    
    list: adminProcedure.query(async () => {
      return await getAppointments();
    }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),

  // Immigration calculator
  calculator: router({
    calculateCRS: publicProcedure
      .input(z.object({
        familyStatus: z.enum(["single", "married-no-spouse", "married-with-spouse"]),
        age: z.number().min(17).max(100),
        education: z.enum(["phd", "masters", "double", "bachelor", "two-year", "one-year", "highschool", "below"]),
        canadianEducation: z.enum(["none", "1-2year", "3plus"]).optional(),
        primaryLanguage: z.enum(["english", "french"]),
        languageTest: z.enum(["ielts", "celpip", "pte", "tef", "tcf"]),
        listening: z.number().min(0).max(600),
        reading: z.number().min(0).max(600),
        writing: z.number().min(0).max(600),
        speaking: z.number().min(0).max(600),
        secondaryLanguage: z.enum(["english", "french", "none"]).optional(),
        secondLanguageTest: z.enum(["none", "ielts", "celpip", "pte", "tef", "tcf"]).optional(),
        secondListening: z.number().min(0).max(600).optional(),
        secondReading: z.number().min(0).max(600).optional(),
        secondWriting: z.number().min(0).max(600).optional(),
        secondSpeaking: z.number().min(0).max(600).optional(),
        canadianWorkExperience: z.enum(["none", "1year", "2year", "3year", "4year", "5plus"]),
        canadianTradeCertificate: z.boolean().optional(),
        overseasWorkExperience: z.enum(["none", "1year", "2year", "3plus"]).optional(),
        hasSiblingInCanada: z.boolean().optional(),
        hasProvincialNomination: z.boolean().optional(),
        spouseAge: z.number().min(17).max(100).optional(),
        spouseEducation: z.enum(["phd", "masters", "double", "bachelor", "two-year", "one-year", "highschool", "below"]).optional(),
        spouseLanguageTest: z.enum(["none", "ielts", "celpip", "pte", "tef", "tcf"]).optional(),
        spouseListening: z.number().min(0).max(600).optional(),
        spouseReading: z.number().min(0).max(600).optional(),
        spouseWriting: z.number().min(0).max(600).optional(),
        spouseSpeaking: z.number().min(0).max(600).optional(),
        spouseCanadianWorkExperience: z.enum(["none", "1year", "2year", "3year", "4year", "5plus"]).optional(),
        spouseTradeCertificate: z.boolean().optional(),
        spouseOverseasWorkExperience: z.enum(["none", "1year", "2year", "3plus"]).optional(),
      }))
      .query(({ input }) => {
        return calculateCRSLogic(input);
      }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),

  // Blog managementt
  blog: router({
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        category: z.string().optional(),
        coverImage: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createBlogPost({
          ...input,
          published: false,
          authorId: ctx.user.id,
        });
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().min(1).optional(),
        category: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateBlogPost(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteBlogPost(input.id);
      }),

    list: publicProcedure
      .input(z.object({ publishedOnly: z.boolean().optional() }).optional())
      .query(async ({ input }) => {
        const posts = await getBlogPosts();
        if (input?.publishedOnly) {
          return posts.filter(p => p.published);
        }
        return posts;
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getBlogPostBySlug(input.slug);
      }),

    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await searchBlogPosts(input.query);
      }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),

  // Success cases management
  successCases: router({
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        caseType: z.string().min(1),
        clientBackground: z.string().min(1),
        challenge: z.string().optional(),
        solution: z.string().min(1),
        outcome: z.string().min(1),
        coverImage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createSuccessCase({
          ...input,
          published: false,
        });
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        caseType: z.string().min(1).optional(),
        clientBackground: z.string().min(1).optional(),
        challenge: z.string().optional(),
        solution: z.string().min(1).optional(),
        outcome: z.string().min(1).optional(),
        coverImage: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateSuccessCase(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteSuccessCase(input.id);
      }),

    list: publicProcedure
      .input(z.object({ publishedOnly: z.boolean().optional() }).optional())
      .query(async ({ input }) => {
        const cases = await getSuccessCases();
        if (input?.publishedOnly) {
          return cases.filter(c => c.published);
        }
        return cases;
      }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),

  // Unified posts management (CMS)
  posts: router({
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        subtitle: z.string().optional(),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        type: z.enum(["blog", "success-case"]),
        category: z.string().optional(),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createPost({
          ...input,
          published: false,
          authorId: ctx.user.id,
        });
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        subtitle: z.string().optional(),
        slug: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.boolean().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updatePost(id, data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deletePost(input.id);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getPostById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getPostBySlug(input.slug);
      }),

    list: publicProcedure
      .input(z.object({
        type: z.enum(["blog", "success-case"]).optional(),
        category: z.string().optional(),
        publishedOnly: z.boolean().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await getPosts({
          type: input?.type,
          category: input?.category,
          publishedOnly: input?.publishedOnly ?? true,
        });
      }),

    search: publicProcedure
      .input(z.object({
        query: z.string(),
        type: z.enum(["blog", "success-case"]).optional(),
        category: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return await searchPosts(input.query, {
          type: input.type,
          category: input.category,
        });
      }),
    calculateBCPNP: publicProcedure
      .input(z.object({
        workExperience: z.enum(["5plus", "4to5", "3to4", "2to3", "1to2", "below1", "none"]),
        canadianExperience: z.boolean(),
        currentlyWorking: z.boolean(),
        education: z.enum(["phd", "masters", "postgrad", "bachelor", "associate", "diploma", "highschool"]),
        bcEducation: z.boolean(),
        canadaEducation: z.boolean(),
        designatedOccupation: z.boolean(),
        languageTest: z.enum(["ielts", "celpip", "pte"]),
        listening: z.number().min(0).max(100),
        reading: z.number().min(0).max(100),
        writing: z.number().min(0).max(100),
        speaking: z.number().min(0).max(100),
        frenchLanguage: z.boolean(),
        hourlyWage: z.number().min(0),
        region: z.enum(["tier1", "tier2", "tier3"]),
        regionWorkExperience: z.boolean(),
        regionEducation: z.boolean(),
      }))
      .query(({ input }) => {
        const breakdown: Record<string, any> = {
          相关工作经验: 0,
          学历背景: 0,
          语言能力: 0,
          经济因素: 0,
        };
        const details: Record<string, number> = {};
        
        // 相关工作经验（满分40分）
        const workExperiencePoints: Record<string, number> = { "5plus": 20, "4to5": 16, "3to4": 12, "2to3": 8, "1to2": 4, "below1": 1, "none": 0 };
        let workExpScore = workExperiencePoints[input.workExperience] || 0;
        details["相关工作经验"] = workExpScore;
        
        let canadianExpScore = 0;
        if (input.canadianExperience) { canadianExpScore = 10; details["加拿大相关经验"] = 10; }
        
        let currentWorkScore = 0;
        if (input.currentlyWorking) { currentWorkScore = 10; details["目前在加拿大同岗位全职工作"] = 10; }
        
        breakdown["相关工作经验"] = Math.min(40, workExpScore + canadianExpScore + currentWorkScore);
        
        // 学历背景（满分40分）
        const educationPoints: Record<string, number> = { "phd": 27, "masters": 22, "postgrad": 15, "bachelor": 15, "associate": 5, "diploma": 5, "highschool": 0 };
        let eduScore = educationPoints[input.education] || 0;
        details["最高学历"] = eduScore;
        
        let bcEduScore = 0;
        if (input.bcEducation) { bcEduScore = 8; details["在BC省完成高等教育"] = 8; }
        
        let canadaEduScore = 0;
        if (input.canadaEducation) { canadaEduScore = 6; details["在加拿大完成高等教育"] = 6; }
        
        let designatedScore = 0;
        if (input.designatedOccupation) { designatedScore = 5; details["属于符合资质的指定职业"] = 5; }
        
        breakdown["学历背景"] = Math.min(40, eduScore + bcEduScore + canadaEduScore + designatedScore);
        
        // 语言能力（满分40分）
        const clb = Math.min(input.listening, input.reading, input.writing, input.speaking);
        const languagePoints: Record<number, number> = { 10: 30, 9: 30, 8: 25, 7: 20, 6: 15, 5: 10, 4: 5 };
        let langScore = languagePoints[Math.floor(clb)] || 0;
        details["考试成绩"] = langScore;
        
        let frenchScore = 0;
        if (input.frenchLanguage) { frenchScore = 10; details["法语CLB 4以上"] = 10; }
        
        breakdown["语言能力"] = Math.min(40, langScore + frenchScore);
        
        // 经济因素（时薪满分55分 + 地区满分25分 = 80分）
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) { wageScore = 55; } else if (wage >= 16) { wageScore = Math.min(55, wage - 15); }
        details["时薪"] = wageScore;
        
        const regionPoints: Record<string, number> = { "tier1": 0, "tier2": 5, "tier3": 15 };
        let regionScore = regionPoints[input.region] || 0;
        details["工作地区"] = regionScore;
        
        let regionExpScore = 0;
        if (input.regionWorkExperience) { regionExpScore = Math.min(10, 10); details["过去5年在二/三类地区工作满一年"] = 10; }
        
        let regionEduScore = 0;
        if (input.regionEducation) { regionEduScore = Math.min(10, 10); details["过去3年在二/三类地区公立高校毕业"] = 10; }
        
        breakdown["经济因素"] = Math.min(80, wageScore + regionScore + regionExpScore + regionEduScore);
        
        const totalScore = breakdown["相关工作经验"] + breakdown["学历背景"] + breakdown["语言能力"] + breakdown["经济因素"];
        
        return { totalScore, breakdown, details, message: totalScore >= 80 ? "优秀！您具有很强的BC PNP申请资格。" : totalScore >= 60 ? "良好！您可能符合BC PNP申请条件。" : "建议改进您的申请资料以获得更好的机会。" };
      }),

  }),
});

export type AppRouter = typeof appRouter;
