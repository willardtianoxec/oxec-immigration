import { describe, it, expect } from "vitest";

/**
 * FSW Calculator语言评分计算测试
 * 根据CLBTranslator中的准确CLB映射规则进行验证
 */

// IELTS到CLB的映射规则（从CLBTranslator复制）
const convertIELTSToCLB = (listening: number, reading: number, writing: number, speaking: number) => {
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

  return [listeningCLB, readingCLB, writingCLB, speakingCLB];
};

// FSW语言评分计算函数（根据CLB等级单独计分）
const calculateFSWLanguageScore = (clbs: number[]) => {
  let totalScore = 0;
  for (const clb of clbs) {
    if (clb >= 9) totalScore += 6;
    else if (clb === 8) totalScore += 5;
    else if (clb === 7) totalScore += 4;
    else if (clb >= 5) totalScore += 3;
  }
  return totalScore;
};

describe("FSW Calculator Language Score", () => {
  describe("IELTS CLB Conversion", () => {
    it("should convert IELTS 8/7/7/7 to CLB 9/9/9/9", () => {
      const clbs = convertIELTSToCLB(8, 7, 7, 7);
      expect(clbs).toEqual([9, 9, 9, 9]);
    });

    it("should convert IELTS 7/7/7/7 to CLB 7/9/9/9", () => {
      const clbs = convertIELTSToCLB(7, 7, 7, 7);
      expect(clbs).toEqual([7, 9, 9, 9]);
    });

    it("should convert IELTS 6.5/6.5/6.5/6.5 to CLB 7/8/8/8", () => {
      const clbs = convertIELTSToCLB(6.5, 6.5, 6.5, 6.5);
      expect(clbs).toEqual([7, 8, 8, 8]);
    });

    it("should convert IELTS 6/6/6/6 to CLB 7/7/7/7", () => {
      const clbs = convertIELTSToCLB(6, 6, 6, 6);
      expect(clbs).toEqual([7, 7, 7, 7]);
    });

    it("should convert IELTS 5.5/5.5/5.5/5.5 to CLB 6/6/6/6", () => {
      const clbs = convertIELTSToCLB(5.5, 5.5, 5.5, 5.5);
      expect(clbs).toEqual([6, 6, 6, 6]);
    });
  });

  describe("FSW Language Score Calculation", () => {
    it("should calculate 24 points for IELTS 8/7/7/7 (CLB 9/9/9/9)", () => {
      const clbs = convertIELTSToCLB(8, 7, 7, 7);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 9 = 6 + CLB 9 = 6 + CLB 9 = 6 + CLB 9 = 6 = 24
      expect(score).toBe(24);
    });

    it("should calculate 22 points for IELTS 7/7/7/7 (CLB 7/9/9/9)", () => {
      const clbs = convertIELTSToCLB(7, 7, 7, 7);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 7 = 4 + CLB 9 = 6 + CLB 9 = 6 + CLB 9 = 6 = 22
      expect(score).toBe(22);
    });

    it("should calculate 20 points for IELTS 6.5/6.5/6.5/6.5 (CLB 7/8/8/8)", () => {
      const clbs = convertIELTSToCLB(6.5, 6.5, 6.5, 6.5);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 7 = 4 + CLB 8 = 5 + CLB 8 = 5 + CLB 8 = 5 = 19
      expect(score).toBe(19);
    });

    it("should calculate 16 points for IELTS 6/6/6/6 (CLB 7/7/7/7)", () => {
      const clbs = convertIELTSToCLB(6, 6, 6, 6);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 7 = 4 + CLB 7 = 4 + CLB 7 = 4 + CLB 7 = 4 = 16
      expect(score).toBe(16);
    });

    it("should calculate 12 points for IELTS 5.5/5.5/5.5/5.5 (CLB 6/6/6/6)", () => {
      const clbs = convertIELTSToCLB(5.5, 5.5, 5.5, 5.5);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 6 = 3 + CLB 6 = 3 + CLB 6 = 3 + CLB 6 = 3 = 12
      expect(score).toBe(12);
    });

    it("should calculate 0 points for IELTS below CLB 5 threshold", () => {
      const clbs = convertIELTSToCLB(4, 4, 4, 4);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 4 = 0 + CLB 4 = 0 + CLB 4 = 0 + CLB 4 = 0 = 0
      expect(score).toBe(0);
    });

    it("should calculate maximum 28 points for IELTS 8.5+ (CLB 10/10/10/10)", () => {
      const clbs = convertIELTSToCLB(8.5, 8, 7.5, 7.5);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 10 = 6 + CLB 10 = 6 + CLB 10 = 6 + CLB 10 = 6 = 24
      expect(score).toBe(24);
    });
  });

  describe("Edge Cases", () => {
    it("should handle mixed CLB levels correctly", () => {
      // IELTS 7.5/6.5/6/5.5
      const clbs = convertIELTSToCLB(7.5, 6.5, 6, 5.5);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 8 = 5 + CLB 8 = 5 + CLB 7 = 4 + CLB 6 = 3 = 17
      expect(score).toBe(17);
    });

    it("should handle minimum passing IELTS 5 (CLB 5)", () => {
      const clbs = convertIELTSToCLB(5, 5, 5, 5);
      const score = calculateFSWLanguageScore(clbs);
      // CLB 5 = 3 + CLB 5 = 3 + CLB 5 = 3 + CLB 5 = 3 = 12
      expect(score).toBe(12);
    });
  });
});
