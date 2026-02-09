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
    age: 0,
    education: "" as string,
    canadianEducation: "" as string,
    
    // Primary language
    primaryLanguage: "english" as "english" | "french",
    languageTest: "" as string,
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
    
    // Secondary language
    secondaryLanguage: "none" as "english" | "french" | "none",
    secondLanguageTest: "none" as string,
    secondListening: 0,
    secondReading: 0,
    secondWriting: 0,
    secondSpeaking: 0,
    
    canadianWorkExperience: "" as string,
    overseasWorkExperience: "" as string,
    
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
    spouseAge: 17,
    spouseEducation: "bachelor" as string,
    spouseLanguageTest: "none" as string,
    spouseListening: 0,
    spouseReading: 0,
    spouseWriting: 0,
    spouseSpeaking: 0,
    spouseCanadianWorkExperience: "none" as string,
  });

  const [result, setResult] = useState<any>(null);
  const utils = trpc.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      // Prepare payload based on family status
      const payload: any = {
        familyStatus,
        age: formData.age,
        education: formData.education,
        canadianEducation: formData.canadianEducation || undefined,
        languageTest: formData.languageTest,
        listening: formData.listening,
        reading: formData.reading,
        writing: formData.writing,
        speaking: formData.speaking,
        canadianWorkExperience: formData.canadianWorkExperience,
        overseasWorkExperience: formData.overseasWorkExperience || undefined,
        hasSiblingInCanada: formData.hasSiblingInCanada,
        hasProvincialNomination: formData.hasProvincialNomination,
      };
      
      // Add spouse fields only if married with spouse
      if (familyStatus === 'married-with-spouse') {
        payload.spouseAge = formData.spouseAge;
        payload.spouseEducation = formData.spouseEducation;
        payload.spouseLanguageTest = formData.spouseLanguageTest;
        payload.spouseListening = formData.spouseListening;
        payload.spouseReading = formData.spouseReading;
        payload.spouseWriting = formData.spouseWriting;
        payload.spouseSpeaking = formData.spouseSpeaking;
        payload.spouseCanadianWorkExperience = formData.spouseCanadianWorkExperience;
      }
      
      const result = await utils.calculator.calculateCRS.fetch(payload);
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
          <h1 className="text-4xl font-black mb-4" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900, fontSize: "64px" }}>
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
                <CardDescription>作为主申请人</CardDescription>
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
                    <span>我现在单身（含离异）</span>
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
                    <span>我有配偶，但不带配偶申请</span>
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
                    <span>我有配偶，且配偶一起申请</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  注：配偶指已婚配偶、同居一年以上伴侣或事实配偶。
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Human Capital Factors */}
            <Card>
              <CardHeader>
                <CardTitle>人力资源因素</CardTitle>
                <CardDescription>作为主申请人</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div>
                  <Label htmlFor="age">年龄</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.age || 0}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>

                {/* Education */}
                <div>
                  <Label htmlFor="education">最高学历</Label>
                  <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                    <SelectTrigger id="education">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="phd">博士学位（Ph.D.）</SelectItem>
                      <SelectItem value="masters">硕士学位或专业学位（如医学博士、法律博士等）</SelectItem>
                      <SelectItem value="double">双学位、文凭或证书（必须含3年及以上学制项目）</SelectItem>
                      <SelectItem value="bachelor">学士学位或3年制大专</SelectItem>
                      <SelectItem value="two-year">2年制大专</SelectItem>
                      <SelectItem value="one-year">1年制大专</SelectItem>
                      <SelectItem value="highschool">高中</SelectItem>
                      <SelectItem value="below">高中以下</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Canadian Education Background */}
                <div>
                  <Label htmlFor="canadianEducation">是否在加拿大取得了高等教育学位、文凭或证书</Label>
                  <Select value={formData.canadianEducation || "default"} onValueChange={(value) => setFormData({ ...formData, canadianEducation: value === "default" ? "" : value })}>
                    <SelectTrigger id="canadianEducation">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="none">无</SelectItem>
                      <SelectItem value="1-2year">1年或2年学制</SelectItem>
                      <SelectItem value="3plus">3年及以上学制</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Test Type */}
                <div>
                  <Label htmlFor="languageTest">可以提供以下哪一类语言考试成绩</Label>
                  <Select value={formData.languageTest || "default"} onValueChange={(value) => setFormData({ ...formData, languageTest: value === "default" ? "" : value })}>
                    <SelectTrigger id="languageTest">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="ielts">IELTS</SelectItem>
                      <SelectItem value="celpip">CELPIP</SelectItem>
                      <SelectItem value="pte">PTE</SelectItem>
                      <SelectItem value="tef">TEF</SelectItem>
                      <SelectItem value="tcf">TCF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Scores */}
                {formData.languageTest && (
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="listening">听力</Label>
                      <Input
                        id="listening"
                        type="number"
                        min="0"
                        max="9"
                        value={formData.listening || 0}
                        onChange={(e) => setFormData({ ...formData, listening: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reading">阅读</Label>
                      <Input
                        id="reading"
                        type="number"
                        min="0"
                        max="9"
                        value={formData.reading || 0}
                        onChange={(e) => setFormData({ ...formData, reading: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="writing">写作</Label>
                      <Input
                        id="writing"
                        type="number"
                        min="0"
                        max="9"
                        value={formData.writing || 0}
                        onChange={(e) => setFormData({ ...formData, writing: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="speaking">口语</Label>
                      <Input
                        id="speaking"
                        type="number"
                        min="0"
                        max="9"
                        value={formData.speaking || 0}
                        onChange={(e) => setFormData({ ...formData, speaking: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                )}

                {/* Canadian Work Experience */}
                <div>
                  <Label htmlFor="canadianWorkExperience">是否有加拿大工作经历</Label>
                  <Select value={formData.canadianWorkExperience || "default"} onValueChange={(value) => setFormData({ ...formData, canadianWorkExperience: value === "default" ? "" : value })}>
                    <SelectTrigger id="canadianWorkExperience">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="none">没有或1年以下</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="2year">2年</SelectItem>
                      <SelectItem value="3year">3年</SelectItem>
                      <SelectItem value="4year">4年</SelectItem>
                      <SelectItem value="5plus">5年及以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Spouse Information (if applicable) */}
            {familyStatus === "married-with-spouse" && (
              <Card>
                <CardHeader>
                  <CardTitle>配偶信息</CardTitle>
                  <CardDescription>作为主申请人配偶</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Spouse Age */}
                  <div>
                    <Label htmlFor="spouseAge">配偶年龄</Label>
                    <Input
                      id="spouseAge"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.spouseAge || 0}
                      onChange={(e) => setFormData({ ...formData, spouseAge: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>

                  {/* Spouse Education */}
                  <div>
                    <Label htmlFor="spouseEducation">配偶的最高学历</Label>
                    <Select value={formData.spouseEducation || "default"} onValueChange={(value) => setFormData({ ...formData, spouseEducation: value === "default" ? "" : value })}>
                      <SelectTrigger id="spouseEducation">
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">请选择</SelectItem>
                        <SelectItem value="phd">博士学位（Ph.D.）</SelectItem>
                        <SelectItem value="masters">硕士学位或专业学位（如医学博士、法律博士等）</SelectItem>
                        <SelectItem value="double">双学位、文凭或证书（必须含3年及以上学制项目）</SelectItem>
                        <SelectItem value="bachelor">学士学位或3年制大专</SelectItem>
                        <SelectItem value="two-year">2年制大专</SelectItem>
                        <SelectItem value="one-year">1年制大专</SelectItem>
                        <SelectItem value="highschool">高中</SelectItem>
                        <SelectItem value="below">高中以下</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Spouse Language Test */}
                  <div>
                    <Label htmlFor="spouseLanguageTest">配偶是否参加了以下语言考试</Label>
                    <Select value={formData.spouseLanguageTest || "default"} onValueChange={(value) => setFormData({ ...formData, spouseLanguageTest: value === "default" ? "" : value })}>
                      <SelectTrigger id="spouseLanguageTest">
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">请选择</SelectItem>
                        <SelectItem value="none">没有</SelectItem>
                        <SelectItem value="ielts">IELTS</SelectItem>
                        <SelectItem value="celpip">CELPIP</SelectItem>
                        <SelectItem value="pte">PTE</SelectItem>
                        <SelectItem value="tef">TEF</SelectItem>
                        <SelectItem value="tcf">TCF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Spouse Language Scores */}
                  {formData.spouseLanguageTest && formData.spouseLanguageTest !== "none" && (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="spouseListening">听力</Label>
                        <Input
                          id="spouseListening"
                          type="number"
                          min="0"
                          max="9"
                          value={formData.spouseListening || 0}
                          onChange={(e) => setFormData({ ...formData, spouseListening: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="spouseReading">阅读</Label>
                        <Input
                          id="spouseReading"
                          type="number"
                          min="0"
                          max="9"
                          value={formData.spouseReading || 0}
                          onChange={(e) => setFormData({ ...formData, spouseReading: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="spouseWriting">写作</Label>
                        <Input
                          id="spouseWriting"
                          type="number"
                          min="0"
                          max="9"
                          value={formData.spouseWriting || 0}
                          onChange={(e) => setFormData({ ...formData, spouseWriting: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="spouseSpeaking">口语</Label>
                        <Input
                          id="spouseSpeaking"
                          type="number"
                          min="0"
                          max="9"
                          value={formData.spouseSpeaking || 0}
                          onChange={(e) => setFormData({ ...formData, spouseSpeaking: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  )}

                  {/* Spouse Canadian Work Experience */}
                  <div>
                    <Label htmlFor="spouseCanadianWorkExperience">配偶是否有加拿大工作经验</Label>
                    <Select value={formData.spouseCanadianWorkExperience || "default"} onValueChange={(value) => setFormData({ ...formData, spouseCanadianWorkExperience: value === "default" ? "" : value })}>
                      <SelectTrigger id="spouseCanadianWorkExperience">
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">请选择</SelectItem>
                        <SelectItem value="none">没有或1年以下</SelectItem>
                        <SelectItem value="1year">1年</SelectItem>
                        <SelectItem value="2year">2年</SelectItem>
                        <SelectItem value="3year">3年</SelectItem>
                        <SelectItem value="4year">4年</SelectItem>
                        <SelectItem value="5plus">5年及以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 2: Skill Transferability */}
            <Card>
              <CardHeader>
                <CardTitle>可转移技能因素</CardTitle>
                <CardDescription>作为主申请人</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  系统将根据您的基础信息自动计算加分
                </p>

                {/* Overseas Work Experience */}
                <div>
                  <Label htmlFor="overseasWorkExperience">是否有加拿大境外的直接相关工作经验</Label>
                  <Select value={formData.overseasWorkExperience || "default"} onValueChange={(value) => setFormData({ ...formData, overseasWorkExperience: value === "default" ? "" : value })}>
                    <SelectTrigger id="overseasWorkExperience">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="none">没有</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="2year">2年</SelectItem>
                      <SelectItem value="3plus">3年及以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trade Certificate */}
                <div>
                  <Label htmlFor="hasTradeCertificate">是否拥有加拿大技工类职业证书</Label>
                  <Select 
                    value={formData.hasTradeCertificate ? "yes" : (formData.hasTradeCertificate === false ? "no" : "default")} 
                    onValueChange={(value) => setFormData({ ...formData, hasTradeCertificate: value === "yes" ? true : value === "no" ? false : false })}
                  >
                    <SelectTrigger id="hasTradeCertificate">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">请选择</SelectItem>
                      <SelectItem value="yes">有</SelectItem>
                      <SelectItem value="no">没有</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Additional Factors */}
            <Card>
              <CardHeader>
                <CardTitle>附加分项</CardTitle>
                <CardDescription>作为主申请人或配偶</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Sibling in Canada */}
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="hasSiblingInCanada"
                      checked={formData.hasSiblingInCanada}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasSiblingInCanada: checked })}
                    />
                    <Label htmlFor="hasSiblingInCanada" className="cursor-pointer">
                      有兄弟姐妹是加拿大公民或PR且居住在加拿大
                    </Label>
                  </div>

                  {/* Provincial Nomination */}
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="hasProvincialNomination"
                      checked={formData.hasProvincialNomination}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasProvincialNomination: checked })}
                    />
                    <Label htmlFor="hasProvincialNomination" className="cursor-pointer">
                      有加拿大省或地区提名计划出具的证明
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate} 
              disabled={isLoading}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isLoading ? "计算中..." : "计算我的分数"}
            </Button>
          </div>

          {/* Score Board */}
          {result && (
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <CardTitle className="flex items-center">
                    <CalcIcon className="mr-2 h-5 w-5" />
                    您的CRS分数
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {result.totalScore}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.message}
                    </p>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-semibold text-sm mb-3">分数明细</h4>
                    
                    {/* 核心人力资本 */}
                    {result.breakdown?.核心人力资本 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold bg-blue-50 p-2 rounded">
                          <span>核心人力资本因素</span>
                          <span className="text-blue-600">{result.breakdown.核心人力资本.小计}</span>
                        </div>
                        <div className="pl-3 space-y-1 text-xs text-muted-foreground">
                          {result.breakdown.核心人力资本.年龄 > 0 && (
                            <div className="flex justify-between">
                              <span>年龄</span>
                              <span>{result.breakdown.核心人力资本.年龄}</span>
                            </div>
                          )}
                          {result.breakdown.核心人力资本.学历 > 0 && (
                            <div className="flex justify-between">
                              <span>学历</span>
                              <span>{result.breakdown.核心人力资本.学历}</span>
                            </div>
                          )}
                          {result.breakdown.核心人力资本.语言 > 0 && (
                            <div className="flex justify-between">
                              <span>语言能力</span>
                              <span>{result.breakdown.核心人力资本.语言}</span>
                            </div>
                          )}
                          {result.breakdown.核心人力资本.加国经验 > 0 && (
                            <div className="flex justify-between">
                              <span>加国工作经验</span>
                              <span>{result.breakdown.核心人力资本.加国经验}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 配偶因素 */}
                    {result.breakdown?.配偶因素 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold bg-green-50 p-2 rounded">
                          <span>配偶因素</span>
                          <span className="text-green-600">{result.breakdown.配偶因素.小计}</span>
                        </div>
                        <div className="pl-3 space-y-1 text-xs text-muted-foreground">
                          {result.breakdown.配偶因素.配偶学历 > 0 && (
                            <div className="flex justify-between">
                              <span>配偶学历</span>
                              <span>{result.breakdown.配偶因素.配偶学历}</span>
                            </div>
                          )}
                          {result.breakdown.配偶因素.配偶语言 > 0 && (
                            <div className="flex justify-between">
                              <span>配偶语言</span>
                              <span>{result.breakdown.配偶因素.配偶语言}</span>
                            </div>
                          )}
                          {result.breakdown.配偶因素.配偶加国经验 > 0 && (
                            <div className="flex justify-between">
                              <span>配偶加国经验</span>
                              <span>{result.breakdown.配偶因素.配偶加国经验}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 可转移技能 */}
                    {result.breakdown?.可转移技能 && result.breakdown.可转移技能.小计 > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold bg-purple-50 p-2 rounded">
                          <span>可转移技能加分</span>
                          <span className="text-purple-600">{result.breakdown.可转移技能.小计}</span>
                        </div>
                        <div className="pl-3 space-y-1 text-xs text-muted-foreground">
                          {result.breakdown.可转移技能["学历+语言"] > 0 && (
                            <div className="flex justify-between">
                              <span>学历+语言</span>
                              <span>{result.breakdown.可转移技能["学历+语言"]}</span>
                            </div>
                          )}
                          {result.breakdown.可转移技能["学历+加国经验"] > 0 && (
                            <div className="flex justify-between">
                              <span>学历+加国经验</span>
                              <span>{result.breakdown.可转移技能["学历+加国经验"]}</span>
                            </div>
                          )}
                          {result.breakdown.可转移技能["海外经验+语言"] > 0 && (
                            <div className="flex justify-between">
                              <span>海外经验+语言</span>
                              <span>{result.breakdown.可转移技能["海外经验+语言"]}</span>
                            </div>
                          )}
                          {result.breakdown.可转移技能["海外经验+加国经验"] > 0 && (
                            <div className="flex justify-between">
                              <span>海外经验+加国经验</span>
                              <span>{result.breakdown.可转移技能["海外经验+加国经验"]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 附加分 */}
                    {result.breakdown?.附加分 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-semibold bg-orange-50 p-2 rounded">
                          <span>附加分项</span>
                          <span className="text-orange-600">{result.breakdown.附加分.小计}</span>
                        </div>
                        <div className="pl-3 space-y-1 text-xs text-muted-foreground">
                          {result.breakdown.附加分.兄弟姐妹 > 0 && (
                            <div className="flex justify-between">
                              <span>兄弟姐妹在加拿大</span>
                              <span>{result.breakdown.附加分.兄弟姐妹}</span>
                            </div>
                          )}
                          {result.breakdown.附加分.省提名 > 0 && (
                            <div className="flex justify-between">
                              <span>省提名证明</span>
                              <span>{result.breakdown.附加分.省提名}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full mt-6"
                    onClick={() => window.location.href = '/booking'}
                  >
                    预约咨询专业顾问
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
