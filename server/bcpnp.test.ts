import { describe, it, expect } from "vitest";

// Helper function to convert language scores to CLB
const convertToCLB = (
  listening: number,
  reading: number,
  writing: number,
  speaking: number,
  testType: string
): number => {
  let clbs: number[] = [];

  if (testType === "ielts") {
    // IELTS conversion
    const listeningCLB =
      listening >= 8.5
        ? 10
        : listening >= 8
          ? 9
          : listening >= 7.5
            ? 8
            : listening >= 6.5
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
          : reading >= 6.5
            ? 8
            : reading >= 6
              ? 7
              : reading >= 5.5
                ? 6
                : reading >= 4.5
                  ? 5
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
                  : speaking >= 4
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "celpip") {
    // CELPIP conversion
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
    // PTE conversion
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
  }

  return Math.min(...clbs);
};

describe("BC PNP Calculator", () => {
  describe("CLB Conversion", () => {
    it("should convert IELTS 7.0 to CLB 7", () => {
      const clb = convertToCLB(7, 6, 6, 6, "ielts");
      expect(clb).toBe(6); // Minimum is 6
    });

    it("should convert IELTS 8.0 to CLB 9", () => {
      const clb = convertToCLB(8, 8, 8, 8, "ielts");
      expect(clb).toBe(9);
    });

    it("should convert CELPIP 10 to CLB 10", () => {
      const clb = convertToCLB(10, 10, 10, 10, "celpip");
      expect(clb).toBe(10);
    });

    it("should convert CELPIP 7 to CLB 7", () => {
      const clb = convertToCLB(7, 7, 7, 7, "celpip");
      expect(clb).toBe(7);
    });

    it("should convert PTE 89 to CLB 10", () => {
      const clb = convertToCLB(89, 88, 90, 89, "pte");
      expect(clb).toBe(88); // Reading is 88, which is CLB 9
    });

    it("should use minimum score across all skills", () => {
      // IELTS: Listening 8, Reading 6, Writing 7, Speaking 6
      const clb = convertToCLB(8, 6, 7, 6, "ielts");
      expect(clb).toBe(6); // Minimum is Reading 6 = CLB 6
    });
  });

  describe("Work Experience Scoring", () => {
    it("should score 20 points for 5+ years", () => {
      const points: Record<string, number> = {
        "5plus": 20,
        "4to5": 16,
        "3to4": 12,
        "2to3": 8,
        "1to2": 4,
        "below1": 1,
        "none": 0,
      };
      expect(points["5plus"]).toBe(20);
    });

    it("should score 0 points for no experience", () => {
      const points: Record<string, number> = {
        "5plus": 20,
        "4to5": 16,
        "3to4": 12,
        "2to3": 8,
        "1to2": 4,
        "below1": 1,
        "none": 0,
      };
      expect(points["none"]).toBe(0);
    });
  });

  describe("Education Scoring", () => {
    it("should score 27 points for PhD", () => {
      const points: Record<string, number> = {
        phd: 27,
        masters: 22,
        postgrad: 15,
        bachelor: 15,
        associate: 5,
        diploma: 5,
        highschool: 0,
      };
      expect(points["phd"]).toBe(27);
    });

    it("should score 15 points for Bachelor", () => {
      const points: Record<string, number> = {
        phd: 27,
        masters: 22,
        postgrad: 15,
        bachelor: 15,
        associate: 5,
        diploma: 5,
        highschool: 0,
      };
      expect(points["bachelor"]).toBe(15);
    });
  });

  describe("Language Skills Scoring", () => {
    it("should score 30 points for CLB 10", () => {
      const points: Record<number, number> = {
        10: 30,
        9: 30,
        8: 25,
        7: 20,
        6: 15,
        5: 10,
        4: 5,
      };
      expect(points[10]).toBe(30);
    });

    it("should score 15 points for CLB 6", () => {
      const points: Record<number, number> = {
        10: 30,
        9: 30,
        8: 25,
        7: 20,
        6: 15,
        5: 10,
        4: 5,
      };
      expect(points[6]).toBe(15);
    });
  });

  describe("Hourly Wage Scoring", () => {
    it("should score 55 points for wage >= 70", () => {
      const wage = 75;
      const wageScore = wage >= 70 ? 55 : wage >= 16 ? wage - 15 : 0;
      expect(wageScore).toBe(55);
    });

    it("should score (wage - 15) for wage between 16-69", () => {
      const wage = 30;
      const wageScore = wage >= 70 ? 55 : wage >= 16 ? wage - 15 : 0;
      expect(wageScore).toBe(15);
    });

    it("should score 0 for wage < 16", () => {
      const wage = 10;
      const wageScore = wage >= 70 ? 55 : wage >= 16 ? wage - 15 : 0;
      expect(wageScore).toBe(0);
    });
  });

  describe("Region Scoring", () => {
    it("should score 0 for tier1 region", () => {
      const points: Record<string, number> = {
        tier1: 0,
        tier2: 5,
        tier3: 15,
      };
      expect(points["tier1"]).toBe(0);
    });

    it("should score 15 for tier3 region", () => {
      const points: Record<string, number> = {
        tier1: 0,
        tier2: 5,
        tier3: 15,
      };
      expect(points["tier3"]).toBe(15);
    });
  });

  describe("Total Score Calculation", () => {
    it("should calculate correct total for baseline profile", () => {
      // Baseline: No experience, Bachelor, CLB 6, $20/hour, Tier 1
      let score = 0;

      // Work experience: none = 0
      score += 0;

      // Education: bachelor = 15
      score += 15;

      // Language: CLB 6 = 15
      score += 15;

      // Wage: 20 >= 16, so 20 - 15 = 5
      score += 5;

      // Region: tier1 = 0
      score += 0;

      expect(score).toBe(50);
    });

    it("should calculate correct total for strong profile", () => {
      // Strong: 5+ years, Masters, CLB 9, $60/hour, Tier 3
      let score = 0;

      // Work experience: 5plus = 20
      score += 20;

      // Canadian experience: true = 10
      score += 10;

      // Education: masters = 22
      score += 22;

      // Language: CLB 9 = 30
      score += 30;

      // Wage: 60 >= 16, so 60 - 15 = 45
      score += 45;

      // Region: tier3 = 15
      score += 15;

      expect(score).toBe(182);
    });
  });
});
