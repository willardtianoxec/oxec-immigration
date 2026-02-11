import { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

export default function ImageUploader({
  onImageUpload,
  currentImage,
}: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentImage || null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropAndUpload = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      // 创建canvas进行裁剪
      const image = new Image();
      image.src = selectedImage;
      image.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        // 转换为blob并上传
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "cover-image.jpg");

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              onImageUpload(data.url);
              setSelectedImage(null);
            } else {
              alert("上传失败");
            }
          } catch (error) {
            console.error("上传错误:", error);
            alert("上传出错");
          } finally {
            setIsUploading(false);
          }
        }, "image/jpeg");
      };
    } catch (error) {
      console.error("裁剪错误:", error);
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  if (selectedImage && !currentImage) {
    return (
      <div className="space-y-4">
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">缩放</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCropAndUpload}
            disabled={isUploading}
            className="flex-1"
          >
            {isUploading ? "上传中..." : "确认并上传"}
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            disabled={isUploading}
          >
            取消
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="当前封面"
            className="w-full h-auto rounded-lg"
          />
          <Button
            onClick={() => {
              onImageUpload("");
            }}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium">拖拽图片到此处或点击选择</p>
        <p className="text-xs text-muted-foreground mt-1">
          支持 JPG、PNG 等格式，将自动裁剪为 16:9 比例
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
}
