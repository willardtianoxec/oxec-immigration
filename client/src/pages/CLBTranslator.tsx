import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

// CLB conversion helper for all language tests
const convertToCLB = (
  listening: number,
  reading: number,
  writing: number,
  speaking: number,
  testType: string
): number[] => {
  let clbs: number[] = [];

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
                      : 0;
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
                          : 0;
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
                  : writing >= 4
                    ? 4
                    : 0;
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
                  : speaking >= 4
                    ? 4
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  } else if (testType === "celpip") {
    const listeningCLB =
      listening >= 8.5
        ? 10
        : listening >= 8
          ? 9
          : listening >= 7.5
            ? 8
            : listening >= 6
              ? 7
              : listening >= 5.5
                ? 6
                : listening >= 5
                  ? 5
                  : listening >= 4.5
                    ? 4
                    : 0;
    const readingCLB =
      reading >= 8
        ? 10
        : reading >= 7
          ? 9
          : reading >= 6.5
            ? 8
            : reading >= 6
              ? 7
              : reading >= 5
                ? 6
                : reading >= 4
                  ? 5
                  : reading >= 3.5
                    ? 4
                    : 0;
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
                  : writing >= 4
                    ? 4
                    : 0;
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
                  : speaking >= 4
                    ? 4
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
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
                    : 0;
    clbs = [listeningCLB, readingCLB, writingCLB, speakingCLB];
  }

  return clbs;
};

export default function CLBTranslator() {
  const [testType, setTestType] = useState<"ielts" | "celpip" | "pte" | "tef" | "tcf">("ielts");
  const [scores, setScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });
  const [result, setResult] = useState<number[] | null>(null);

  const handleTranslate = () => {
    const clbs = convertToCLB(scores.listening, scores.reading, scores.writing, scores.speaking, testType);
    setResult(clbs);
  };

  const minCLB = result ? Math.min(...result.filter(c => c > 0)) : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <a className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </a>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-4xl font-bold text-gray-900">CLB换算工具</h1>
          </div>
          <p className="text-gray-600">快速将语言考试成绩转换为加拿大语言基准（CLB）等级</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>语言考试成绩</CardTitle>
                <CardDescription>请选择您参加的语言考试</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Test Type Tabs */}
                <Tabs value={testType} onValueChange={(value) => setTestType(value as any)}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="ielts">
                      <div className="text-center">
                        <div className="font-semibold">IELTS</div>
                        <div className="text-xs text-gray-600">雅思</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="celpip">
                      <div className="text-center">
                        <div className="font-semibold">CELPIP</div>
                        <div className="text-xs text-gray-600">思培</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="pte">
                      <div className="text-center">
                        <div className="font-semibold">PTE</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="tef">
                      <div className="text-center">
                        <div className="font-semibold">TEF</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="tcf">
                      <div className="text-center">
                        <div className="font-semibold">TCF</div>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  {/* Score Inputs */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="listening">听力</Label>
                      <Input
                        id="listening"
                        type="number"
                        placeholder="0"
                        value={scores.listening || ""}
                        onChange={(e) => setScores({ ...scores, listening: parseFloat(e.target.value) || 0 })}
                        step={testType === "ielts" || testType === "celpip" ? 0.5 : 1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reading">阅读</Label>
                      <Input
                        id="reading"
                        type="number"
                        placeholder="0"
                        value={scores.reading || ""}
                        onChange={(e) => setScores({ ...scores, reading: parseFloat(e.target.value) || 0 })}
                        step={testType === "ielts" || testType === "celpip" ? 0.5 : 1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="writing">写作</Label>
                      <Input
                        id="writing"
                        type="number"
                        placeholder="0"
                        value={scores.writing || ""}
                        onChange={(e) => setScores({ ...scores, writing: parseFloat(e.target.value) || 0 })}
                        step={testType === "ielts" || testType === "celpip" ? 0.5 : 1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="speaking">口语</Label>
                      <Input
                        id="speaking"
                        type="number"
                        placeholder="0"
                        value={scores.speaking || ""}
                        onChange={(e) => setScores({ ...scores, speaking: parseFloat(e.target.value) || 0 })}
                        step={testType === "ielts" || testType === "celpip" ? 0.5 : 1}
                      />
                    </div>
                  </div>
                </Tabs>

                <Button onClick={handleTranslate} className="w-full bg-blue-600 hover:bg-blue-700">
                  换算为CLB
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>换算结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-600 mb-2">您的综合语言水平为</p>
                    <p className="text-5xl font-bold text-blue-600">CLB {minCLB}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">听力</p>
                      <p className="text-2xl font-bold text-gray-900">CLB {result[0]}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">阅读</p>
                      <p className="text-2xl font-bold text-gray-900">CLB {result[1]}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">写作</p>
                      <p className="text-2xl font-bold text-gray-900">CLB {result[2]}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">口语</p>
                      <p className="text-2xl font-bold text-gray-900">CLB {result[3]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>关于CLB</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  加拿大语言基准（CLB）是加拿大评估成年人以英语为第二语言（ESL）能力的国家标准，涵盖阅读、写作、听力和口语。该广泛标准应用于加拿大移民申请、公民入籍和求职就业的语言能力评估。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
