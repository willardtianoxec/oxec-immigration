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
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100"
          title="分享到 LinkedIn"
          aria-label="分享到 LinkedIn"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            style={{ color: '#0077B5' }}
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </button>

        {/* 微信分享按钮 */}
        <button
          onClick={handleWeChatShare}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100"
          title="分享到微信"
          aria-label="分享到微信"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            style={{ color: '#07C160' }}
          >
            <path d="M9.101 21.757c-.899 0-1.723-.15-2.468-.436l-2.897 1.566.793-2.468C2.605 18.883 1.5 16.765 1.5 14.365c0-3.584 3.215-6.5 7.184-6.5 3.562 0 6.543 2.406 7.104 5.514.03.199.046.401.046.605 0 3.584-3.215 6.5-7.184 6.5l-.553.273zm5.348-12.087c-.405 0-.734.329-.734.734s.329.734.734.734.734-.329.734-.734-.329-.734-.734-.734zm4.209 0c-.405 0-.734.329-.734.734s.329.734.734.734.734-.329.734-.734-.329-.734-.734-.734zm3.342 6.293c0-2.973-2.667-5.384-5.961-5.384-3.294 0-5.961 2.411-5.961 5.384 0 2.973 2.667 5.384 5.961 5.384.747 0 1.459-.129 2.122-.365l1.919 1.038-.509-1.635c1.578-1.035 2.429-2.577 2.429-4.422z" />
          </svg>
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
