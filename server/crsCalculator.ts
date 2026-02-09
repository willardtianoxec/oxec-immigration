/**
 * CRS Calculator for Federal Express Entry
 * Supports both Scheme A (single/no spouse) and Scheme B (with spouse)
 */

// CLB conversion helper for all language tests
export const convertToCLB = (
  listening: number,
  reading: number,
  writing: number,
  speaking: number,
  testType: string
): number[] => {
  let clbs: number[] = [];

  if (testType === "ielts") {
    const listeningCLB =
      listening >= 8.5
        ? 10
        : listening >= 8
          ? 9
          : listening >= 7.5
            ? 8
            : listening >= 6.5
              ? 7
              : listening >= 6
                ? 7
                : listening >= 5.5
                  ? 6
                  : listening >= 5
                    ? 5
                    : listening >= 4.5
                      ? 4
                      : 0;
    const readingCLB =
      reading >= 8
        ? 10
        : reading >= 7.5
          ? 9
          : reading >= 7
            ? 9
            : reading >= 6.5
              ? 8
              : reading >= 6
                ? 7
                : reading >= 5.5
                  ? 6
                  : reading >= 5
                    ? 5
                    : reading >= 4.5
                      ? 5
                      : reading >= 4
                        ? 4
                        : reading >= 3.5
                          ? 4
                          : 0;
    // Writing: 7.5+ = CLB 10, 7.0 = CLB 9, 6.5 = CLB 8, 6.0 = CLB 7, 5.5 = CLB 6, 5.0 = CLB 5, 4.0/4.5 = CLB 4
    const writingCLB =
      writing >= 7.5
        ? 10
        : writing >= 7
          ? 9
          : writing >= 6.5
            ? 8
            : writing >= 6
              ? 7
              : writing >= 5.5
                ? 6
                : writing >= 5
                  ? 5
                  : writing >= 4
                    ? 4
                    : 0;
    // Speaking: 7.5+ = CLB 10, 7.0 = CLB 9, 6.5 = CLB 8, 6.0 = CLB 7, 5.5 = CLB 6, 5.0 = CLB 5, 4.0/4.5 = CLB 4
    const speakingCLB =
      speaking >= 7.5
        ? 10
        : speaking >= 7
          ? 9
          : speaking >= 6.5
            ? 8
            : speaking >= 6
              ? 7
              : speaking >= 5.5
                ? 6
                : speaking >= 5
                  ? 5
                  : speaking >= 4
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "celpip") {
    // IELTS CLB conversion table (corrected)
    // Listening: 8.5+ = CLB 10, 8.0 = CLB 9, 7.5 = CLB 8, 6.0-7.0 = CLB 7, 5.5 = CLB 6, 5.0 = CLB 5, 4.5 = CLB 4
    const listeningCLB =
      listening >= 8.5
        ? 10
        : listening >= 8
          ? 9
          : listening >= 7.5
            ? 8
            : listening >= 6
              ? 7
              : listening >= 5.5
                ? 6
                : listening >= 5
                  ? 5
                  : listening >= 4.5
                    ? 4
                    : 0;
    // Reading: 8.0+ = CLB 10, 7.0/7.5 = CLB 9, 6.5 = CLB 8, 6.0 = CLB 7, 5.0/5.5 = CLB 6, 4.0/4.5 = CLB 5, 3.5 = CLB 4
    const readingCLB =
      reading >= 8
        ? 10
        : reading >= 7
          ? 9
          : reading >= 6.5
            ? 8
            : reading >= 6
              ? 7
              : reading >= 5
                ? 6
                : reading >= 4
                  ? 5
                  : reading >= 3.5
                    ? 4
                    : 0;
    // Writing: 7.5+ = CLB 10, 7.0 = CLB 9, 6.5 = CLB 8, 6.0 = CLB 7, 5.5 = CLB 6, 5.0 = CLB 5, 4.0/4.5 = CLB 4
    const writingCLB =
      writing >= 7.5
        ? 10
        : writing >= 7
          ? 9
          : writing >= 6.5
            ? 8
            : writing >= 6
              ? 7
              : writing >= 5.5
                ? 6
                : writing >= 5
                  ? 5
                  : writing >= 4
                    ? 4
                    : 0;
    // Speaking: 7.5+ = CLB 10, 7.0 = CLB 9, 6.5 = CLB 8, 6.0 = CLB 7, 5.5 = CLB 6, 5.0 = CLB 5, 4.0/4.5 = CLB 4
    const speakingCLB =
      speaking >= 7.5
        ? 10
        : speaking >= 7
          ? 9
          : speaking >= 6.5
            ? 8
            : speaking >= 6
              ? 7
              : speaking >= 5.5
                ? 6
                : speaking >= 5
                  ? 5
                  : speaking >= 4
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "pte") {
    const listeningCLB =
      listening >= 89
        ? 10
        : listening >= 82
          ? 9
          : listening >= 71
            ? 8
            : listening >= 60
              ? 7
              : listening >= 50
                ? 6
                : listening >= 39
                  ? 5
                  : listening >= 28
                    ? 4
                    : 0;
    const readingCLB =
      reading >= 88
        ? 10
        : reading >= 78
          ? 9
          : reading >= 69
            ? 8
            : reading >= 60
              ? 7
              : reading >= 51
                ? 6
                : reading >= 42
                  ? 5
                  : reading >= 33
                    ? 4
                    : 0;
    const writingCLB =
      writing >= 90
        ? 10
        : writing >= 88
          ? 9
          : writing >= 79
            ? 8
            : writing >= 69
              ? 7
              : writing >= 60
                ? 6
                : writing >= 51
                  ? 5
                  : writing >= 41
                    ? 4
                    : 0;
    const speakingCLB =
      speaking >= 89
        ? 10
        : speaking >= 84
          ? 9
          : speaking >= 76
            ? 8
            : speaking >= 68
              ? 7
              : speaking >= 59
                ? 6
                : speaking >= 51
                  ? 5
                  : speaking >= 42
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "tef") {
    // TEF/TCF Listening: 546-699 = CLB 10, 503-545 = CLB 9, 462-502 = CLB 8, 434-461 = CLB 7, 393-433 = CLB 6, 352-392 = CLB 5, 306-351 = CLB 4
    const listeningCLB =
      listening >= 546
        ? 10
        : listening >= 503
          ? 9
          : listening >= 462
            ? 8
            : listening >= 434
              ? 7
              : listening >= 393
                ? 6
                : listening >= 352
                  ? 5
                  : listening >= 306
                    ? 4
                    : 0;
    // TEF/TCF Reading: 546-699 = CLB 10, 503-545 = CLB 9, 462-502 = CLB 8, 434-461 = CLB 7, 393-433 = CLB 6, 352-392 = CLB 5, 306-351 = CLB 4
    const readingCLB =
      reading >= 546
        ? 10
        : reading >= 503
          ? 9
          : reading >= 462
            ? 8
            : reading >= 434
              ? 7
              : reading >= 393
                ? 6
                : reading >= 352
                  ? 5
                  : reading >= 306
                    ? 4
                    : 0;
    // TEF/TCF Writing: 558-699 = CLB 10, 512-557 = CLB 9, 472-511 = CLB 8, 428-471 = CLB 7, 379-427 = CLB 6, 330-378 = CLB 5, 268-329 = CLB 4
    const writingCLB =
      writing >= 558
        ? 10
        : writing >= 512
          ? 9
          : writing >= 472
            ? 8
            : writing >= 428
              ? 7
              : writing >= 379
                ? 6
                : writing >= 330
                  ? 5
                  : writing >= 268
                    ? 4
                    : 0;
    // TEF/TCF Speaking: 556-699 = CLB 10, 518-555 = CLB 9, 494-517 = CLB 8, 456-493 = CLB 7, 422-455 = CLB 6, 387-421 = CLB 5, 328-386 = CLB 4
    const speakingCLB =
      speaking >= 556
        ? 10
        : speaking >= 518
          ? 9
          : speaking >= 494
            ? 8
            : speaking >= 456
              ? 7
              : speaking >= 422
                ? 6
                : speaking >= 387
                  ? 5
                  : speaking >= 328
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "tcf") {
    // TCF Listening (0-699): 549+ = CLB 10, 523-548 = CLB 9, 503-522 = CLB 8, 458-502 = CLB 7, 398-457 = CLB 6, 369-397 = CLB 5, 331-368 = CLB 4
    const listeningCLB =
      listening >= 549
        ? 10
        : listening >= 523
          ? 9
          : listening >= 503
            ? 8
            : listening >= 458
              ? 7
              : listening >= 398
                ? 6
                : listening >= 369
                  ? 5
                  : listening >= 331
                    ? 4
                    : 0;
    // TCF Reading (0-699): 549+ = CLB 10, 524-548 = CLB 9, 499-523 = CLB 8, 453-498 = CLB 7, 406-452 = CLB 6, 375-405 = CLB 5, 342-374 = CLB 4
    const readingCLB =
      reading >= 549
        ? 10
        : reading >= 524
          ? 9
          : reading >= 499
            ? 8
            : reading >= 453
              ? 7
              : reading >= 406
                ? 6
                : reading >= 375
                  ? 5
                  : reading >= 342
                    ? 4
                    : 0;
    // TCF Writing: 16-20 = CLB 10, 14-15 = CLB 9, 12-13 = CLB 8, 10-11 = CLB 7, 7-9 = CLB 6, 6 = CLB 5, 4-5 = CLB 4
    const writingCLB =
      writing >= 16
        ? 10
        : writing >= 14
          ? 9
          : writing >= 12
            ? 8
            : writing >= 10
              ? 7
              : writing >= 7
                ? 6
                : writing >= 6
                  ? 5
                  : writing >= 4
                    ? 4
                    : 0;
    // TCF Speaking: 16-20 = CLB 10, 14-15 = CLB 9, 12-13 = CLB 8, 10-11 = CLB 7, 7-9 = CLB 6, 6 = CLB 5, 4-5 = CLB 4
    const speakingCLB =
      speaking >= 16
        ? 10
        : speaking >= 14
          ? 9
          : speaking >= 12
            ? 8
            : speaking >= 10
              ? 7
              : speaking >= 7
                ? 6
                : speaking >= 6
                  ? 5
                  : speaking >= 4
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  }

  return clbs;
};

