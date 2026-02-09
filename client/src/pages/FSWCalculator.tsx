'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Link } from 'wouter';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// CLB conversion helper - same as CLBTranslator
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
  } else if (testType === "celpip") {
    const listeningCLB =
      listening >= 12
        ? 10
        : listening >= 11
          ? 10
          : listening >= 10
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
                        : "CLB 4以下";
    const readingCLB =
      reading >= 12
        ? 10
        : reading >= 11
          ? 10
          : reading >= 10
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
                        : "CLB 4以下";
    const writingCLB =
      writing >= 12
        ? 10
        : writing >= 11
          ? 10
          : writing >= 10
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
                        : "CLB 4以下";
    const speakingCLB =
      speaking >= 12
        ? 10
        : speaking >= 11
          ? 10
          : speaking >= 10
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
                        : "CLB 4以下";
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
                    : "CLB 4以下";
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
                    : "CLB 4以下";
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
                    : "CLB 4以下";
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
  } else if (testType === "tcf") {
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
                    : "CLB 4以下";
    const readingCLB =
      reading >= 549
        ? 10
        : reading >= 523
          ? 9
          : reading >= 503
            ? 8
            : reading >= 458
              ? 7
              : reading >= 398
                ? 6
                : reading >= 369
                  ? 5
                  : reading >= 331
                    ? 4
                    : "CLB 4以下";
    const writingCLB =
      writing >= 549
        ? 10
        : writing >= 523
          ? 9
          : writing >= 503
            ? 8
            : writing >= 458
              ? 7
              : writing >= 398
                ? 6
                : writing >= 369
                  ? 5
                  : writing >= 331
                    ? 4
                    : "CLB 4以下";
    const speakingCLB =
      speaking >= 549
        ? 10
        : speaking >= 523
          ? 9
          : speaking >= 503
            ? 8
            : speaking >= 458
              ? 7
              : speaking >= 398
                ? 6
                : speaking >= 369
                  ? 5
                  : speaking >= 331
                    ? 4
                    : "CLB 4以下";
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  }

  return clbs;
};

