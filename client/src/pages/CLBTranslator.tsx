import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// CLB conversion helper for all language tests
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

export default function CLBTranslator() {
  const [testType, setTestType] = useState<"ielts" | "celpip" | "pte" | "tef" | "tcf">("ielts");
  const [scores, setScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });
  const [result, setResult] = useState<(number | string)[] | null>(null);
  const [validationError, setValidationError] = useState<string>("");
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  const handleTranslate = () => {
    // Check if all scores are 0 (form is empty)
    if (scores.listening === 0 && scores.reading === 0 && scores.writing === 0 && scores.speaking === 0) {
      setValidationError("表单不能为空");
      setShowValidationDialog(true);
      return;
    }

    const clbs = convertToCLB(scores.listening, scores.reading, scores.writing, scores.speaking, testType);
    setResult(clbs);
  };

  const getMinCLB = () => {
    if (!result) return null;
    const numericClbs = result.filter(c => typeof c === 'number') as number[];
    if (numericClbs.length === 0) return null;
    return Math.min(...numericClbs);
  };

  const minCLB = getMinCLB();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-4xl font-bold text-gray-900" style={{fontSize: '48px'}}>CLB换算工具</h1>
          </div>
          <p className="text-gray-600">Canadian Language Benchmarks/语言成绩换算</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>语言考试成绩</CardTitle>
                <CardDescription>请选择您参加的语言考试</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={testType} onValueChange={(value: any) => setTestType(value)}>
                  <TabsList className="grid w-full grid-cols-5" style={{height: '70px'}}>
                    <TabsTrigger value="ielts">
                      <div className="text-center">
                        <div>IELTS</div>
                        <div className="text-xs">雅思</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="celpip">
                      <div className="text-center">
                        <div>CELPIP</div>
                        <div className="text-xs">思培</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="pte">
                      <div className="text-center">
                        <div>PTE</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="tef">
                      <div className="text-center">
                        <div>TEF</div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="tcf">
                      <div className="text-center">
                        <div>TCF</div>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="listening">听力</Label>
                      <Input
                        id="listening"
                        type="number"
                        placeholder="0"
                        value={scores.listening || ""}
                        onChange={(e) => setScores({ ...scores, listening: parseFloat(e.target.value) || 0 })}
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
                      />
                    </div>
                  </div>
                </Tabs>

                <Button onClick={handleTranslate} className="w-full bg-blue-600 hover:bg-blue-700">
                  换算为CLB
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>换算结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-600 mb-2">您的综合语言水平为</p>
                    <p className="text-5xl font-bold text-blue-600">
                      {typeof minCLB === 'number' ? `CLB ${minCLB}` : minCLB}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-gray-600 text-sm">听力</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {typeof result[0] === 'number' ? `CLB ${result[0]}` : result[0]}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-gray-600 text-sm">阅读</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {typeof result[1] === 'number' ? `CLB ${result[1]}` : result[1]}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-gray-600 text-sm">写作</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {typeof result[2] === 'number' ? `CLB ${result[2]}` : result[2]}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-gray-600 text-sm">口语</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {typeof result[3] === 'number' ? `CLB ${result[3]}` : result[3]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>关于CLB</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-700">
                    加拿大语言基准（CLB）是加拿大评估成年人以英语为第二语言（ESL）能力的国家标准，涵盖阅读、写作、听力和口语。该广泛标准应用于加拿大移民申请、公民入籍和求职就业的语言能力评估。

联邦快速通道中，FSW要求最低入池门槛为CLB 7，CEC要求TEER 0/1类工作入池门槛为CLB 7，TEER 2/3类工作为CLB 5，FST要求听说达到 CLB 5，读写达到 CLB 4。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>表单验证错误</DialogTitle>
          </DialogHeader>
          <DialogDescription>{validationError}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowValidationDialog(false)}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
