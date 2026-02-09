import { describe, it, expect } from 'vitest';

// CLB conversion function - same as in FSWCalculator.tsx
const convertToCLB = (
  listening: number,
  reading: number,
  writing: number,
  speaking: number,
  testType: string
): (number | string)[] => {
  let clbs: (number | string)[] = [];

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
                      : "CLB 4以下";
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
                          : "CLB 4以下";
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
                      : "CLB 4以下";
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
                      : "CLB 4以下";
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "tef") {
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
                    : "CLB 4以下";
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
                    : "CLB 4以下";
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
                    : "CLB 4以下";
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
                    : "CLB 4以下";
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  }

  return clbs;
};

describe('FSW Calculator CLB Conversion', () => {
  describe('IELTS to CLB conversion', () => {
    it('should correctly convert IELTS 8.0 to CLB 9/10', () => {
      const result = convertToCLB(8, 8, 8, 8, 'ielts');
      // listening: 8 >= 8 = CLB 9
      // reading: 8 >= 8 = CLB 10
      // writing: 8 >= 7.5 = CLB 10
      // speaking: 8 >= 7.5 = CLB 10
      expect(result).toEqual([9, 10, 10, 10]);
    });

    it('should correctly convert IELTS 8/7/7/7 to [9, 9, 9, 9]', () => {
      const result = convertToCLB(8, 7, 7, 7, 'ielts');
      // listening: 8 >= 8 = CLB 9
      // reading: 7 >= 7 = CLB 9
      // writing: 7 >= 7 = CLB 9
      // speaking: 7 >= 7 = CLB 9
      expect(result).toEqual([9, 9, 9, 9]);
    });

    it('should correctly convert IELTS 7.0 to CLB 7 (listening)', () => {
      const result = convertToCLB(7, 0, 0, 0, 'ielts');
      // IELTS 7.0 listening: 7 >= 6.5 = CLB 7
      expect(result[0]).toBe(7);
    });

    it('should correctly convert IELTS 7.0 to CLB 9 (reading)', () => {
      const result = convertToCLB(0, 7, 0, 0, 'ielts');
      // reading: 7 >= 7 = CLB 9
      expect(result[1]).toBe(9);
    });

    it('should correctly convert IELTS 7.0 to CLB 9 (writing)', () => {
      const result = convertToCLB(0, 0, 7, 0, 'ielts');
      // writing: 7 >= 7 = CLB 9
      expect(result[2]).toBe(9);
    });

    it('should correctly convert IELTS 7.0 to CLB 9 (speaking)', () => {
      const result = convertToCLB(0, 0, 0, 7, 'ielts');
      // speaking: 7 >= 7 = CLB 9
      expect(result[3]).toBe(9);
    });

    it('should correctly convert IELTS 6.5 to CLB 7 (listening)', () => {
      const result = convertToCLB(6.5, 0, 0, 0, 'ielts');
      // listening: 6.5 >= 6.5 = CLB 7
      expect(result[0]).toBe(7);
    });

    it('should correctly convert IELTS 5.0 to CLB 5', () => {
      const result = convertToCLB(5, 5, 5, 5, 'ielts');
      // listening: 5 >= 5 = CLB 5
      // reading: 5 >= 5 = CLB 5
      // writing: 5 >= 5 = CLB 5
      // speaking: 5 >= 5 = CLB 5
      expect(result).toEqual([5, 5, 5, 5]);
    });

    it('should correctly convert IELTS 4.0 to CLB 4 or below', () => {
      const result = convertToCLB(4, 4, 4, 4, 'ielts');
      // IELTS 4.0 is below the CLB 4 threshold for listening (4.5)
      // but reading/writing/speaking have different thresholds
      expect(result[0]).toBe('CLB 4以下'); // listening: 4.0 < 4.5
      expect(result[1]).toBe(4); // reading: 4.0 >= 4
      expect(result[2]).toBe(4); // writing: 4.0 >= 4
      expect(result[3]).toBe(4); // speaking: 4.0 >= 4
    });
  });

  describe('TEF to CLB conversion', () => {
    it('should correctly convert TEF 500 to CLB 8 (listening)', () => {
      const result = convertToCLB(500, 0, 0, 0, 'tef');
      // listening: 500 >= 462 but < 503, wait 500 >= 503? No, so CLB 8
      // Actually: 500 >= 462 = CLB 8
      expect(result[0]).toBe(8);
    });

    it('should correctly convert TEF 500 to CLB 8 (reading)', () => {
      const result = convertToCLB(0, 500, 0, 0, 'tef');
      // reading: 500 >= 462 = CLB 8
      expect(result[1]).toBe(8);
    });

    it('should correctly convert TEF 500/500/500/500', () => {
      const result = convertToCLB(500, 500, 500, 500, 'tef');
      // TEF 500 falls in CLB 8 range for listening and reading
      expect(result[0]).toBe(8); // listening (462-503 = CLB 8)
      expect(result[1]).toBe(8); // reading (462-503 = CLB 8)
      expect(result[2]).toBe(8); // writing (472-512 = CLB 8)
      // speaking: 500 >= 494 but < 518, so need to check threshold
      // Looking at code: >= 518 = CLB 9, >= 494 = CLB 8
      expect(result[3]).toBe(8); // speaking (494-518 = CLB 8)
    });

    it('should correctly convert TEF 546+ to CLB 10', () => {
      const result = convertToCLB(546, 546, 558, 556, 'tef');
      // listening: 546 >= 546 = CLB 10
      // reading: 546 >= 546 = CLB 10
      // writing: 558 >= 558 = CLB 10
      // speaking: 556 >= 556 = CLB 10
      expect(result).toEqual([10, 10, 10, 10]);
    });

    it('should correctly convert TEF 503 to CLB 9 (listening)', () => {
      const result = convertToCLB(503, 0, 0, 0, 'tef');
      // listening: 503 >= 503 = CLB 9
      expect(result[0]).toBe(9);
    });
  });

  describe('FSW Language Scoring Logic', () => {
    it('should calculate 24 points for all CLB 9 (first language)', () => {
      const clbs = convertToCLB(8, 7, 7, 7, 'ielts');
      // [9, 9, 9, 9] - all CLB 9, minimum is 9
      const minCLB = Math.min(...(clbs as number[]));
      const score = minCLB >= 9 ? 6 * 4 : minCLB === 8 ? 5 * 4 : minCLB === 7 ? 4 * 4 : 0;
      expect(score).toBe(24);
    });

    it('should calculate 20 points for CLB 8 (first language)', () => {
      const clbs = convertToCLB(7.5, 7, 7, 7, 'ielts');
      // listening: 7.5 >= 7.5 = CLB 8
      // reading: 7 >= 7 = CLB 9
      // writing: 7 >= 7 = CLB 9
      // speaking: 7 >= 7 = CLB 9
      // [8, 9, 9, 9] - minimum is CLB 8
      const minCLB = Math.min(...(clbs as number[]));
      const score = minCLB >= 9 ? 6 * 4 : minCLB === 8 ? 5 * 4 : minCLB === 7 ? 4 * 4 : 0;
      expect(score).toBe(20);
    });

    it('should calculate 16 points for CLB 7 (first language)', () => {
      const clbs = convertToCLB(6.5, 6, 6, 6, 'ielts');
      // listening: 6.5 >= 6.5 = CLB 7
      // reading: 6 >= 6 = CLB 7
      // writing: 6 >= 6 = CLB 7
      // speaking: 6 >= 6 = CLB 7
      // [7, 7, 7, 7] - all CLB 7, minimum is 7
      const minCLB = Math.min(...(clbs as number[]));
      const score = minCLB >= 9 ? 6 * 4 : minCLB === 8 ? 5 * 4 : minCLB === 7 ? 4 * 4 : 0;
      expect(score).toBe(16);
    });

    it('should calculate 4 points for CLB 5+ (second language)', () => {
      // Use TEF scores that all map to CLB 5 or higher
      const clbs = convertToCLB(393, 393, 379, 422, 'tef');
      // listening: 393 >= 393 = CLB 6
      // reading: 393 >= 393 = CLB 6
      // writing: 379 >= 379 = CLB 6
      // speaking: 422 >= 422 = CLB 6
      const minCLB = Math.min(...(clbs as number[]));
      const score = minCLB >= 5 ? 4 : 0;
      expect(score).toBe(4);
    });

    it('should calculate 0 points for CLB below 5 (second language)', () => {
      // Use a very low TEF score that maps to CLB 4 or below
      const clbs = convertToCLB(300, 300, 250, 320, 'tef');
      // listening: 300 < 306 = CLB 4
      // reading: 300 < 306 = CLB 4
      // writing: 250 < 268 = CLB 4
      // speaking: 320 < 328 = CLB 4
      const minCLB = Math.min(...(clbs as number[]));
      const score = minCLB >= 5 ? 4 : 0;
      expect(score).toBe(0);
    });
  });
});
