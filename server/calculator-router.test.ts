import { describe, it, expect } from 'vitest';
import { calculateCRS as calculateCRSLogic } from './crsCalculator';

describe('Calculator Router - calculateCRS', () => {
  it('should calculate CRS score for single applicant', () => {
    const result = calculateCRSLogic({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: 'none',
      primaryLanguage: 'english',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      canadianWorkExperience: 'none',
      overseasWorkExperience: '3plus',
    });

    expect(result).toBeDefined();
    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown).toBeDefined();
    expect(typeof result.totalScore).toBe('number');
  });

  it('should calculate CRS score for married applicant with spouse', () => {
    const result = calculateCRSLogic({
      familyStatus: 'married-with-spouse',
      age: 35,
      education: 'masters',
      canadianEducation: '1-2year',
      primaryLanguage: 'english',
      languageTest: 'ielts',
      listening: 8,
      reading: 8,
      writing: 7,
      speaking: 8,
      canadianWorkExperience: '2year',
      overseasWorkExperience: '3plus',
      spouseAge: 33,
      spouseEducation: 'bachelor',
      spouseLanguageTest: 'ielts',
      spouseListening: 7,
      spouseReading: 7,
      spouseWriting: 7,
      spouseSpeaking: 7,
      spouseCanadianWorkExperience: 'none',
    });

    expect(result).toBeDefined();
    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown).toBeDefined();
  });

  it('should handle secondary language input', () => {
    const result = calculateCRSLogic({
      familyStatus: 'single',
      age: 28,
      education: 'bachelor',
      canadianEducation: 'none',
      primaryLanguage: 'english',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      secondaryLanguage: 'french',
      secondLanguageTest: 'tef',
      secondListening: 400,
      secondReading: 400,
      secondWriting: 400,
      secondSpeaking: 400,
      canadianWorkExperience: 'none',
      overseasWorkExperience: '1year',
    });

    expect(result).toBeDefined();
    expect(result.totalScore).toBeGreaterThan(0);
  });

  it('should handle provincial nomination', () => {
    const result = calculateCRSLogic({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: 'none',
      primaryLanguage: 'english',
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      canadianWorkExperience: 'none',
      overseasWorkExperience: 'none',
      hasProvincialNomination: true,
    });

    expect(result).toBeDefined();
    expect(result.totalScore).toBeGreaterThan(0);
    // Provincial nomination should add 600 points
    expect(result.totalScore).toBeGreaterThanOrEqual(600);
  });

  it('should return consistent results for same input', () => {
    const input = {
      familyStatus: 'single' as const,
      age: 32,
      education: 'bachelor' as const,
      canadianEducation: 'none' as const,
      primaryLanguage: 'english' as const,
      languageTest: 'ielts' as const,
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      canadianWorkExperience: '1year' as const,
      overseasWorkExperience: '2year' as const,
    };

    const result1 = calculateCRSLogic(input);
    const result2 = calculateCRSLogic(input);

    expect(result1.totalScore).toBe(result2.totalScore);
  });
});
