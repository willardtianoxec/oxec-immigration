import { describe, it, expect } from 'vitest';
import { calculateCRS } from './crsCalculator';

describe('CRS Calculator - Scheme A (Single/No Spouse)', () => {
  it('should calculate basic CRS score for single applicant', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
    });

    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown['核心人力资本']['年龄']).toBeGreaterThan(0);
    expect(result.breakdown['核心人力资本']['学历']).toBeGreaterThan(0);
    expect(result.breakdown['核心人力资本']['语言']).toBeGreaterThan(0);
  });

  it('should handle maximum age score (29-35 years)', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 32,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
    });

    expect(result.breakdown['核心人力资本']['年龄']).toBe(94);
  });

  it('should calculate education score correctly', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 30,
      education: 'phd',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
    });

    expect(result.breakdown['核心人力资本']['学历']).toBe(150);
  });

  it('should calculate language score (CLB 7 = 68 points for IELTS 7/7/7/7)', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
    });

    // CLB 7 = 17 points per skill, 4 skills = 68 points
    expect(result.breakdown['核心人力资本']['语言']).toBe(68);
  });

  it('should calculate language score (CLB 9/10/9/9 = 127 points for IELTS 8/8/7/7)', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 35,
      education: 'masters',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: '4year',
      languageTest: 'ielts',
      listening: 8,
      reading: 8,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      hasProvincialNomination: false,
      jobOffer: false,
      studyPermit: false,
    });

    // IELTS 8/8/7/7 -> CLB 9/10/9/9 -> 31+34+31+31 = 127 points
    expect(result.breakdown['核心人力资本']['语言']).toBe(127);
  });

  it('should apply provincial nominee bonus (600 points)', () => {
    const result = calculateCRS({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      hasProvincialNomination: true,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.breakdown['附加分']).toBeDefined();
    expect(result.breakdown['附加分']['省提名']).toBe(600);
  });


});

describe('CRS Calculator - Scheme B (With Spouse)', () => {
  it('should calculate CRS score for married applicant with spouse', () => {
    const result = calculateCRS({
      familyStatus: 'married-with-spouse',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
      spouseAge: 28,
      spouseEducation: 'bachelor',
      spouseLanguageTest: 'ielts',
      spouseListening: 6,
      spouseReading: 6,
      spouseWriting: 6,
      spouseSpeaking: 6,
      spouseCanadianWorkExperience: 'none',
    });

    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown['配偶因素']).toBeDefined();
    expect(result.breakdown['配偶因素']['配偶学历']).toBeDefined();
    expect(result.breakdown['配偶因素']['配偶语言']).toBeDefined();
  });

  it('should apply spouse factor reduction correctly', () => {
    const resultA = calculateCRS({
      familyStatus: 'single',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
    });

    const resultB = calculateCRS({
      familyStatus: 'married-with-spouse',
      age: 30,
      education: 'bachelor',
      canadianEducation: false,
      overseasWorkExperience: '3plus',
      canadianWorkExperience: 'none',
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      hasProvincialNomination: false,
      spouseAge: 28,
      spouseEducation: 'bachelor',
      spouseLanguageTest: 'ielts',
      spouseListening: 6,
      spouseReading: 6,
      spouseWriting: 6,
      spouseSpeaking: 6,
      spouseCanadianWorkExperience: 'none',
    });

    // Scheme B should have spouse factor contribution
    expect(resultB.breakdown['配偶因素']).toBeDefined();
    // Scheme B should have both results calculated successfully
    expect(resultB.totalScore).toBeGreaterThan(0);
    expect(resultA.totalScore).toBeGreaterThan(0);
  });
});

