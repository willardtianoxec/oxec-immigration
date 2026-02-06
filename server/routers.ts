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
  }),

  // Immigration calculator
  calculator: router({
    calculateCRS: publicProcedure
      .input(z.object({
        age: z.number().min(18).max(100),
        education: z.enum(["high-school", "one-year", "two-year", "bachelor", "master", "phd"]),
        canadianEducation: z.boolean(),
        workExperience: z.number().min(0).max(20),
        canadianWorkExperience: z.number().min(0).max(10),
        languageTest: z.enum(["ielts", "celpip", "tef", "tcf"]),
        listening: z.number().min(0).max(9),
        reading: z.number().min(0).max(9),
        writing: z.number().min(0).max(9),
        speaking: z.number().min(0).max(9),
        hasSpouse: z.boolean(),
        spouseEducation: z.enum(["none", "high-school", "bachelor", "master"]).optional(),
        spouseWorkExperience: z.number().min(0).max(10).optional(),
        spouseLanguageScore: z.number().min(0).max(9).optional(),
        hasJobOffer: z.boolean(),
        hasProvincialNomination: z.boolean(),
      }))
      .query(({ input }) => {
        // CRS calculation logic
        let crs = 0;

        // Age points (max 132)
        const agePoints = [0, 0, 99, 105, 110, 109, 108, 107, 106, 103, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 19, 18, 17, 16, 15];
        if (input.age < agePoints.length) {
          crs += agePoints[input.age];
        }

        // Education points (max 150)
        const educationPoints: Record<string, number> = {
          "high-school": 30,
          "one-year": 64,
          "two-year": 104,
          "bachelor": 120,
          "master": 128,
          "phd": 135,
        };
        crs += educationPoints[input.education] || 0;
        if (input.canadianEducation) crs += 15;

        // Work experience points (max 80)
        crs += Math.min(input.workExperience * 2, 80);
        if (input.canadianWorkExperience > 0) crs += Math.min(input.canadianWorkExperience * 2, 20);

        // Language points (max 136)
        const languagePoints = input.listening + input.reading + input.writing + input.speaking;
        crs += Math.min(languagePoints * 2, 136);

        // Spouse points
        if (input.hasSpouse && input.spouseEducation) {
          const spouseEducationPoints: Record<string, number> = {
            "none": 0,
            "high-school": 13,
            "bachelor": 25,
            "master": 32,
          };
          crs += spouseEducationPoints[input.spouseEducation] || 0;
          if (input.spouseWorkExperience) crs += Math.min(input.spouseWorkExperience, 15);
          if (input.spouseLanguageScore) crs += Math.min(input.spouseLanguageScore * 2, 20);
        }

        // Job offer and provincial nomination
        if (input.hasJobOffer) crs += 50;
        if (input.hasProvincialNomination) crs += 600;

        const totalScore = Math.round(crs);
        const eligible = totalScore >= 470;

        // Build breakdown object
        const breakdown: Record<string, number> = {};
        breakdown['Age'] = input.age < agePoints.length ? agePoints[input.age] : 0;
        breakdown['Education'] = educationPoints[input.education] || 0;
        if (input.canadianEducation) breakdown['Canadian Education'] = 15;
        breakdown['Work Experience'] = Math.min(input.workExperience * 2, 80);
        if (input.canadianWorkExperience > 0) breakdown['Canadian Work Experience'] = Math.min(input.canadianWorkExperience * 2, 20);
        breakdown['Language Skills'] = Math.min(languagePoints * 2, 136);
        if (input.hasJobOffer) breakdown['Job Offer'] = 50;
        if (input.hasProvincialNomination) breakdown['Provincial Nomination'] = 600;

        let message = '';
        if (totalScore >= 500) {
          message = 'Excellent! Your score is competitive for recent draws.';
        } else if (totalScore >= 470) {
          message = 'Good! You may be eligible for Express Entry.';
        } else if (totalScore >= 400) {
          message = 'Fair. Consider improving your profile.';
        } else {
          message = 'Below typical cutoff. Focus on improving your skills.';
        }

        return {
          totalScore,
          eligible,
          message,
          breakdown,
        };
      }),
  }),

  // Blog management
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
        // Helper function to convert language scores to CLB
        const convertToCLB = (listening: number, reading: number, writing: number, speaking: number, testType: string): number => {
          let clbs: number[] = [];
          
          if (testType === "ielts") {
            // IELTS conversion
            const listeningCLB = listening >= 8.5 ? 10 : listening >= 8 ? 9 : listening >= 7.5 ? 8 : listening >= 6.5 ? 7 : listening >= 5.5 ? 6 : listening >= 5 ? 5 : listening >= 4.5 ? 4 : 0;
            const readingCLB = reading >= 8 ? 10 : reading >= 7.5 ? 9 : reading >= 6.5 ? 8 : reading >= 6 ? 7 : reading >= 5.5 ? 6 : reading >= 4.5 ? 5 : reading >= 3.5 ? 4 : 0;
            const writingCLB = writing >= 7.5 ? 10 : writing >= 7 ? 9 : writing >= 6.5 ? 8 : writing >= 6 ? 7 : writing >= 5.5 ? 6 : writing >= 5 ? 5 : writing >= 4 ? 4 : 0;
            const speakingCLB = speaking >= 7.5 ? 10 : speaking >= 7 ? 9 : speaking >= 6.5 ? 8 : speaking >= 6 ? 7 : speaking >= 5.5 ? 6 : speaking >= 5 ? 5 : speaking >= 4 ? 4 : 0;
            clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
          } else if (testType === "celpip") {
            // CELPIP conversion
            const listeningCLB = listening >= 10 ? 10 : listening >= 9 ? 9 : listening >= 8 ? 8 : listening >= 7 ? 7 : listening >= 6 ? 6 : listening >= 5 ? 5 : listening >= 4 ? 4 : 0;
            const readingCLB = reading >= 10 ? 10 : reading >= 9 ? 9 : reading >= 8 ? 8 : reading >= 7 ? 7 : reading >= 6 ? 6 : reading >= 5 ? 5 : reading >= 4 ? 4 : 0;
            const writingCLB = writing >= 10 ? 10 : writing >= 9 ? 9 : writing >= 8 ? 8 : writing >= 7 ? 7 : writing >= 6 ? 6 : writing >= 5 ? 5 : writing >= 4 ? 4 : 0;
            const speakingCLB = speaking >= 10 ? 10 : speaking >= 9 ? 9 : speaking >= 8 ? 8 : speaking >= 7 ? 7 : speaking >= 6 ? 6 : speaking >= 5 ? 5 : speaking >= 4 ? 4 : 0;
            clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
          } else if (testType === "pte") {
            // PTE conversion
            const listeningCLB = listening >= 89 ? 10 : listening >= 82 ? 9 : listening >= 71 ? 8 : listening >= 60 ? 7 : listening >= 50 ? 6 : listening >= 39 ? 5 : listening >= 28 ? 4 : 0;
            const readingCLB = reading >= 88 ? 10 : reading >= 78 ? 9 : reading >= 69 ? 8 : reading >= 60 ? 7 : reading >= 51 ? 6 : reading >= 42 ? 5 : reading >= 33 ? 4 : 0;
            const writingCLB = writing >= 90 ? 10 : writing >= 88 ? 9 : writing >= 79 ? 8 : writing >= 69 ? 7 : writing >= 60 ? 6 : writing >= 51 ? 5 : writing >= 41 ? 4 : 0;
            const speakingCLB = speaking >= 89 ? 10 : speaking >= 84 ? 9 : speaking >= 76 ? 8 : speaking >= 68 ? 7 : speaking >= 59 ? 6 : speaking >= 51 ? 5 : speaking >= 42 ? 4 : 0;
            clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
          }
          
          return Math.min(...clbs);
        };
        
        let score = 0;
        const breakdown: Record<string, number> = {};
        
        // Human Capital Factors (max 40)
        const workExperiencePoints: Record<string, number> = {
          "5plus": 20,
          "4to5": 16,
          "3to4": 12,
          "2to3": 8,
          "1to2": 4,
          "below1": 1,
          "none": 0,
        };
        const workExp = workExperiencePoints[input.workExperience] || 0;
        score += workExp;
        breakdown["Work Experience"] = workExp;
        
        if (input.canadianExperience) {
          score += 10;
          breakdown["Canadian Experience"] = 10;
        }
        
        if (input.currentlyWorking) {
          score += 10;
          breakdown["Currently Working in Canada"] = 10;
        }
        
        const educationPoints: Record<string, number> = {
          "phd": 27,
          "masters": 22,
          "postgrad": 15,
          "bachelor": 15,
          "associate": 5,
          "diploma": 5,
          "highschool": 0,
        };
        const edu = educationPoints[input.education] || 0;
        score += edu;
        breakdown["Education"] = edu;
        
        if (input.bcEducation) {
          score += 8;
          breakdown["BC Education"] = 8;
        }
        
        if (input.canadaEducation) {
          score += 6;
          breakdown["Canada Education"] = 6;
        }
        
        if (input.designatedOccupation) {
          score += 5;
          breakdown["Designated Occupation"] = 5;
        }
        
        // Language Skills (max 40)
        const clb = convertToCLB(input.listening, input.reading, input.writing, input.speaking, input.languageTest);
        const languagePoints: Record<number, number> = {
          10: 30,
          9: 30,
          8: 25,
          7: 20,
          6: 15,
          5: 10,
          4: 5,
        };
        const langScore = languagePoints[clb] || 0;
        score += langScore;
        breakdown["Language Skills (CLB " + clb + ")"] = langScore;
        
        if (input.frenchLanguage) {
          score += 10;
          breakdown["French Language"] = 10;
        }
        
        // Economic Factors
        const wage = Math.ceil(input.hourlyWage);
        let wageScore = 0;
        if (wage >= 70) {
          wageScore = 55;
        } else if (wage >= 16) {
          wageScore = wage - 15;
        }
        score += wageScore;
        breakdown["Hourly Wage"] = wageScore;
        
        const regionPoints: Record<string, number> = {
          "tier1": 0,
          "tier2": 5,
          "tier3": 15,
        };
        const regionScore = regionPoints[input.region] || 0;
        score += regionScore;
        breakdown["Region"] = regionScore;
        
        if (input.regionWorkExperience || input.regionEducation) {
          score += 10;
          breakdown["Region Work/Education Experience"] = 10;
        }
        
        const totalScore = Math.round(score);
        
        return {
          totalScore,
          breakdown,
          message: totalScore >= 80 ? "Excellent! You have a strong profile for BC PNP." : totalScore >= 60 ? "Good! You may be eligible for BC PNP." : "Consider improving your profile for better chances.",
        };
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
  }),
});

export type AppRouter = typeof appRouter;
