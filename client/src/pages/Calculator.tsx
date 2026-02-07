import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { ArrowLeft, Calculator as CalcIcon, TrendingUp, Award } from "lucide-react";

export default function Calculator() {
  const [familyStatus, setFamilyStatus] = useState<"single" | "married-no-spouse" | "married-with-spouse">("single");
  
  const [formData, setFormData] = useState({
    familyStatus: "single" as "single" | "married-no-spouse" | "married-with-spouse",
    age: 30,
    education: "bachelor" as "phd" | "masters" | "double" | "bachelor" | "two-year" | "one-year" | "highschool" | "below",
    canadianEducation: "none" as "none" | "1-2year" | "3plus",
    languageTest: "ielts" as "ielts" | "celpip" | "pte" | "tef" | "tcf",
    listening: 7,
    reading: 7,
    writing: 7,
    speaking: 7,
    secondLanguageTest: "none" as "none" | "ielts" | "celpip" | "pte" | "tef" | "tcf",
    secondListening: 0,
    secondReading: 0,
    secondWriting: 0,
    secondSpeaking: 0,
    canadianWorkExperience: "none" as "none" | "1year" | "2year" | "3year" | "4year" | "5plus",
    canadianTradeCertificate: false,
    overseasWorkExperience: "none" as "none" | "1year" | "2year" | "3plus",
    hasSiblingInCanada: false,
    hasProvincialNomination: false,
    spouseAge: 30,
    spouseEducation: "bachelor" as "phd" | "masters" | "double" | "bachelor" | "two-year" | "one-year" | "highschool" | "below",
    spouseLanguageTest: "none" as "none" | "ielts" | "celpip" | "pte" | "tef" | "tcf",
    spouseListening: 0,
    spouseReading: 0,
    spouseWriting: 0,
    spouseSpeaking: 0,
    spouseCanadianWorkExperience: "none" as "none" | "1year" | "2year" | "3year" | "4year" | "5plus",
    spouseTradeCertificate: false,
    spouseOverseasWorkExperience: "none" as "none" | "1year" | "2year" | "3plus",
  });

  const [result, setResult] = useState<any>(null);
  const utils = trpc.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const handleFamilyStatusChange = (status: "single" | "married-no-spouse" | "married-with-spouse") => {
    setFamilyStatus(status);
    setFormData(prev => ({ ...prev, familyStatus: status }));
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const result = await utils.calculator.calculateCRS.fetch(formData);
      setResult(result);
    } catch (error: any) {
      toast.error("计算失败: " + (error.message || '未知错误'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "Alibaba PuHuiTi, sans-serif" }}>
            联邦快速通道算分工具
          </h1>
          <p className="text-gray-600">评估您的 CRS 入池分数</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>CRS 计算器</CardTitle>
                <CardDescription>填写您的信息以计算快速通道分数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Family Status Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">家庭移民安排</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "single" as const, label: "单身" },
                      { value: "married-no-spouse" as const, label: "已婚（配偶不随行）" },
                      { value: "married-with-spouse" as const, label: "已婚（配偶随行）" },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleFamilyStatusChange(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                          familyStatus === option.value
                            ? "border-teal-600 bg-teal-50 text-teal-900"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabs for different sections */}
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">个人信息</TabsTrigger>
                    <TabsTrigger value="language">语言能力</TabsTrigger>
                    <TabsTrigger value="work">工作经验</TabsTrigger>
                    {familyStatus === "married-with-spouse" && (
                      <TabsTrigger value="spouse">配偶信息</TabsTrigger>
                    )}
                  </TabsList>

                  {/* Personal Information Tab */}
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>年龄</Label>
                        <Input
                          type="number"
                          min="17"
                          max="100"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label>学历背景</Label>
                        <Select
                          value={formData.education}
                          onValueChange={(value: any) =>
                            setFormData({ ...formData, education: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phd">博士学位</SelectItem>
                            <SelectItem value="masters">硕士学位</SelectItem>
                            <SelectItem value="double">双学位</SelectItem>
                            <SelectItem value="bachelor">学士学位</SelectItem>
                            <SelectItem value="two-year">两年制文凭</SelectItem>
                            <SelectItem value="one-year">一年制文凭</SelectItem>
                            <SelectItem value="highschool">高中</SelectItem>
                            <SelectItem value="below">高中以下</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>加拿大教育背景</Label>
                      <Select
                        value={formData.canadianEducation}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, canadianEducation: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">无</SelectItem>
                          <SelectItem value="1-2year">1-2年</SelectItem>
                          <SelectItem value="3plus">3年以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label>有加拿大兄弟姐妹</Label>
                      <input
                        type="checkbox"
                        checked={formData.hasSiblingInCanada}
                        onChange={(e) =>
                          setFormData({ ...formData, hasSiblingInCanada: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label>获得省提名</Label>
                      <input
                        type="checkbox"
                        checked={formData.hasProvincialNomination}
                        onChange={(e) =>
                          setFormData({ ...formData, hasProvincialNomination: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                    </div>
                  </TabsContent>

                  {/* Language Skills Tab */}
                  <TabsContent value="language" className="space-y-4">
                    <div>
                      <Label>第一语言考试</Label>
                      <Select
                        value={formData.languageTest}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, languageTest: value })
                        }
                      >
                        <SelectTrigger>
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
                      {[
                        { key: "listening", label: "听力" },
                        { key: "reading", label: "阅读" },
                        { key: "writing", label: "写作" },
                        { key: "speaking", label: "口语" },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <Label className="text-sm">{label}</Label>
                          <Input
                            type="number"
                            min="0"
                            max="600"
                            value={(formData as any)[key]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: parseFloat(e.target.value) || 0,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label>第二语言考试（可选）</Label>
                      <Select
                        value={formData.secondLanguageTest}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, secondLanguageTest: value })
                        }
                      >
                        <SelectTrigger>
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

                    {formData.secondLanguageTest !== "none" && (
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { key: "secondListening", label: "听力" },
                          { key: "secondReading", label: "阅读" },
                          { key: "secondWriting", label: "写作" },
                          { key: "secondSpeaking", label: "口语" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <Label className="text-sm">{label}</Label>
                            <Input
                              type="number"
                              min="0"
                              max="600"
                              value={(formData as any)[key]}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [key]: parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="0"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Work Experience Tab */}
                  <TabsContent value="work" className="space-y-4">
                    <div>
                      <Label>加拿大工作经验</Label>
                      <Select
                        value={formData.canadianWorkExperience}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, canadianWorkExperience: value })
                        }
                      >
                        <SelectTrigger>
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

                    <div>
                      <Label>加拿大以外的工作经验</Label>
                      <Select
                        value={formData.overseasWorkExperience}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, overseasWorkExperience: value })
                        }
                      >
                        <SelectTrigger>
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

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label>有加拿大技工证书</Label>
                      <input
                        type="checkbox"
                        checked={formData.canadianTradeCertificate}
                        onChange={(e) =>
                          setFormData({ ...formData, canadianTradeCertificate: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                    </div>
                  </TabsContent>

                  {/* Spouse Information Tab */}
                  {familyStatus === "married-with-spouse" && (
                    <TabsContent value="spouse" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>配偶年龄</Label>
                          <Input
                            type="number"
                            min="17"
                            max="100"
                            value={formData.spouseAge}
                            onChange={(e) =>
                              setFormData({ ...formData, spouseAge: parseInt(e.target.value) || 0 })
                            }
                          />
                        </div>
                        <div>
                          <Label>配偶学历</Label>
                          <Select
                            value={formData.spouseEducation}
                            onValueChange={(value: any) =>
                              setFormData({ ...formData, spouseEducation: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phd">博士学位</SelectItem>
                              <SelectItem value="masters">硕士学位</SelectItem>
                              <SelectItem value="double">双学位</SelectItem>
                              <SelectItem value="bachelor">学士学位</SelectItem>
                              <SelectItem value="two-year">两年制文凭</SelectItem>
                              <SelectItem value="one-year">一年制文凭</SelectItem>
                              <SelectItem value="highschool">高中</SelectItem>
                              <SelectItem value="below">高中以下</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>配偶语言考试（可选）</Label>
                        <Select
                          value={formData.spouseLanguageTest}
                          onValueChange={(value: any) =>
                            setFormData({ ...formData, spouseLanguageTest: value })
                          }
                        >
                          <SelectTrigger>
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
                          {[
                            { key: "spouseListening", label: "听力" },
                            { key: "spouseReading", label: "阅读" },
                            { key: "spouseWriting", label: "写作" },
                            { key: "spouseSpeaking", label: "口语" },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <Label className="text-sm">{label}</Label>
                              <Input
                                type="number"
                                min="0"
                                max="600"
                                value={(formData as any)[key]}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    [key]: parseFloat(e.target.value) || 0,
                                  })
                                }
                                placeholder="0"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div>
                        <Label>配偶加拿大工作经验</Label>
                        <Select
                          value={formData.spouseCanadianWorkExperience}
                          onValueChange={(value: any) =>
                            setFormData({ ...formData, spouseCanadianWorkExperience: value })
                          }
                        >
                          <SelectTrigger>
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

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <Label>配偶有技工证书</Label>
                        <input
                          type="checkbox"
                          checked={formData.spouseTradeCertificate}
                          onChange={(e) =>
                            setFormData({ ...formData, spouseTradeCertificate: e.target.checked })
                          }
                          className="w-4 h-4"
                        />
                      </div>
                    </TabsContent>
                  )}
                </Tabs>

                <Button
                  onClick={handleCalculate}
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  size="lg"
                >
                  <CalcIcon className="w-4 h-4 mr-2" />
                  {isLoading ? "计算中..." : "计算我的分数"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {result ? (
              <Card className="sticky top-4 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
                <CardHeader className="bg-teal-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    您的 CRS 分数
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-teal-600 mb-2">
                      {result.totalScore}
                    </div>
                    <p className="text-sm text-gray-600">{result.message}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      方案 {result.scheme}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      分数明细
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(result.breakdown).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-700">{key}</span>
                          <span className="font-semibold text-teal-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700"
                  >
                    <Link href="/booking">
                      预约咨询专业顾问
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-4 border-dashed">
                <CardContent className="pt-6 text-center text-gray-500">
                  <CalcIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>填写表单并点击"计算"按钮</p>
                  <p className="text-sm mt-2">查看您的 CRS 分数</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
