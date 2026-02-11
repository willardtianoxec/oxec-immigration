import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, MessageCircle } from "lucide-react";

interface DistributionPanelProps {
  linkedinEnabled: boolean;
  wechatEnabled: boolean;
  onLinkedinChange: (enabled: boolean) => void;
  onWechatChange: (enabled: boolean) => void;
}

export default function DistributionPanel({
  linkedinEnabled,
  wechatEnabled,
  onLinkedinChange,
  onWechatChange,
}: DistributionPanelProps) {
  const [linkedinStatus, setLinkedinStatus] = useState<
    "connected" | "disconnected" | "pending"
  >("disconnected");
  const [wechatStatus, setWechatStatus] = useState<
    "connected" | "disconnected" | "pending"
  >("disconnected");

  const handleLinkedinConnect = () => {
    setLinkedinStatus("pending");
    // 实际应该调用OAuth连接流程
    setTimeout(() => {
      setLinkedinStatus("connected");
    }, 1000);
  };

  const handleWechatConnect = () => {
    setWechatStatus("pending");
    // 实际应该调用微信连接流程
    setTimeout(() => {
      setWechatStatus("connected");
    }, 1000);
  };

  return (
    <Card className="p-6 bg-muted/30">
      <h3 className="text-lg font-semibold mb-4">一键同步分发</h3>

      <div className="space-y-4">
        {/* LinkedIn */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium">LinkedIn</p>
              <p className="text-sm text-muted-foreground">
                {linkedinStatus === "connected"
                  ? "已连接"
                  : linkedinStatus === "pending"
                    ? "连接中..."
                    : "未连接"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {linkedinStatus !== "connected" ? (
              <button
                onClick={handleLinkedinConnect}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                连接
              </button>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={linkedinEnabled}
                  onChange={(e) => onLinkedinChange(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <Badge variant="outline" className="text-xs">
                  {linkedinEnabled ? "启用" : "禁用"}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* 微信公众号 */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">微信公众号</p>
              <p className="text-sm text-muted-foreground">
                {wechatStatus === "connected"
                  ? "已连接"
                  : wechatStatus === "pending"
                    ? "连接中..."
                    : "未连接"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wechatStatus !== "connected" ? (
              <button
                onClick={handleWechatConnect}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                连接
              </button>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={wechatEnabled}
                  onChange={(e) => onWechatChange(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <Badge variant="outline" className="text-xs">
                  {wechatEnabled ? "启用" : "禁用"}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        启用后，发布文章时会自动同步到选中的平台
      </p>
    </Card>
  );
}
