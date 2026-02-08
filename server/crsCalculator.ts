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
): number => {
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
                  : writing >= 4.5
                    ? 4
                    : writing >= 4
                      ? 4
                      : 0;
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
                  : speaking >= 4.5
                    ? 4
                    : speaking >= 4
                      ? 4
                      : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "celpip") {
    const listeningCLB =
      listening >= 10
        ? 10
        : listening >= 9
          ? 9
          : listening >= 8
            ? 8
            : listening >= 7
              ? 7
              : listening >= 6
                ? 6
                : listening >= 5
                  ? 5
                  : listening >= 4
                    ? 4
                    : 0;
    const readingCLB =
      reading >= 10
        ? 10
        : reading >= 9
          ? 9
          : reading >= 8
            ? 8
            : reading >= 7
              ? 7
              : reading >= 6
                ? 6
                : reading >= 5
                  ? 5
                  : reading >= 4
                    ? 4
                    : 0;
    const writingCLB =
      writing >= 10
        ? 10
        : writing >= 9
          ? 9
          : writing >= 8
            ? 8
            : writing >= 7
              ? 7
              : writing >= 6
                ? 6
                : writing >= 5
                  ? 5
                  : writing >= 4
                    ? 4
                    : 0;
    const speakingCLB =
      speaking >= 10
        ? 10
        : speaking >= 9
          ? 9
          : speaking >= 8
            ? 8
            : speaking >= 7
              ? 7
              : speaking >= 6
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
  } else if (testType === "tef" || testType === "tcf") {
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

  return Math.min(...clbs);
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
  languageTest: "ielts" | "celpip" | "pte" | "tef" | "tcf";
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  secondLanguageTest?: "none" | "ielts" | "celpip" | "pte" | "tef" | "tcf";
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
  const isSchemeB = input.familyStatus === "married-with-spouse";
  let totalScore = 0;
  const breakdown: Record<string, any> = {};

  // Initialize breakdown structure for detailed scoring
  const coreHumanCapital: Record<string, number> = { 
    小计: 0, 年龄: 0, 学历: 0, 语言: 0, 加国经验: 0 
  };
  const spouseFactor: Record<string, number> = { 
    小计: 0, 配偶学历: 0, 配偶语言: 0, 配偶加国经验: 0 
  };
  const transferableSkills: Record<string, number> = { 
    小计: 0, "学历+语言": 0, "学历+加国经验": 0, "海外经验+语言": 0, "海外经验+加国经验": 0 
  };
  const additionalFactor: Record<string, number> = { 
    小计: 0, 兄弟姐妹: 0, 省提名: 0 
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

    // Canadian education bonus (part of human capital)
    if (input.canadianEducation === "1-2year") {
      totalScore += 15;
      coreHumanCapital.小计 += 15;
    } else if (input.canadianEducation === "3plus") {
      totalScore += 30;
      coreHumanCapital.小计 += 30;
    }

    // Language skills - first test
    const clb = convertToCLB(
      input.listening,
      input.reading,
      input.writing,
      input.speaking,
      input.languageTest
    );
    const languageScores: Record<number, number> = {
      10: 136,
      9: 129,
      8: 121,
      7: 109,
      6: 95,
      5: 6,
      4: 6,
      0: 0,
    };
    const langScore = languageScores[clb] || 0;
    totalScore += langScore;
    coreHumanCapital.语言 = langScore;
    coreHumanCapital.小计 += langScore;

    // Second language test
    if (input.secondLanguageTest && input.secondLanguageTest !== "none") {
      const secondClb = convertToCLB(
        input.secondListening || 0,
        input.secondReading || 0,
        input.secondWriting || 0,
        input.secondSpeaking || 0,
        input.secondLanguageTest
      );
      const secondLangScores: Record<number, number> = {
        10: 8,
        9: 8,
        8: 7,
        7: 6,
        6: 5,
        5: 1,
        4: 0,
        0: 0,
      };
      const secondLangScore = secondLangScores[secondClb] || 0;
      totalScore += secondLangScore;
      coreHumanCapital.小计 += secondLangScore;
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
    
    // Education + Language
    if (eduScore >= 120 && clb >= 7) {
      transferableSkills["学历+语言"] = 13;
    }
    // Education + Canadian work experience
    if (eduScore >= 120 && canadianWorkScore >= 40) {
      transferableSkills["学历+加国经验"] = 13;
    }
    // Overseas work experience + Language
    if (overseasWorkScore >= 20 && clb >= 7) {
      transferableSkills["海外经验+语言"] = 13;
    }
    // Overseas work experience + Canadian work experience
    if (overseasWorkScore >= 20 && canadianWorkScore >= 40) {
      transferableSkills["海外经验+加国经验"] = 13;
    }
    // Calculate total for transferable skills
    let transferableTotal = 0;
    if (transferableSkills["学历+语言"] > 0) transferableTotal += transferableSkills["学历+语言"];
    if (transferableSkills["学历+加国经验"] > 0) transferableTotal += transferableSkills["学历+加国经验"];
    if (transferableSkills["海外经验+语言"] > 0) transferableTotal += transferableSkills["海外经验+语言"];
    if (transferableSkills["海外经验+加国经验"] > 0) transferableTotal += transferableSkills["海外经验+加国经验"];
    transferableSkills.小计 = transferableTotal;

    // Bonus points
    if (input.hasSiblingInCanada) {
      additionalFactor.兄弟姐妹 = 13;
      additionalFactor.小计 += 13;
      totalScore += 13;
    }
    if (input.hasProvincialNomination) {
      additionalFactor.省提名 = 600;
      additionalFactor.小计 += 600;
      totalScore += 600;
    }
    
    // Assign breakdown
    breakdown.核心人力资本 = coreHumanCapital;
    breakdown.可转移技能 = transferableSkills;
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
    const clb = convertToCLB(
      input.listening,
      input.reading,
      input.writing,
      input.speaking,
      input.languageTest
    );
    const languageScores: Record<number, number> = {
      10: 132,
      9: 125,
      8: 118,
      7: 107,
      6: 94,
      5: 6,
      4: 6,
      0: 0,
    };
    const langScore = languageScores[clb] || 0;
    totalScore += langScore;
    coreHumanCapital.语言 = langScore;
    coreHumanCapital.小计 += langScore;

    // Main applicant - Canadian work experience
    const canadianWorkScores: Record<string, number> = {
      none: 0, "1year": 35, "2year": 46, "3year": 56, "4year": 63, "5plus": 70,
    };
    const canadianWorkScore = canadianWorkScores[input.canadianWorkExperience] || 0;
    totalScore += canadianWorkScore;
    coreHumanCapital.加国经验 = canadianWorkScore;
    coreHumanCapital.小计 += canadianWorkScore;

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
      const spouseClb = convertToCLB(
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
      const spouseLangScore = spouseLangScores[spouseClb] || 0;
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
    
    // Education + Language
    if (eduScore >= 120 && clb >= 7) {
      transferableSkills["学历+语言"] = 13;
    }
    // Education + Canadian work experience
    if (eduScore >= 120 && canadianWorkScore >= 40) {
      transferableSkills["学历+加国经验"] = 13;
    }
    // Overseas work experience + Language
    if (overseasWorkScore >= 20 && clb >= 7) {
      transferableSkills["海外经验+语言"] = 13;
    }
    // Overseas work experience + Canadian work experience
    if (overseasWorkScore >= 20 && canadianWorkScore >= 40) {
      transferableSkills["海外经验+加国经验"] = 13;
    }
    // Calculate total for transferable skills
    let transferableTotal = 0;
    if (transferableSkills["学历+语言"] > 0) transferableTotal += transferableSkills["学历+语言"];
    if (transferableSkills["学历+加国经验"] > 0) transferableTotal += transferableSkills["学历+加国经验"];
    if (transferableSkills["海外经验+语言"] > 0) transferableTotal += transferableSkills["海外经验+语言"];
    if (transferableSkills["海外经验+加国经验"] > 0) transferableTotal += transferableSkills["海外经验+加国经验"];
    transferableSkills.小计 = transferableTotal;

    // Bonus points
    if (input.hasSiblingInCanada) {
      additionalFactor.兄弟姐妹 = 13;
      additionalFactor.小计 += 13;
      totalScore += 13;
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
    breakdown.可转移技能 = transferableSkills;
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
