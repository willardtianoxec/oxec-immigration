import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ShareButtonsProps {
  title: string;
  description: string;
  coverImage?: string;
  url: string;
}

export function ShareButtons({
  title,
  description,
  coverImage,
  url,
}: ShareButtonsProps) {
  const [showQRCode, setShowQRCode] = useState(false);

  // LinkedIn 分享逻辑
  const handleLinkedInShare = () => {
    const linkedInShareUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    linkedInShareUrl.searchParams.append('url', url);

    window.open(
      linkedInShareUrl.toString(),
      'linkedin-share-dialog',
      'width=626,height=436'
    );
  };

  // 微信分享逻辑 - 显示二维码
  const handleWeChatShare = () => {
    setShowQRCode(true);
  };

  return (
    <>
      {/* 分享按钮组 */}
      <div className="flex items-center gap-3">
        {/* LinkedIn 分享按钮 */}
        <button
          onClick={handleLinkedInShare}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:opacity-80"
          title="分享到 LinkedIn"
          aria-label="分享到 LinkedIn"
        >
          <img
            src="/linkedin.png"
            alt="LinkedIn"
            className="w-8 h-8"
          />
        </button>

        {/* 微信分享按钮 */}
        <button
          onClick={handleWeChatShare}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:opacity-80"
          title="分享到微信"
          aria-label="分享到微信"
        >
          <img
            src="/wechat.png"
            alt="WeChat"
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* 微信二维码弹窗 */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>分享至微信朋友圈</DialogTitle>
            <DialogDescription>
              扫码在手机打开，即可分享至朋友圈
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-8">
            {/* 二维码 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <QRCodeCanvas
                value={url}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            {/* 提示文字 */}
            <div className="text-center text-sm text-muted-foreground">
              <p>使用微信扫一扫</p>
              <p className="mt-1">在手机上打开此链接</p>
              <p className="mt-2 font-semibold text-foreground">即可分享至朋友圈</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
