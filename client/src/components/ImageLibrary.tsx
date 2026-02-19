import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Copy, Download, Upload } from "lucide-react";

export function ImageLibrary() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images = [], refetch } = trpc.images.list.useQuery();
  const uploadMutation = trpc.images.upload.useMutation();
  const deleteMutation = trpc.images.delete.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        await uploadMutation.mutateAsync({
          filename: selectedFile.name,
          base64Data: base64,
          description,
          category,
        });
        setSelectedFile(null);
        setDescription("");
        setCategory("");
        refetch();
      };
      reader.readAsDataURL(selectedFile);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这张图片吗？")) {
      await deleteMutation.mutateAsync({ id });
      refetch();
    }
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    alert("路径已复制到剪贴板");
  };

  const handleDownload = (image: any) => {
    const link = document.createElement("a");
    link.href = image.publicUrl;
    link.download = image.filename;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">上传新图片</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {selectedFile ? selectedFile.name : "点击或拖拽图片到此处"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="图片描述（可选）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="分类（可选）"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full"
          >
            {uploading ? "上传中..." : "上传图片"}
          </Button>
        </div>
      </Card>

      {/* Image Gallery */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">图片库 ({images.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src={image.publicUrl}
                alt={image.filename}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium truncate">{image.filename}</p>
                <p className="text-xs text-gray-500 break-all">{image.relativePath}</p>
                {image.description && (
                  <p className="text-xs text-gray-600">{image.description}</p>
                )}
                {image.category && (
                  <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {image.category}
                  </span>
                )}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyPath(image.relativePath)}
                    className="flex-1"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    复制路径
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(image)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
