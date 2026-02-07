import { describe, it, expect } from 'vitest';
import { calculateCRS, calculateBCPNP } from './crsCalculator';

describe('CRS Calculator - Scheme A (Single/No Spouse)', () => {
  it('should calculate basic CRS score for single applicant', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown['年龄得分']).toBeGreaterThan(0);
    expect(result.breakdown['教育得分']).toBeGreaterThan(0);
    expect(result.breakdown['语言能力得分']).toBeGreaterThan(0);
  });

  it('should handle maximum age score (29-35 years)', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 32,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.breakdown['年龄得分']).toBe(132);
  });

  it('should calculate education score correctly', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'phd',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.breakdown['教育得分']).toBe(150);
  });

  it('should calculate language score (CLB 7 = 119 points)', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.breakdown['语言能力得分']).toBe(119);
  });

  it('should apply provincial nominee bonus (600 points)', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: true,
      jobOffer: false,
      studyPermit: false,
    });

    expect(result.breakdown['省提名得分']).toBe(600);
  });

  it('should apply job offer bonus (200 points)', () => {
    const result = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: true,
      studyPermit: false,
    });

    expect(result.breakdown['工作邀请得分']).toBe(200);
  });
});

describe('CRS Calculator - Scheme B (With Spouse)', () => {
  it('should calculate CRS score for married applicant with spouse', () => {
    const result = calculateCRS({
      scheme: 'B',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
      spouseAge: 28,
      spouseEducationLevel: 'bachelor',
      spouseLanguageTest: 'ielts',
      spouseListening: 6,
      spouseReading: 6,
      spouseWriting: 6,
      spouseSpeaking: 6,
    });

    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown['配偶年龄得分']).toBeDefined();
    expect(result.breakdown['配偶教育得分']).toBeDefined();
  });

  it('should apply spouse factor reduction correctly', () => {
    const resultA = calculateCRS({
      scheme: 'A',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
    });

    const resultB = calculateCRS({
      scheme: 'B',
      age: 30,
      educationLevel: 'bachelor',
      canadianEducation: false,
      totalWorkExperience: 3,
      canadianWorkExperience: 0,
      languageTest: 'ielts',
      listening: 7,
      reading: 7,
      writing: 7,
      speaking: 7,
      frenchLanguage: false,
      provincialNominee: false,
      jobOffer: false,
      studyPermit: false,
      spouseAge: 28,
      spouseEducationLevel: 'bachelor',
      spouseLanguageTest: 'ielts',
      spouseListening: 6,
      spouseReading: 6,
      spouseWriting: 6,
      spouseSpeaking: 6,
    });

    // Scheme B should have lower principal applicant score due to spouse factor
    expect(resultB.breakdown['年龄得分']).toBeLessThan(resultA.breakdown['年龄得分']);
  });
});

describe('BC PNP Calculator', () => {
  it('should calculate BC PNP score correctly', () => {
    const result = calculateBCPNP({
      workExperience: '3to4',
      canadianExperience: false,
      currentlyWorking: false,
      education: 'bachelor',
      bcEducation: false,
      canadaEducation: false,
      designatedOccupation: false,
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      frenchLanguage: false,
      hourlyWage: 20,
      region: 'tier1',
      regionWorkExperience: false,
      regionEducation: false,
    });

    expect(result.totalScore).toBeGreaterThan(0);
    expect(result.breakdown).toBeDefined();
    expect(result.message).toBeDefined();
  });

  it('should apply work experience points correctly', () => {
    const result = calculateBCPNP({
      workExperience: '5plus',
      canadianExperience: false,
      currentlyWorking: false,
      education: 'bachelor',
      bcEducation: false,
      canadaEducation: false,
      designatedOccupation: false,
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      frenchLanguage: false,
      hourlyWage: 20,
      region: 'tier1',
      regionWorkExperience: false,
      regionEducation: false,
    });

    expect(result.breakdown['工作经验得分']).toBe(20);
  });

  it('should apply Canadian experience bonus', () => {
    const result = calculateBCPNP({
      workExperience: '3to4',
      canadianExperience: true,
      currentlyWorking: false,
      education: 'bachelor',
      bcEducation: false,
      canadaEducation: false,
      designatedOccupation: false,
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      frenchLanguage: false,
      hourlyWage: 20,
      region: 'tier1',
      regionWorkExperience: false,
      regionEducation: false,
    });

    expect(result.breakdown['加拿大经验得分']).toBe(10);
  });

  it('should calculate hourly wage score correctly', () => {
    const result = calculateBCPNP({
      workExperience: '3to4',
      canadianExperience: false,
      currentlyWorking: false,
      education: 'bachelor',
      bcEducation: false,
      canadaEducation: false,
      designatedOccupation: false,
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      frenchLanguage: false,
      hourlyWage: 50,
      region: 'tier1',
      regionWorkExperience: false,
      regionEducation: false,
    });

    // $50 - $15 = $35 points
    expect(result.breakdown['岗位薪资得分']).toBe(35);
  });

  it('should apply region bonus for tier 3 areas', () => {
    const result = calculateBCPNP({
      workExperience: '3to4',
      canadianExperience: false,
      currentlyWorking: false,
      education: 'bachelor',
      bcEducation: false,
      canadaEducation: false,
      designatedOccupation: false,
      languageTest: 'ielts',
      listening: 6,
      reading: 6,
      writing: 6,
      speaking: 6,
      frenchLanguage: false,
      hourlyWage: 20,
      region: 'tier3',
      regionWorkExperience: false,
      regionEducation: false,
    });

    expect(result.breakdown['地区得分']).toBe(15);
  });
});