export interface CRSCalculationInput {
  familyStatus: "single" | "married-no-spouse" | "married-with-spouse";
  age: number;
  education:
    | "phd"
    | "masters"
    | "double"
    | "bachelor"
    | "two-year"
    | "one-year"
    | "highschool"
    | "below";
  canadianEducation?: "none" | "1-2year" | "3plus";
  
  // Primary language
  primaryLanguage: "english" | "french";
  languageTest: "ielts" | "celpip" | "pte" | "tef" | "tcf";
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  
  // Secondary language (optional)
  secondaryLanguage?: "english" | "french" | "none";
  secondLanguageTest?: "ielts" | "celpip" | "pte" | "tef" | "tcf" | "none";
  secondListening?: number;
  secondReading?: number;
  secondWriting?: number;
  secondSpeaking?: number;
  canadianWorkExperience: "none" | "1year" | "2year" | "3year" | "4year" | "5plus";
  canadianTradeCertificate?: boolean;
  overseasWorkExperience?: "none" | "1year" | "2year" | "3plus";
  hasSiblingInCanada?: boolean;
  hasProvincialNomination?: boolean;
  spouseAge?: number;
  spouseEducation?: "phd" | "masters" | "double" | "bachelor" | "two-year" | "one-year" | "highschool" | "below";
  spouseLanguageTest?: "none" | "ielts" | "celpip" | "pte" | "tef" | "tcf";
  spouseListening?: number;
  spouseReading?: number;
  spouseWriting?: number;
  spouseSpeaking?: number;
  spouseCanadianWorkExperience?: "none" | "1year" | "2year" | "3year" | "4year" | "5plus";
  spouseTradeCertificate?: boolean;
  spouseOverseasWorkExperience?: "none" | "1year" | "2year" | "3plus";
}

