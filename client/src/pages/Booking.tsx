import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Phone, User, MapPin } from "lucide-react";
import { useRef } from "react";
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

export default function Booking() {
  const mapRef = useRef<google.maps.Map | null>(null);
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
    },
    onError: (error) => {
      toast.error("预约失败: " + error.message);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.consultationSubject) {
      toast.error("请填写所有必填项");
      return;
    }

    if (selectedTimeSlots.length === 0) {
      toast.error("请至少选择一个咨询时间段");
      return;
    }

    createAppointment.mutate({
      ...formData,
      preferredTimeSlots: selectedTimeSlots.join(","),
      preferredDate: new Date(),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="flex justify-between items-start mb-4">
            <Link href="/">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">预约咨询</h1>
          <p className="text-lg opacity-90">
            请准确填写以下表单并提交，我们将在最短时间内评估您的需求，然后电话联系您确认面谈时间
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card style={{ borderRadius: '0px' }}>
              <CardHeader>
                <CardTitle>预约申请表</CardTitle>
                <CardDescription>
                  本表单所采集的所有个人信息将严格遵循《加拿大移民顾问监管委员会职业操守条例》进行管理。我们承诺对您的所有资料严格保密，且仅用于评估您的移民资格。提交此表单并不构成正式的法律代理关系；正式代理关系仅在双方签署《专业服务协议》(Retainer Agreement) 后成立。我们在此确认，在处理您的咨询申请前已进行内部核查，确保不存在任何利益冲突。若后续发现潜在冲突，我们将立即向您披露并采取合规措施。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-2">
                    <Label htmlFor="name">客户名称 *</Label>
                    <Input
                      id="name"
                      placeholder="请输入您的全名"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">电子邮件 *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">联系电话 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Consultation Subject */}
                  <div className="space-y-2">
                    <Label>预约事项 *</Label>
                    <RadioGroup value={formData.consultationSubject} onValueChange={(value) => setFormData({ ...formData, consultationSubject: value })}>
                      <div className="grid grid-cols-2 gap-3">
                        {CONSULTATION_SUBJECTS.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <RadioGroupItem value={subject} id={subject} />
                            <Label htmlFor={subject} className="font-normal cursor-pointer">{subject}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Consultation Method */}
                  <div className="space-y-2">
                    <Label>咨询方式 *</Label>
                    <RadioGroup value={formData.consultationType} onValueChange={(value) => setFormData({ ...formData, consultationType: value as "phone" | "in-person" })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="font-normal cursor-pointer">电话咨询</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="font-normal cursor-pointer">线下咨询</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-semibold">预计咨询时间 *</Label>
                      <div className="space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSelectAll}
                        >
                          全选
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleInvertSelection}
                        >
                          反选
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {WEEKDAYS.map((day) => (
                        <div key={day.value} className="flex items-center space-x-4 p-3 bg-gray-50 rounded">
                          <span className="font-medium w-16">{day.name}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${day.value}-morning`}
                                checked={selectedTimeSlots.includes(`${day.value}-morning`)}
                                onCheckedChange={() => handleTimeSlotToggle(`${day.value}-morning`)}
                              />
                              <Label htmlFor={`${day.value}-morning`} className="font-normal cursor-pointer">上午</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${day.value}-afternoon`}
                                checked={selectedTimeSlots.includes(`${day.value}-afternoon`)}
                                onCheckedChange={() => handleTimeSlotToggle(`${day.value}-afternoon`)}
                              />
                              <Label htmlFor={`${day.value}-afternoon`} className="font-normal cursor-pointer">下午</Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Background Information */}
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-base font-semibold">背景信息采集</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>性别</Label>
                        <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="font-normal cursor-pointer">男</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="font-normal cursor-pointer">女</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>婚姻状况</Label>
                        <RadioGroup value={formData.maritalStatus} onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single" className="font-normal cursor-pointer">单身</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="married" id="married" />
                            <Label htmlFor="married" className="font-normal cursor-pointer">已婚</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="divorced" id="divorced" />
                            <Label htmlFor="divorced" className="font-normal cursor-pointer">离异</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="widowed" id="widowed" />
                            <Label htmlFor="widowed" className="font-normal cursor-pointer">丧偶</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>最高学历</Label>
                        <RadioGroup value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high-school" id="high-school" />
                            <Label htmlFor="high-school" className="font-normal cursor-pointer">高中及以下</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="diploma" id="diploma" />
                            <Label htmlFor="diploma" className="font-normal cursor-pointer">大专</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bachelor" id="bachelor" />
                            <Label htmlFor="bachelor" className="font-normal cursor-pointer">本科</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="master" id="master" />
                            <Label htmlFor="master" className="font-normal cursor-pointer">硕士</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phd" id="phd" />
                            <Label htmlFor="phd" className="font-normal cursor-pointer">博士</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>英语水平</Label>
                        <RadioGroup value={formData.englishLevel} onValueChange={(value) => setFormData({ ...formData, englishLevel: value })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner" className="font-normal cursor-pointer">入门</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="intermediate" id="intermediate" />
                            <Label htmlFor="intermediate" className="font-normal cursor-pointer">中级</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="advanced" id="advanced" />
                            <Label htmlFor="advanced" className="font-normal cursor-pointer">高级</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fluent" id="fluent" />
                            <Label htmlFor="fluent" className="font-normal cursor-pointer">流利</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>是否有考试成绩</Label>
                        <RadioGroup value={formData.hasExamScore ? "yes" : "no"} onValueChange={(value) => setFormData({ ...formData, hasExamScore: value === "yes" })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="exam-yes" />
                            <Label htmlFor="exam-yes" className="font-normal cursor-pointer">是</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="exam-no" />
                            <Label htmlFor="exam-no" className="font-normal cursor-pointer">否</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>已工作年限</Label>
                        <RadioGroup value={formData.workExperience} onValueChange={(value) => setFormData({ ...formData, workExperience: value })}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="less-1" id="less-1" />
                            <Label htmlFor="less-1" className="font-normal cursor-pointer">1年以下</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1-3" id="1-3" />
                            <Label htmlFor="1-3" className="font-normal cursor-pointer">1-3年</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3-5" id="3-5" />
                            <Label htmlFor="3-5" className="font-normal cursor-pointer">3-5年</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5-10" id="5-10" />
                            <Label htmlFor="5-10" className="font-normal cursor-pointer">5-10年</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10+" id="10+" />
                            <Label htmlFor="10+" className="font-normal cursor-pointer">10年以上</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>是否有拒签史</Label>
                      <RadioGroup value={formData.hasRefusal ? "yes" : "no"} onValueChange={(value) => setFormData({ ...formData, hasRefusal: value === "yes" })}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="refusal-yes" />
                          <Label htmlFor="refusal-yes" className="font-normal cursor-pointer">是</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="refusal-no" />
                          <Label htmlFor="refusal-no" className="font-normal cursor-pointer">否</Label>
                        </div>
                      </RadioGroup>
                      {formData.hasRefusal && (
                        <Textarea
                          placeholder="请简述拒签原因"
                          value={formData.refusalReason}
                          onChange={(e) => setFormData({ ...formData, refusalReason: e.target.value })}
                          rows={3}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>是否有犯罪记录</Label>
                      <RadioGroup value={formData.hasCriminalRecord ? "yes" : "no"} onValueChange={(value) => setFormData({ ...formData, hasCriminalRecord: value === "yes" })}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="criminal-yes" />
                          <Label htmlFor="criminal-yes" className="font-normal cursor-pointer">是</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="criminal-no" />
                          <Label htmlFor="criminal-no" className="font-normal cursor-pointer">否</Label>
                        </div>
                      </RadioGroup>
                      {formData.hasCriminalRecord && (
                        <Textarea
                          placeholder="请简述犯罪记录详情"
                          value={formData.criminalRecordDetails}
                          onChange={(e) => setFormData({ ...formData, criminalRecordDetails: e.target.value })}
                          rows={3}
                        />
                      )}
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">需求说明</Label>
                    <Textarea
                      id="message"
                      placeholder="请告诉我们您的移民目标和任何具体问题..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={createAppointment.isPending}
                  >
                    {createAppointment.isPending ? "提交中..." : "提交预约申请"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  服务流程
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">首次咨询</h4>
                  <p className="text-sm text-muted-foreground">
                    移民顾问将和您进行30到60分钟的面谈，了解您的移民目标并评估您的现状与资质并提供初步的移民方案与报价。您可以根据顾问的反馈决定是否签署移民服务协议。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">签约及启动服务</h4>
                  <p className="text-sm text-muted-foreground">
                    双方签署《专业服务协议》后，我们将正式启动您的移民申请流程，包括材料准备、文件整理和案件规划。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">服务终止与结案</h4>
                  <p className="text-sm text-muted-foreground">
                    在申请获批或根据您的指示终止服务后，我们将提供完整的结案报告和后续支持。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-accent" />
                  联系我们
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  如有紧急咨询，您也可以直接与我们联系：
                </p>
                <p className="font-semibold">Business@oxecimm.com</p>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center text-accent">
                  <User className="mr-2 h-5 w-5" />
                  初次咨询前的准备
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• 准备您的护照和身份证件</li>
                  <li>• 列出您的教育和工作经历详情</li>
                  <li>• 记下任何以前的签证申请或拒签情况</li>
                  <li>• 写下您的具体移民问题</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <section className="w-full bg-gray-100 py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              访问我们的办公室
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            4710 Kingsway, Metrotower 1, Burnaby, BC, V5H 4M2, 加拿大
          </p>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <MapView
              initialCenter={{ lat: 49.2208, lng: -122.9497 }}
              initialZoom={15}
              onMapReady={handleMapReady}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