export default function FSWCalculator() {
  const [formData, setFormData] = useState({
    primaryLanguage: 'english',
    primaryLanguageTest: '',
    primaryListening: 0,
    primaryReading: 0,
    primaryWriting: 0,
    primarySpeaking: 0,
    secondaryLanguage: 'none',
    secondaryLanguageTest: '',
    secondaryListening: 0,
    secondaryReading: 0,
    secondaryWriting: 0,
    secondarySpeaking: 0,
    education: '',
    workExperience: '',
    age: 0,
    canadianWorkExperience: false,
    lmiaOrOffer: false,
    canadaRelative: false,
  });

  const [result, setResult] = useState<any>(null);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // Calculate primary language score
  const calculatePrimaryLanguageScore = (): number => {
    if (!formData.primaryLanguageTest || !formData.primaryListening || !formData.primaryReading || 
        !formData.primaryWriting || !formData.primarySpeaking) {
      return 0;
    }

    const clbs = convertToCLB(
      formData.primaryListening,
      formData.primaryReading,
      formData.primaryWriting,
      formData.primarySpeaking,
      formData.primaryLanguageTest
    );

    if (clbs.some(c => typeof c === "string")) return 0;

    const minCLB = Math.min(...(clbs as number[]));
    if (minCLB >= 9) return 6 * 4; // 24分
    if (minCLB === 8) return 5 * 4; // 20分
    if (minCLB === 7) return 4 * 4; // 16分
    return 0;
  };

  // Calculate secondary language score
  const calculateSecondaryLanguageScore = (): number => {
    if (formData.secondaryLanguage === "none") return 0;
    if (!formData.secondaryLanguageTest || !formData.secondaryListening || !formData.secondaryReading || 
        !formData.secondaryWriting || !formData.secondarySpeaking) {
      return 0;
    }

    const clbs = convertToCLB(
      formData.secondaryListening,
      formData.secondaryReading,
      formData.secondaryWriting,
      formData.secondarySpeaking,
      formData.secondaryLanguageTest
    );

    if (clbs.some(c => typeof c === "string")) return 0;

    const minCLB = Math.min(...(clbs as number[]));
    return minCLB >= 5 ? 4 : 0;
  };

  // Calculate education score
  const calculateEducationScore = (): number => {
    const educationScores: { [key: string]: number } = {
      phd: 25,
      professional: 23,
      masters: 22,
      bachelor: 21,
      diploma2: 19,
      diploma1: 15,
      highschool: 5,
      below: 0,
    };
    return educationScores[formData.education] || 0;
  };

  // Calculate work experience score
  const calculateWorkExperienceScore = (): number => {
    const workScores: { [key: string]: number } = {
      '6plus': 15,
      '4to5': 13,
      '2to3': 11,
      '1': 9,
    };
    return workScores[formData.workExperience] || 0;
  };

  // Calculate age score
  const calculateAgeScore = (): number => {
    const age = formData.age;
    if (age >= 18 && age <= 35) return 12;
    if (age === 36 || age === 37) return 11;
    if (age === 38 || age === 39) return 10;
    if (age === 40 || age === 41) return 9;
    if (age === 42 || age === 43) return 8;
    if (age === 44 || age === 45) return 7;
    if (age === 46) return 6;
    if (age === 47) return 5;
    if (age === 48) return 4;
    if (age === 49) return 3;
    if (age === 50) return 2;
    if (age === 51) return 1;
    return 0;
  };

  // Calculate work arrangement score
  const calculateWorkArrangementScore = (): number => {
    return (formData.canadianWorkExperience || formData.lmiaOrOffer) ? 10 : 0;
  };

  // Calculate adaptability score
  const calculateAdaptabilityScore = (): number => {
    let score = 0;
    if (formData.canadianWorkExperience) score += 10;
    else {
      if (formData.lmiaOrOffer) score += 5;
      if (formData.canadaRelative) score += 5;
    }
    return Math.min(score, 10);
  };

  const handleCalculate = () => {
    // Validate form
    if (!formData.primaryLanguageTest || !formData.primaryListening || !formData.primaryReading || 
        !formData.primaryWriting || !formData.primarySpeaking || !formData.education || 
        !formData.workExperience || !formData.age) {
      setValidationMessage("表单不能为空");
      setShowValidationError(true);
      return;
    }

    const languageScore = calculatePrimaryLanguageScore() + calculateSecondaryLanguageScore();
    const educationScore = calculateEducationScore();
    const workScore = calculateWorkExperienceScore();
    const ageScore = calculateAgeScore();
    const arrangementScore = calculateWorkArrangementScore();
    const adaptabilityScore = calculateAdaptabilityScore();

    const totalScore = languageScore + educationScore + workScore + ageScore + arrangementScore + adaptabilityScore;

    setResult({
      total: totalScore,
      language: languageScore,
      education: educationScore,
      work: workScore,
      age: ageScore,
      arrangement: arrangementScore,
      adaptability: adaptabilityScore,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Calculator className="h-12 w-12" />
            <h1 className="text-4xl font-bold text-gray-900">FSW算分工具</h1>
          </div>
          <p className="text-lg opacity-90">最新FSW 67分工具/评估FSW入池/Federal Skilled Worker</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Skills */}
            <Card>
              <CardHeader>
                <CardTitle>语言技能</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Language */}
                <div className="space-y-4">
                  <h3 className="font-semibold">第一语言</h3>
                  <div>
                    <Label>语言选择</Label>
                    <Select value={formData.primaryLanguage} onValueChange={(value: any) => setFormData({ ...formData, primaryLanguage: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">英语</SelectItem>
                        <SelectItem value="french">法语</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>考试类型</Label>
                    <Select value={formData.primaryLanguageTest} onValueChange={(value) => setFormData({ ...formData, primaryLanguageTest: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ielts">IELTS</SelectItem>
                        <SelectItem value="celpip">CELPIP</SelectItem>
                        <SelectItem value="pte">PTE</SelectItem>
                        {formData.primaryLanguage === 'french' && (
                          <>
                            <SelectItem value="tef">TEF</SelectItem>
                            <SelectItem value="tcf">TCF</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {['listening', 'reading', 'writing', 'speaking'].map((skill) => {
                      const skillKey = `primary${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof typeof formData;
                      return (
                        <div key={skill}>
                          <Label className="text-sm">{skill === 'listening' ? '听力' : skill === 'reading' ? '阅读' : skill === 'writing' ? '写作' : '口语'}</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={(formData[skillKey] as number) || ''}
                            onChange={(e) => setFormData({ ...formData, [skillKey]: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Language */}
                <div className="space-y-4">
                  <h3 className="font-semibold">第二语言</h3>
                  <div>
                    <Label>语言选择</Label>
                    <Select value={formData.secondaryLanguage} onValueChange={(value: any) => setFormData({ ...formData, secondaryLanguage: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">没有</SelectItem>
                        {formData.primaryLanguage === 'english' && <SelectItem value="french">法语</SelectItem>}
                        {formData.primaryLanguage === 'french' && <SelectItem value="english">英语</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.secondaryLanguage !== 'none' && (
                    <>
                      <div>
                        <Label>考试类型</Label>
                        <Select value={formData.secondaryLanguageTest} onValueChange={(value) => setFormData({ ...formData, secondaryLanguageTest: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择" />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.secondaryLanguage === 'french' ? (
                              <>
                                <SelectItem value="tef">TEF</SelectItem>
                                <SelectItem value="tcf">TCF</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="ielts">IELTS</SelectItem>
                                <SelectItem value="celpip">CELPIP</SelectItem>
                                <SelectItem value="pte">PTE</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        {['listening', 'reading', 'writing', 'speaking'].map((skill) => {
                          const skillKey = `secondary${skill.charAt(0).toUpperCase() + skill.slice(1)}` as keyof typeof formData;
                          return (
                            <div key={skill}>
                              <Label className="text-sm">{skill === 'listening' ? '听力' : skill === 'reading' ? '阅读' : skill === 'writing' ? '写作' : '口语'}</Label>
                              <Input
                                type="number"
                                step="0.5"
                                value={(formData[skillKey] as number) || ''}
                                onChange={(e) => setFormData({ ...formData, [skillKey]: parseFloat(e.target.value) || 0 })}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>教育背景</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>最高学历</Label>
                <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phd">博士学位 (Ph.D.)</SelectItem>
                    <SelectItem value="professional">专业学位</SelectItem>
                    <SelectItem value="masters">研究生文凭、证书</SelectItem>
                    <SelectItem value="bachelor">学士学位</SelectItem>
                    <SelectItem value="diploma2">2年制大专</SelectItem>
                    <SelectItem value="diploma1">1年制大专</SelectItem>
                    <SelectItem value="highschool">高中</SelectItem>
                    <SelectItem value="below">高中以下</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Work Experience & Age */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>工作经验</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formData.workExperience} onValueChange={(value) => setFormData({ ...formData, workExperience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6plus">6年及以上</SelectItem>
                      <SelectItem value="4to5">4到5年</SelectItem>
                      <SelectItem value="2to3">2到3年</SelectItem>
                      <SelectItem value="1">1年</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>年龄</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    placeholder="请输入年龄"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Work Arrangement */}
            <Card>
              <CardHeader>
                <CardTitle>工作安排</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>有加拿大工作经历</Label>
                  <Switch checked={formData.canadianWorkExperience} onCheckedChange={(checked) => setFormData({ ...formData, canadianWorkExperience: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>雇主持有LMIA或工作邀请</Label>
                  <Switch checked={formData.lmiaOrOffer} onCheckedChange={(checked) => setFormData({ ...formData, lmiaOrOffer: checked })} />
                </div>
              </CardContent>
            </Card>

            {/* Adaptability */}
            <Card>
              <CardHeader>
                <CardTitle>适应性</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label>在加拿大有18岁以上PR或公民亲属</Label>
                  <Switch checked={formData.canadaRelative} onCheckedChange={(checked) => setFormData({ ...formData, canadaRelative: checked })} />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleCalculate} className="w-full" size="lg">
              我的计算结果
            </Button>
          </div>

          {/* Right Panel */}
          <div>
            {result ? (
              <Card>
                <CardHeader>
                  <CardTitle>您的得分</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 border-b">
                    <p className="text-sm text-gray-600">总分</p>
                    <p className="text-4xl font-bold">{result.total}</p>
                    {result.total >= 67 ? (
                      <p className="text-green-600 mt-2">✓ 达到67分入池门槛</p>
                    ) : (
                      <p className="text-red-600 mt-2">✗ 未达到67分入池门槛</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>语言技能</span><span>{result.language}/28</span></div>
                    <div className="flex justify-between"><span>教育背景</span><span>{result.education}/25</span></div>
                    <div className="flex justify-between"><span>年龄</span><span>{result.age}/12</span></div>
                    <div className="flex justify-between"><span>工作经验</span><span>{result.work}/15</span></div>
                    <div className="flex justify-between"><span>工作安排</span><span>{result.arrangement}/10</span></div>
                    <div className="flex justify-between"><span>适应性</span><span>{result.adaptability}/10</span></div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>关于FSW</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <p>
                    联邦技术工人计划（FSW）是面向拥有海外工作经验的技术人员的联邦快速通道（EE）移民类别。申请人需要达到至少67分的门槛才可进入候选池，然后根据CRS分数等待被抽选。FSW申请人可以从境外申请，但所有申请人需要提供财务证明，有能力支持其本人及家庭在加拿大至少半年的生活所需。
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Validation Dialog */}
      <Dialog open={showValidationError} onOpenChange={setShowValidationError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>表单验证错误</DialogTitle>
          </DialogHeader>
          <DialogDescription>{validationMessage}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowValidationError(false)}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