export interface CRSCalculationResult {
  totalScore: number;
  breakdown: Record<string, any>;
  message: string;
  scheme: "A" | "B";
}

export const calculateCRS = (input: CRSCalculationInput): CRSCalculationResult => {
  console.log('[DEBUG] calculateCRS Input:', JSON.stringify(input, null, 2));
  const isSchemeB = input.familyStatus === "married-with-spouse";
  let totalScore = 0;
  const breakdown: Record<string, any> = {};

  // Initialize breakdown structure for detailed scoring
  const coreHumanCapital: Record<string, number> = { 
    小计: 0, 年龄: 0, 学历: 0, "第一语言": 0, "第二语言": 0, 加国经验: 0 
  };
  const spouseFactor: Record<string, number> = { 
    小计: 0, 配偶学历: 0, 配偶语言: 0, 配偶加国经验: 0 
  };
  const transferableSkills: Record<string, number> = { 
    小计: 0, "学历+语言": 0, "学历+加国经验": 0, "海外经验+语言": 0, "海外经验+加国经验": 0 
  };
  const additionalFactor: Record<string, number> = { 
    小计: 0, 加拿大学习: 0, 兄弟姐妹: 0, 省提名: 0, 双语言: 0, 法语技能: 0 
  };

  if (!isSchemeB) {
    // SCHEME A: Single or married without spouse
    // Age points
    const ageScores: Record<number, number> = {
      17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110,
      27: 110, 28: 110, 29: 110, 30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77, 36: 72,
      37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6, 45: 0,
    };
    const ageScore = ageScores[input.age] || 0;
    totalScore += ageScore;
    coreHumanCapital.年龄 = ageScore;
    coreHumanCapital.小计 += ageScore;

    // Education points
    const educationScores: Record<string, number> = {
      phd: 150, masters: 135, double: 128, bachelor: 120, "two-year": 98, "one-year": 90, highschool: 30, below: 0,
    };
    const eduScore = educationScores[input.education] || 0;
    totalScore += eduScore;
    coreHumanCapital.学历 = eduScore;
    coreHumanCapital.小计 += eduScore;

    // Canadian education bonus (moved to additional factors)
    if (input.canadianEducation === "1-2year") {
      additionalFactor.加拿大学习 = 15;
      additionalFactor.小计 += 15;
      totalScore += 15;
    } else if (input.canadianEducation === "3plus") {
      additionalFactor.加拿大学习 = 30;
      additionalFactor.小计 += 30;
      totalScore += 30;
    }

    // Language skills - first test
    const clbs = convertToCLB(
      input.listening,
      input.reading,
      input.writing,
      input.speaking,
      input.languageTest
    );
    const languageScores: Record<number, number> = {
      10: 34,
      9: 31,
      8: 23,
      7: 17,
      6: 9,
      5: 6,
      4: 6,
      0: 0,
    };
    // Calculate language score for each skill and sum them
    const langScore = clbs.reduce((sum, clb) => sum + (languageScores[clb] || 0), 0);
    totalScore += langScore;
    coreHumanCapital['\u7b2c\u4e00\u8bed\u8a00'] = langScore;
    coreHumanCapital.小计 += langScore;
    
    // Get minimum CLB for transferable skills evaluation
    const minClb = Math.min(...clbs);

    // Second language test
    if (input.secondLanguageTest && input.secondLanguageTest !== "none") {
      const secondClbs = convertToCLB(
        input.secondListening || 0,
        input.secondReading || 0,
        input.secondWriting || 0,
        input.secondSpeaking || 0,
        input.secondLanguageTest
      );
      const secondLangScores: Record<number, number> = {
        10: 6,
        9: 6,
        8: 3,
        7: 3,
        6: 1,
        5: 1,
        4: 0,
        0: 0,
      };
      const secondLangScore = secondClbs.reduce((sum, clb) => sum + (secondLangScores[clb] || 0), 0);
      totalScore += secondLangScore;
      coreHumanCapital['\u7b2c\u4e8c\u8bed\u8a00'] = secondLangScore;
      coreHumanCapital.小计 += secondLangScore;
      
      // Bilingual bonus points
      const isFrenchSecondary = input.secondaryLanguage === "french";
      const isEnglishSecondary = input.secondaryLanguage === "english";
      const isFrenchPrimary = input.primaryLanguage === "french";
      const isEnglishPrimary = input.primaryLanguage === "english";
      
      if ((isFrenchSecondary && isEnglishPrimary) || (isEnglishSecondary && isFrenchPrimary)) {
        const frenchClbs = isFrenchSecondary ? secondClbs : clbs;
        const englishClbs = isEnglishSecondary ? secondClbs : clbs;
        const frenchMinClb = Math.min(...frenchClbs);
        const englishMinClb = Math.min(...englishClbs);
        
        if (frenchMinClb >= 7 && englishMinClb >= 5) {
          additionalFactor.双语言 = 50;
          additionalFactor.小计 += 50;
          totalScore += 50;
        } else if (frenchMinClb >= 7 && englishMinClb <= 4) {
          additionalFactor.双语言 = 25;
          additionalFactor.小计 += 25;
          totalScore += 25;
        }
      }
    }

    // Canadian work experience
    const canadianWorkScores: Record<string, number> = {
      none: 0, "1year": 40, "2year": 53, "3year": 64, "4year": 72, "5plus": 80,
    };
    const canadianWorkScore = canadianWorkScores[input.canadianWorkExperience] || 0;
    totalScore += canadianWorkScore;
    coreHumanCapital.加国经验 = canadianWorkScore;
    coreHumanCapital.小计 += canadianWorkScore;

    // Transferable skills (only calculated, not added to total score)
    // Overseas work experience
    const overseasWorkScores: Record<string, number> = {
      none: 0, "1year": 20, "2year": 40, "3plus": 53,
    };
    const overseasWorkScore = overseasWorkScores[input.overseasWorkExperience || "none"] || 0;
    
    // Education + Language (requires CLB 9+)
    console.log(`[DEBUG] Education+Language: eduScore=${eduScore}, clb=${minClb}, condition=${eduScore >= 120 && minClb >= 9}`);
    if (eduScore >= 120 && minClb >= 9) {
      transferableSkills["学历+语言"] = 50;
    }
    // Education + Canadian work experience
    console.log(`[DEBUG] Education+CanadianWork: eduScore=${eduScore}, canadianWorkScore=${canadianWorkScore}, condition=${eduScore >= 120 && canadianWorkScore >= 40}`);
    if (eduScore >= 120 && canadianWorkScore >= 40) {
      transferableSkills["学历+加国经验"] = 50;
    }
    // Overseas work experience + Language (with CLB thresholds)
    let overseasLanguageScore = 0;
    if (overseasWorkScore >= 20 && overseasWorkScore < 53) {
      // 1-3 years overseas experience
      if (minClb >= 9) {
        overseasLanguageScore = 25; // 1-3 years + CLB 9-10
      } else if (minClb >= 7) {
        overseasLanguageScore = 13; // 1-3 years + CLB 7-8
      }
    } else if (overseasWorkScore >= 53) {
      // 3+ years overseas experience
      if (minClb >= 9) {
        overseasLanguageScore = 50; // 3+ years + CLB 9-10
      } else if (minClb >= 7) {
        overseasLanguageScore = 25; // 3+ years + CLB 7-8
      }
    }
    transferableSkills["海外经验+语言"] = overseasLanguageScore;
    
    // Overseas work experience + Canadian work experience (with experience thresholds)
    let overseasCanadianScore = 0;
    if (overseasWorkScore >= 20 && overseasWorkScore < 53) {
      // 1-3 years overseas experience
      if (canadianWorkScore >= 40) {
        overseasCanadianScore = 25; // 1-3 years overseas + 2+ years Canadian
      } else if (canadianWorkScore >= 20) {
        overseasCanadianScore = 13; // 1-3 years overseas + 1 year Canadian
      }
    } else if (overseasWorkScore >= 53) {
      // 3+ years overseas experience
      if (canadianWorkScore >= 40) {
        overseasCanadianScore = 50; // 3+ years overseas + 2+ years Canadian
      } else if (canadianWorkScore >= 20) {
        overseasCanadianScore = 25; // 3+ years overseas + 1 year Canadian
      }
    }
    transferableSkills["海外经验+加国经验"] = overseasCanadianScore;
    // Calculate total for transferable skills (with category caps)
    // Education category: max 50 points
    const educationCategoryScore = Math.max(
      transferableSkills["学历+语言"],
      transferableSkills["学历+加国经验"]
    );
    // Overseas experience category: max 50 points
    const overseasCategoryScore = Math.max(
      transferableSkills["海外经验+语言"],
      transferableSkills["海外经验+加国经验"]
    );
    const transferableTotal = educationCategoryScore + overseasCategoryScore;
    transferableSkills.小计 = transferableTotal;
    totalScore += transferableTotal;  // Add transferable skills to total score

    // Bonus points
    if (input.hasSiblingInCanada) {
      additionalFactor.兄弟姐妹 = 15;
      additionalFactor.小计 += 15;
      totalScore += 15;
    }
    if (input.hasProvincialNomination) {
      additionalFactor.省提名 = 600;
      additionalFactor.小计 += 600;
      totalScore += 600;
    }
    
    // French language bonus (50 points if French is primary language and CLB 7+)
    const isFrenchPrimary = input.primaryLanguage === "french";
    const frenchMinClb = isFrenchPrimary ? Math.min(...clbs) : 0;
    if (isFrenchPrimary && frenchMinClb >= 7) {
      additionalFactor.法语技能 = 50;
      additionalFactor.小计 += 50;
      totalScore += 50;
    }
    
    // Assign breakdown
    breakdown.核心人力资本 = coreHumanCapital;
    
    // Apply category caps to transferable skills for display
    const educationCategoryMax = Math.max(
      transferableSkills["学历+语言"],
      transferableSkills["学历+加国经验"]
    );
    const overseasCategoryMax = Math.max(
      transferableSkills["海外经验+语言"],
      transferableSkills["海外经验+加国经验"]
    );
    
    // Create display object with category caps applied
    // Only show the highest score in each category, others show 0
    const transferableSkillsDisplay: Record<string, number> = {
      小计: educationCategoryMax + overseasCategoryMax,
      "学历+语言": transferableSkills["学历+语言"] > transferableSkills["学历+加国经验"] ? transferableSkills["学历+语言"] : 0,
      "学历+加国经验": transferableSkills["学历+加国经验"] > transferableSkills["学历+语言"] ? transferableSkills["学历+加国经验"] : 0,
      "海外经验+语言": transferableSkills["海外经验+语言"] > transferableSkills["海外经验+加国经验"] ? transferableSkills["海外经验+语言"] : 0,
      "海外经验+加国经验": transferableSkills["海外经验+加国经验"] > transferableSkills["海外经验+语言"] ? transferableSkills["海外经验+加国经验"] : 0,
    };
    
    breakdown.可转移技能 = transferableSkillsDisplay;
    if (additionalFactor.小计 > 0) {
      breakdown.附加分 = additionalFactor;
    }
  } else {
    // SCHEME B: Married with spouse
    // Main applicant - age
    const ageScores: Record<number, number> = {
      17: 0, 18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100,
      27: 100, 28: 100, 29: 100, 30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65,
      37: 60, 38: 55, 39: 50, 40: 45, 41: 35, 42: 25, 43: 15, 44: 5, 45: 0,
    };
    const ageScore = ageScores[input.age] || 0;
    totalScore += ageScore;
    coreHumanCapital.年龄 = ageScore;
    coreHumanCapital.小计 += ageScore;

    // Main applicant - education
    const educationScores: Record<string, number> = {
      phd: 140, masters: 126, double: 119, bachelor: 112, "two-year": 91, "one-year": 84, highschool: 28, below: 0,
    };
    const eduScore = educationScores[input.education] || 0;
    totalScore += eduScore;
    coreHumanCapital.学历 = eduScore;
    coreHumanCapital.小计 += eduScore;

    // Main applicant - language
    const clbs = convertToCLB(
      input.listening,
      input.reading,
      input.writing,
      input.speaking,
      input.languageTest
    );
    const languageScores: Record<number, number> = {
      10: 32,
      9: 29,
      8: 21,
      7: 16,
      6: 8,
      5: 6,
      4: 6,
      0: 0,
    };
    const langScore = clbs.reduce((sum, clb) => sum + (languageScores[clb] || 0), 0);
    totalScore += langScore;
    coreHumanCapital['\u7b2c\u4e00\u8bed\u8a00'] = langScore;
    coreHumanCapital.小计 += langScore;
    
    // Get minimum CLB for transferable skills evaluation
    const minClb = Math.min(...clbs);

    // Main applicant - second language
    if (input.secondLanguageTest && input.secondLanguageTest !== "none") {
      const secondClbs = convertToCLB(
        input.secondListening || 0,
        input.secondReading || 0,
        input.secondWriting || 0,
        input.secondSpeaking || 0,
        input.secondLanguageTest
      );
      const secondLangScores: Record<number, number> = {
        10: 6,
        9: 6,
        8: 3,
        7: 3,
        6: 1,
        5: 1,
        4: 0,
        0: 0,
      };
      const secondLangScore = secondClbs.reduce((sum, clb) => sum + (secondLangScores[clb] || 0), 0);
      totalScore += secondLangScore;
      coreHumanCapital['\u7b2c\u4e8c\u8bed\u8a00'] = secondLangScore;
      coreHumanCapital.小计 += secondLangScore;
      
      // Bilingual bonus points
      const isFrenchSecondary = input.secondaryLanguage === "french";
      const isEnglishSecondary = input.secondaryLanguage === "english";
      const isFrenchPrimary = input.primaryLanguage === "french";
      const isEnglishPrimary = input.primaryLanguage === "english";
      
      if ((isFrenchSecondary && isEnglishPrimary) || (isEnglishSecondary && isFrenchPrimary)) {
        const frenchClbs = isFrenchSecondary ? secondClbs : clbs;
        const englishClbs = isEnglishSecondary ? secondClbs : clbs;
        const frenchMinClb = Math.min(...frenchClbs);
        const englishMinClb = Math.min(...englishClbs);
        
        if (frenchMinClb >= 7 && englishMinClb >= 5) {
          additionalFactor.双语言 = 50;
          additionalFactor.小计 += 50;
          totalScore += 50;
        } else if (frenchMinClb >= 7 && englishMinClb <= 4) {
          additionalFactor.双语言 = 25;
          additionalFactor.小计 += 25;
          totalScore += 25;
        }
      }
    }

    // Main applicant - Canadian work experience
    const canadianWorkScores: Record<string, number> = {
      none: 0, "1year": 35, "2year": 46, "3year": 56, "4year": 63, "5plus": 70,
    };
    const canadianWorkScore = canadianWorkScores[input.canadianWorkExperience] || 0;
    totalScore += canadianWorkScore;
    coreHumanCapital.加国经验 = canadianWorkScore;
    coreHumanCapital.小计 += canadianWorkScore;

    // Main applicant - Canadian education bonus (moved to additional factors)
    if (input.canadianEducation === "1-2year") {
      additionalFactor.加拿大学习 = 15;
      additionalFactor.小计 += 15;
      totalScore += 15;
    } else if (input.canadianEducation === "3plus") {
      additionalFactor.加拿大学习 = 30;
      additionalFactor.小计 += 30;
      totalScore += 30;
    }

    // Spouse - education
    if (input.spouseEducation) {
      const spouseEducationScores: Record<string, number> = {
        phd: 10, masters: 10, double: 9, bachelor: 8, "two-year": 7, "one-year": 6, highschool: 2, below: 0,
      };
      const spouseEduScore = spouseEducationScores[input.spouseEducation] || 0;
      totalScore += spouseEduScore;
      spouseFactor.配偶学历 = spouseEduScore;
      spouseFactor.小计 += spouseEduScore;
    }

    // Spouse - language
    if (input.spouseLanguageTest && input.spouseLanguageTest !== "none") {
      const spouseClbs = convertToCLB(
        input.spouseListening || 0,
        input.spouseReading || 0,
        input.spouseWriting || 0,
        input.spouseSpeaking || 0,
        input.spouseLanguageTest
      );
      const spouseLangScores: Record<number, number> = {
        10: 8,
        9: 8,
        8: 7,
        7: 6,
        6: 5,
        5: 1,
        4: 0,
        0: 0,
      };
      const spouseLangScore = spouseClbs.reduce((sum, clb) => sum + (spouseLangScores[clb] || 0), 0);
      totalScore += spouseLangScore;
      spouseFactor.配偶语言 = spouseLangScore;
      spouseFactor.小计 += spouseLangScore;
    }

    // Spouse - Canadian work experience
    if (input.spouseCanadianWorkExperience) {
      const spouseWorkScores: Record<string, number> = {
        none: 0, "1year": 5, "2year": 7, "3year": 8, "4year": 9, "5plus": 10,
      };
      const spouseWorkScore = spouseWorkScores[input.spouseCanadianWorkExperience] || 0;
      totalScore += spouseWorkScore;
      spouseFactor.配偶加国经验 = spouseWorkScore;
      spouseFactor.小计 += spouseWorkScore;
    }

    // Transferable skills (only calculated, not added to total score)
    // Overseas work experience
    const overseasWorkScores: Record<string, number> = {
      none: 0, "1year": 20, "2year": 40, "3plus": 53,
    };
    const overseasWorkScore = overseasWorkScores[input.overseasWorkExperience || "none"] || 0;
    
    // Education + Language (requires CLB 9+)
    console.log(`[DEBUG] Education+Language: eduScore=${eduScore}, clb=${minClb}, condition=${eduScore >= 120 && minClb >= 9}`);
    if (eduScore >= 120 && minClb >= 9) {
      transferableSkills["学历+语言"] = 50;
    }
    // Education + Canadian work experience
    console.log(`[DEBUG] Education+CanadianWork: eduScore=${eduScore}, canadianWorkScore=${canadianWorkScore}, condition=${eduScore >= 120 && canadianWorkScore >= 40}`);
    if (eduScore >= 120 && canadianWorkScore >= 40) {
      transferableSkills["学历+加国经验"] = 50;
    }
    // Overseas work experience + Language (with CLB thresholds)
    let overseasLanguageScore = 0;
    if (overseasWorkScore >= 20 && overseasWorkScore < 53) {
      // 1-3 years overseas experience
      if (minClb >= 9) {
        overseasLanguageScore = 25; // 1-3 years + CLB 9-10
      } else if (minClb >= 7) {
        overseasLanguageScore = 13; // 1-3 years + CLB 7-8
      }
    } else if (overseasWorkScore >= 53) {
      // 3+ years overseas experience
      if (minClb >= 9) {
        overseasLanguageScore = 50; // 3+ years + CLB 9-10
      } else if (minClb >= 7) {
        overseasLanguageScore = 25; // 3+ years + CLB 7-8
      }
    }
    transferableSkills["海外经验+语言"] = overseasLanguageScore;
    
    // Overseas work experience + Canadian work experience (with experience thresholds)
    let overseasCanadianScore = 0;
    if (overseasWorkScore >= 20 && overseasWorkScore < 53) {
      // 1-3 years overseas experience
      if (canadianWorkScore >= 40) {
        overseasCanadianScore = 25; // 1-3 years overseas + 2+ years Canadian
      } else if (canadianWorkScore >= 20) {
        overseasCanadianScore = 13; // 1-3 years overseas + 1 year Canadian
      }
    } else if (overseasWorkScore >= 53) {
      // 3+ years overseas experience
      if (canadianWorkScore >= 40) {
        overseasCanadianScore = 50; // 3+ years overseas + 2+ years Canadian
      } else if (canadianWorkScore >= 20) {
        overseasCanadianScore = 25; // 3+ years overseas + 1 year Canadian
      }
    }
    transferableSkills["海外经验+加国经验"] = overseasCanadianScore;
    // Calculate total for transferable skills (with category caps)
    // Education category: max 50 points
    const educationCategoryScore = Math.max(
      transferableSkills["学历+语言"],
      transferableSkills["学历+加国经验"]
    );
    // Overseas experience category: max 50 points
    const overseasCategoryScore = Math.max(
      transferableSkills["海外经验+语言"],
      transferableSkills["海外经验+加国经验"]
    );
    const transferableTotal = educationCategoryScore + overseasCategoryScore;
    transferableSkills.小计 = transferableTotal;
    totalScore += transferableTotal;  // Add transferable skills to total score

    // Bonus points
    if (input.hasSiblingInCanada) {
      additionalFactor.兄弟姐妹 = 15;
      additionalFactor.小计 += 15;
      totalScore += 15;
    }
    if (input.hasProvincialNomination) {
      additionalFactor.省提名 = 600;
      additionalFactor.小计 += 600;
      totalScore += 600;
    }
    
    // Assign breakdown
    breakdown.核心人力资本 = coreHumanCapital;
    if (spouseFactor.小计 > 0) {
      breakdown.配偶因素 = spouseFactor;
    }
    
    // Apply category caps to transferable skills for display
    const educationCategoryMaxB = Math.max(
      transferableSkills["学历+语言"],
      transferableSkills["学历+加国经验"]
    );
    const overseasCategoryMaxB = Math.max(
      transferableSkills["海外经验+语言"],
      transferableSkills["海外经验+加国经验"]
    );
    
    // Create display object with category caps applied
    // Only show the highest score in each category, others show 0
    const transferableSkillsDisplayB: Record<string, number> = {
      小计: educationCategoryMaxB + overseasCategoryMaxB,
      "学历+语言": transferableSkills["学历+语言"] > transferableSkills["学历+加国经验"] ? transferableSkills["学历+语言"] : 0,
      "学历+加国经验": transferableSkills["学历+加国经验"] > transferableSkills["学历+语言"] ? transferableSkills["学历+加国经验"] : 0,
      "海外经验+语言": transferableSkills["海外经验+语言"] > transferableSkills["海外经验+加国经验"] ? transferableSkills["海外经验+语言"] : 0,
      "海外经验+加国经验": transferableSkills["海外经验+加国经验"] > transferableSkills["海外经验+语言"] ? transferableSkills["海外经验+加国经验"] : 0,
    };
    
    breakdown.可转移技能 = transferableSkillsDisplayB;
    if (additionalFactor.小计 > 0) {
      breakdown.附加分 = additionalFactor;
    }
  }

  return {
    totalScore,
    breakdown,
    message:
      totalScore >= 470
        ? "恭喜！您的分数具有竞争力。"
        : "建议提升您的个人资料。",
    scheme: isSchemeB ? "B" : "A",
  };
};
