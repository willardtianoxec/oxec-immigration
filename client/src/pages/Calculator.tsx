import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { ArrowLeft, Calculator as CalcIcon } from "lucide-react";

export default function Calculator() {
  const [familyStatus, setFamilyStatus] = useState<"single" | "married-no-spouse" | "married-with-spouse">("single");
  
  const [formData, setFormData] = useState({
    age: 30,
    education: "bachelor" as "phd" | "masters" | "double" | "bachelor" | "two-year" | "one-year" | "highschool" | "below",
    canadianEducation: "none" as "none" | "1-2year" | "3plus",
    languageTest: "ielts" as "ielts" | "celpip" | "pte" | "tef" | "tcf",
    listening: 7,
    reading: 7,
    writing: 7,
    speaking: 7,
    canadianWorkExperience: "none" as "none" | "1year" | "2year" | "3year" | "4year" | "5plus",
    overseasWorkExperience: "none" as "none" | "1year" | "2year" | "3plus",
    
    // Transferable Skills
    hasLanguageEducationCombination: false,
    hasEducationWorkExperienceCombination: false,
    hasOverseasLanguageCombination: false,
    hasOverseasWorkExperienceCombination: false,
    hasTradeCertificate: false,
    
    // Additional Factors
    hasSiblingInCanada: false,
    hasProvincialNomination: false,
    hasFrenchLanguage: false,
    hasCanadianEducation: false,
    
    // Spouse (if applicable)
    spouseAge: 30,
    spouseEducation: "bachelor" as "phd" | "masters" | "double" | "bachelor" | "two-year" | "one-year" | "highschool" | "below",
    spouseLanguageTest: "none" as "none" | "ielts" | "celpip" | "pte" | "tef" | "tcf",
    spouseListening: 0,
    spouseReading: 0,
    spouseWriting: 0,
    spouseSpeaking: 0,
    spouseCanadianWorkExperience: "none" as "none" | "1year" | "2year" | "3year" | "4year" | "5plus",
  });

  const [result, setResult] = useState<any>(null);
  const utils = trpc.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        familyStatus,
        ...formData,
      };
      const result = await utils.calculator.calculateCRS.fetch(payload as any);
      setResult(result);
    } catch (error: any) {
      toast.error("计算失败: " + (error.message || '未知错误'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center text-primary-foreground hover:opacity-80 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Link>
          <h1 className="text-4xl font-black mb-4 flex items-center" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900, fontSize: "64px" }}>
            <CalcIcon className="mr-3 h-10 w-10" />
            联邦快速通道CRS算分工具
          </h1>
          <p className="text-lg opacity-90">
            评估 EE 入池分数
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Family Status Selection */}
            <Card>
              <CardHeader>
                <CardTitle>家庭移民安排</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="familyStatus"
                      value="single"
                      checked={familyStatus === "single"}
                      onChange={(e) => setFamilyStatus(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span>单身</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="familyStatus"
                      value="married-no-spouse"
                      checked={familyStatus === "married-no-spouse"}
                      onChange={(e) => setFamilyStatus(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span>已婚（配偶不随行）</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="familyStatus"
                      value="married-with-spouse"
                      checked={familyStatus === "married-with-spouse"}
                      onChange={(e) => setFamilyStatus(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span>已婚（配偶随行）</span>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  <strong>注：</strong>配偶指已婚配偶、同居一年以上伴侣或事实配偶。
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Core Human Capital Factors */}
            <Card>
              <CardHeader>
                <CardTitle>人力资源因素</CardTitle>
                <CardDescription>核心评分因素（最高 136 分）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">年龄</Label>
                  <Input
                    id="age"
                    type="number"
                    min="16"
                    max="65"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <Label htmlFor="education">最高学历</Label>
                  <Select value={formData.education} onValueChange={(value: any) => setFormData({ ...formData, education: value })}>
                    <SelectTrigger id="education">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phd">博士学位</SelectItem>
                      <SelectItem value="masters">硕士学位</SelectItem>
                      <SelectItem value="double">双学位或研究生文凭</SelectItem>
                      <SelectItem value="bachelor">学士学位</SelectItem>
                      <SelectItem value="two-year">两年制大专</SelectItem>
                      <SelectItem value="one-year">一年制大专</SelectItem>
                      <SelectItem value="highschool">高中</SelectItem>
                      <SelectItem value="below">高中以下</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Canadian Education */}
                <div className="space-y-2">
                  <Label htmlFor="canadianEducation">加拿大教育背景</Label>
                  <Select value={formData.canadianEducation} onValueChange={(value: any) => setFormData({ ...formData, canadianEducation: value })}>
                    <SelectTrigger id="canadianEducation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无</SelectItem>
                      <SelectItem value="1-2year">1-2年</SelectItem>
                      <SelectItem value="3plus">3年以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Test */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="languageTest">语言考试类型</Label>
                    <Select value={formData.languageTest} onValueChange={(value: any) => setFormData({ ...formData, languageTest: value })}>
                      <SelectTrigger id="languageTest">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ielts">IELTS</SelectItem>
                        <SelectItem value="celpip">CELPIP</SelectItem>
                        <SelectItem value="pte">PTE</SelectItem>
                        <SelectItem value="tef">TEF</SelectItem>
                        <SelectItem value="tcf">TCF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="listening">听力</Label>
                      <Input
                        id="listening"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.listening}
                        onChange={(e) => setFormData({ ...formData, listening: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reading">阅读</Label>
                      <Input
                        id="reading"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.reading}
                        onChange={(e) => setFormData({ ...formData, reading: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="writing">写作</Label>
                      <Input
                        id="writing"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.writing}
                        onChange={(e) => setFormData({ ...formData, writing: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="speaking">口语</Label>
                      <Input
                        id="speaking"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.speaking}
                        onChange={(e) => setFormData({ ...formData, speaking: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Canadian Work Experience */}
                <div className="space-y-2">
                  <Label htmlFor="canadianWorkExperience">加拿大工作经验</Label>
                  <Select value={formData.canadianWorkExperience} onValueChange={(value: any) => setFormData({ ...formData, canadianWorkExperience: value })}>
                    <SelectTrigger id="canadianWorkExperience">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="2year">2年</SelectItem>
                      <SelectItem value="3year">3年</SelectItem>
                      <SelectItem value="4year">4年</SelectItem>
                      <SelectItem value="5plus">5年以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Overseas Work Experience */}
                <div className="space-y-2">
                  <Label htmlFor="overseasWorkExperience">海外工作经验</Label>
                  <Select value={formData.overseasWorkExperience} onValueChange={(value: any) => setFormData({ ...formData, overseasWorkExperience: value })}>
                    <SelectTrigger id="overseasWorkExperience">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="2year">2年</SelectItem>
                      <SelectItem value="3plus">3年以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spouse Section - Only show if married with spouse */}
                {familyStatus === "married-with-spouse" && (
                  <div className="pt-6 border-t space-y-6">
                    <h3 className="font-semibold text-lg">配偶信息</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="spouseAge">配偶年龄</Label>
                      <Input
                        id="spouseAge"
                        type="number"
                        min="16"
                        max="65"
                        value={formData.spouseAge}
                        onChange={(e) => setFormData({ ...formData, spouseAge: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="spouseEducation">配偶学历</Label>
                      <Select value={formData.spouseEducation} onValueChange={(value: any) => setFormData({ ...formData, spouseEducation: value })}>
                        <SelectTrigger id="spouseEducation">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phd">博士学位</SelectItem>
                          <SelectItem value="masters">硕士学位</SelectItem>
                          <SelectItem value="double">双学位或研究生文凭</SelectItem>
                          <SelectItem value="bachelor">学士学位</SelectItem>
                          <SelectItem value="two-year">两年制大专</SelectItem>
                          <SelectItem value="one-year">一年制大专</SelectItem>
                          <SelectItem value="highschool">高中</SelectItem>
                          <SelectItem value="below">高中以下</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="spouseLanguageTest">配偶语言考试</Label>
                        <Select value={formData.spouseLanguageTest} onValueChange={(value: any) => setFormData({ ...formData, spouseLanguageTest: value })}>
                          <SelectTrigger id="spouseLanguageTest">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">无</SelectItem>
                            <SelectItem value="ielts">IELTS</SelectItem>
                            <SelectItem value="celpip">CELPIP</SelectItem>
                            <SelectItem value="pte">PTE</SelectItem>
                            <SelectItem value="tef">TEF</SelectItem>
                            <SelectItem value="tcf">TCF</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.spouseLanguageTest !== "none" && (
                        <div className="grid grid-cols-4 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="spouseListening">听力</Label>
                            <Input
                              id="spouseListening"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.spouseListening}
                              onChange={(e) => setFormData({ ...formData, spouseListening: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="spouseReading">阅读</Label>
                            <Input
                              id="spouseReading"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.spouseReading}
                              onChange={(e) => setFormData({ ...formData, spouseReading: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="spouseWriting">写作</Label>
                            <Input
                              id="spouseWriting"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.spouseWriting}
                              onChange={(e) => setFormData({ ...formData, spouseWriting: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="spouseSpeaking">口语</Label>
                            <Input
                              id="spouseSpeaking"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.spouseSpeaking}
                              onChange={(e) => setFormData({ ...formData, spouseSpeaking: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="spouseCanadianWorkExperience">配偶加拿大工作经验</Label>
                      <Select value={formData.spouseCanadianWorkExperience} onValueChange={(value: any) => setFormData({ ...formData, spouseCanadianWorkExperience: value })}>
                        <SelectTrigger id="spouseCanadianWorkExperience">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">无</SelectItem>
                          <SelectItem value="1year">1年</SelectItem>
                          <SelectItem value="2year">2年</SelectItem>
                          <SelectItem value="3year">3年</SelectItem>
                          <SelectItem value="4year">4年</SelectItem>
                          <SelectItem value="5plus">5年以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 2: Skill Transferability Factors */}
            <Card>
              <CardHeader>
                <CardTitle>可转移技能因素</CardTitle>
                <CardDescription>系统将根据您的基础信息自动计算加分</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasLanguageEducationCombination">学历与语言组合加分</Label>
                  <Switch
                    id="hasLanguageEducationCombination"
                    checked={formData.hasLanguageEducationCombination}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasLanguageEducationCombination: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasEducationWorkExperienceCombination">学历与加拿大经验组合加分</Label>
                  <Switch
                    id="hasEducationWorkExperienceCombination"
                    checked={formData.hasEducationWorkExperienceCombination}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasEducationWorkExperienceCombination: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasOverseasLanguageCombination">海外经验与语言组合加分</Label>
                  <Switch
                    id="hasOverseasLanguageCombination"
                    checked={formData.hasOverseasLanguageCombination}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasOverseasLanguageCombination: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasOverseasWorkExperienceCombination">海外经验与加拿大经验组合加分</Label>
                  <Switch
                    id="hasOverseasWorkExperienceCombination"
                    checked={formData.hasOverseasWorkExperienceCombination}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasOverseasWorkExperienceCombination: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasTradeCertificate">技工证书加分</Label>
                  <Switch
                    id="hasTradeCertificate"
                    checked={formData.hasTradeCertificate}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasTradeCertificate: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Additional Factors */}
            <Card>
              <CardHeader>
                <CardTitle>附加分项</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasSiblingInCanada">在加拿大有兄弟姐妹 (13分)</Label>
                  <Switch
                    id="hasSiblingInCanada"
                    checked={formData.hasSiblingInCanada}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasSiblingInCanada: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasProvincialNomination">省提名 (600分)</Label>
                  <Switch
                    id="hasProvincialNomination"
                    checked={formData.hasProvincialNomination}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasProvincialNomination: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasFrenchLanguage">法语额外加分</Label>
                  <Switch
                    id="hasFrenchLanguage"
                    checked={formData.hasFrenchLanguage}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasFrenchLanguage: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hasCanadianEducation">加拿大教育加分</Label>
                  <Switch
                    id="hasCanadianEducation"
                    checked={formData.hasCanadianEducation}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasCanadianEducation: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg"
            >
              {isLoading ? "计算中..." : "计算我的分数"}
            </Button>
          </div>

          {/* Score Board */}
          <div className="lg:col-span-1">
            {result ? (
              <Card className="sticky top-8 border-2 border-teal-600">
                <CardHeader className="bg-teal-600 text-white">
                  <CardTitle className="flex items-center">
                    📊 您的 CRS 分数
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-teal-600">{result.totalScore}</div>
                    <p className="text-sm text-gray-600 mt-2">
                      {result.totalScore >= 470
                        ? "恭喜！您的分数具有竞争力。"
                        : "建议提升您的个人资料。"}
                    </p>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <h4 className="font-semibold text-sm">分数明细</h4>
                    {result.breakdown && Object.entries(result.breakdown).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-semibold text-teal-600">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/booking">
                    <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700">
                      预约咨询专业顾问
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-8 border-2 border-gray-200">
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">填写表单后，您的 CRS 分数将显示在这里</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
