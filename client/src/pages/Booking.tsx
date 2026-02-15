'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { ArrowLeft, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MapView } from "@/components/Map";

const CONSULTATION_SUBJECTS = [
  "移民",
  "留学",
  "家庭团聚",
  "招聘外籍工人",
  "短期入境",
  "疑难案件处理",
  "其他事项"
];

const WEEKDAYS = [
  { name: "周一", value: "monday" },
  { name: "周二", value: "tuesday" },
  { name: "周三", value: "wednesday" },
  { name: "周四", value: "thursday" },
  { name: "周五", value: "friday" }
];

// 生成简单的数学验证题
const generateCaptchaQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let answer: number;
  if (operation === '+') {
    answer = num1 + num2;
  } else if (operation === '-') {
    answer = num1 - num2;
  } else {
    answer = num1 * num2;
  }
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer.toString()
  };
};

export default function Booking() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationSubject: "",
    consultationType: "phone" as "phone" | "in-person",
    gender: "",
    maritalStatus: "",
    education: "",
    englishLevel: "",
    hasExamScore: false,
    workExperience: "",
    hasRefusal: false,
    refusalReason: "",
    hasCriminalRecord: false,
    criminalRecordDetails: "",
    message: "",
  });

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  
  // 机器人验证相关状态
  const [captcha, setCaptcha] = useState(generateCaptchaQuestion());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  
  // 30秒提交间隔相关状态
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitCountdown, setSubmitCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 倒计时效果
  useEffect(() => {
    if (submitCountdown <= 0) return;
    
    const timer = setInterval(() => {
      setSubmitCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [submitCountdown]);

  const createAppointment = trpc.appointments.create.useMutation({
    onSuccess: () => {
      toast.success("您的预约申请已收到，我们的专业顾问将在24小时内与您联系。");
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationSubject: "",
        consultationType: "phone",
        gender: "",
        maritalStatus: "",
        education: "",
        englishLevel: "",
        hasExamScore: false,
        workExperience: "",
        hasRefusal: false,
        refusalReason: "",
        hasCriminalRecord: false,
        criminalRecordDetails: "",
        message: "",
      });
      setSelectedTimeSlots([]);
      setCaptchaInput("");
      setCaptchaVerified(false);
      setCaptcha(generateCaptchaQuestion());
      setLastSubmitTime(Date.now());
      setSubmitCountdown(30);
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error("预约失败: " + error.message);
      setIsSubmitting(false);
    },
  });

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 49.2208, lng: -122.9497 },
      title: "OXEC Immigration Services Ltd.",
    });
  };

  const handleTimeSlotToggle = (slot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSelectAll = () => {
    const allSlots = WEEKDAYS.flatMap(day => [
      `${day.value}-morning`,
      `${day.value}-afternoon`
    ]);
    setSelectedTimeSlots(allSlots);
  };

  const handleInvertSelection = () => {
    const allSlots = WEEKDAYS.flatMap(day => [
      `${day.value}-morning`,
      `${day.value}-afternoon`
    ]);
    const newSelection = allSlots.filter(slot => !selectedTimeSlots.includes(slot));
    setSelectedTimeSlots(newSelection);
  };

  const handleVerifyCaptcha = () => {
    if (captchaInput === captcha.answer) {
      setCaptchaVerified(true);
      toast.success("验证成功！");
    } else {
      toast.error("验证失败，请重新输入");
      setCaptchaInput("");
      setCaptcha(generateCaptchaQuestion());
    }
  };

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptchaQuestion());
    setCaptchaInput("");
    setCaptchaVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查验证码
    if (!captchaVerified) {
      toast.error("请先完成机器人验证");
      return;
    }
    
    // 检查提交间隔
    if (submitCountdown > 0) {
      toast.error(`请等待 ${submitCountdown} 秒后再提交`);
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone || !formData.consultationSubject) {
      toast.error("请填写所有必填项");
      return;
    }

    setIsSubmitting(true);

    const preferredTimeSlots = selectedTimeSlots.length > 0 
      ? selectedTimeSlots.map(slot => {
          const [day, time] = slot.split('-');
          const dayName = WEEKDAYS.find(d => d.value === day)?.name || day;
          return `${dayName}${time === 'morning' ? '上午' : '下午'}`;
        }).join('、')
      : '';

    await createAppointment.mutate({
      ...formData,
      hasExamScore: formData.hasExamScore,
      hasRefusal: formData.hasRefusal,
      hasCriminalRecord: formData.hasCriminalRecord,
      preferredTimeSlots,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">返回首页</span>
            </div>
          </Link>
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-md transition-colors text-primary-foreground font-medium"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? '中文' : 'ENG'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>预约咨询</CardTitle>
                <CardDescription>
                  请准确填写以下表单并提交，我们将在最短时间内评估您的需求，然后电话联系您确认面谈时间
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* RCIC Compliance Declaration */}
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>重要声明：</strong>本表单所采集的所有个人信息将严格遵循《加拿大移民顾问监管委员会职业操守条例》进行管理。我们承诺对您的所有资料严格保密，且仅用于评估您的移民资格。提交此表单并不构成正式的法律代理关系；正式代理关系仅在双方签署《专业服务协议》(Retainer Agreement) 后成立。我们在此确认，在处理您的咨询申请前已进行内部核查，确保不存在任何利益冲突。若后续发现潜在冲突，我们将立即向您披露并采取合规措施。
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">基本信息</h3>
                    
                    <div className="space-y-2">
                      <Label>客户名称 *</Label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="请输入您的全名"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>电子邮件 *</Label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="请输入您的邮箱地址"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>联系电话 *</Label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="请输入您的联系电话"
                      />
                    </div>
                  </div>

                  {/* Consultation Details Section */}
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-base font-semibold">预约详情</h3>

                    <div className="space-y-2">
                      <Label>需求类型 *</Label>
                      <RadioGroup value={formData.consultationSubject} onValueChange={(value) => setFormData({ ...formData, consultationSubject: value })}>
                        <div className="flex flex-wrap gap-3">
                          {CONSULTATION_SUBJECTS.map((subject) => (
                            <div key={subject} className="flex items-center space-x-2">
                              <RadioGroupItem value={subject} id={subject} />
                              <Label htmlFor={subject} className="font-normal cursor-pointer">{subject}</Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>咨询方式 *</Label>
                      <RadioGroup value={formData.consultationType} onValueChange={(value) => setFormData({ ...formData, consultationType: value as "phone" | "in-person" })}>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="font-normal cursor-pointer">电话咨询</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person" className="font-normal cursor-pointer">线下咨询</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Time Slot Selector */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>预计咨询时间 *</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSelectAll}
                            className="text-xs"
                          >
                            全选
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleInvertSelection}
                            className="text-xs"
                          >
                            反选
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {WEEKDAYS.map((day) => (
                          <div key={day.value} className="space-y-2">
                            <div className="font-medium text-sm">{day.name}</div>
                            <div className="space-y-2">
                              {['morning', 'afternoon'].map((time) => {
                                const slotId = `${day.value}-${time}`;
                                const timeLabel = time === 'morning' ? '上午' : '下午';
                                return (
                                  <div key={slotId} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={slotId}
                                      checked={selectedTimeSlots.includes(slotId)}
                                      onChange={() => handleTimeSlotToggle(slotId)}
                                      className="w-4 h-4"
                                    />
                                    <Label htmlFor={slotId} className="font-normal cursor-pointer">{timeLabel}</Label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Robot Verification Section */}
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-base font-semibold">机器人验证</h3>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm font-medium text-blue-900 mb-3">{captcha.question}</p>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="请输入答案"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          disabled={captchaVerified}
                          className="flex-1"
                        />
                        {!captchaVerified ? (
                          <>
                            <Button
                              type="button"
                              onClick={handleVerifyCaptcha}
                              variant="default"
                              className="px-4"
                            >
                              验证
                            </Button>
                            <Button
                              type="button"
                              onClick={handleRefreshCaptcha}
                              variant="outline"
                              className="px-4"
                            >
                              刷新
                            </Button>
                          </>
                        ) : (
                          <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md font-medium">
                            ✓ 已验证
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t pt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || submitCountdown > 0 || !captchaVerified}
                    >
                      {isSubmitting ? "提交中..." : submitCountdown > 0 ? `请等待 ${submitCountdown} 秒后提交` : "提交预约申请"}
                    </Button>
                    {submitCountdown > 0 && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        为防止频繁提交，请在 {submitCountdown} 秒后重新提交
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">我们的办公室</CardTitle>
              </CardHeader>
              <CardContent>
                <MapView
                  onMapReady={handleMapReady}
                  defaultCenter={{ lat: 49.2208, lng: -122.9497 }}
                  defaultZoom={15}
                  className="w-full h-96 rounded-md"
                />
                <div className="mt-4 space-y-2 text-sm">
                  <p><strong>地址：</strong> Vancouver, BC</p>
                  <p><strong>电话：</strong> +1 (604) 123-4567</p>
                  <p><strong>邮箱：</strong> info@oxecimm.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
