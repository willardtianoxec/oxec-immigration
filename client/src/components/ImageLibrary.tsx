import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Copy, Download, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";

export function ImageLibrary() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageInputRef = useRef<HTMLInputElement>(null);
  const dragCountRef = useRef(0);

  const { data: images = [], refetch } = trpc.images.list.useQuery();
  const uploadMutation = trpc.images.upload.useMutation();
  const deleteMutation = trpc.images.delete.useMutation();

  // Pagination settings
  const ITEMS_PER_PAGE = 20;
  const COLUMNS = 4;
  const ROWS = 5;

  // Sort images by newest first
  const sortedImages = [...images].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPages = Math.ceil(sortedImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedImages = sortedImages.slice(startIndex, endIndex);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    setUploadError(null);
    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('请选择图片文件');
      return;
    }
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('文件大小不能超过10MB');
      return;
    }
    setSelectedFile(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current--;
    if (dragCountRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Handle multiple files - use the first one for now
      validateAndSetFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadError(null);
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onerror = () => {
        setUploadError('文件读取失败');
        setUploading(false);
      };
      reader.onload = async (e) => {
        try {
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
          setCurrentPage(1);
          refetch();
        } catch (error) {
          setUploadError('上传失败，请重试');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      setUploadError('上传失败，请重试');
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

  const formatFileSize = (bytes: number | undefined | null) => {
    if (!bytes) return "未知";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt((e.target as HTMLInputElement).value);
      handlePageChange(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">上传新图片</h3>
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-primary'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className={`mx-auto h-8 w-8 mb-2 ${
              isDragging ? 'text-primary' : 'text-gray-400'
            }`} />
            <p className="text-sm text-gray-600">
              {selectedFile ? selectedFile.name : "点击或拖拽图片到此处"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              支持 JPG, PNG, GIF, WebP 等格式，最大 10MB
            </p>
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          )}

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

          {selectedFile && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                已选择: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}

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
        <h3 className="text-lg font-semibold mb-4">
          图片库 ({sortedImages.length})
        </h3>

        {/* Pagination Info */}
        <div className="mb-4 text-sm text-gray-600">
          显示 {startIndex + 1}-{Math.min(endIndex, sortedImages.length)} / 共 {sortedImages.length} 张图片
        </div>

        {/* Image Grid */}
        <div
          className="mb-6"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            gap: "1rem",
          }}
        >
          {paginatedImages.map((image) => (
            <div
              key={image.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div
                className="w-full h-40 bg-gray-100 flex items-center justify-center relative group cursor-pointer"
              >
                <img
                  src={image.publicUrl}
                  alt={image.filename}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center pointer-events-none"
                  onClick={() => setSelectedImage(image)}
                >
                  <span className="text-white opacity-0 group-hover:opacity-100 transition text-sm font-medium">
                    点击查看原图
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium truncate">{image.filename}</p>
                <p className="text-xs text-gray-500 break-all">{image.relativePath}</p>
                <p className="text-xs text-gray-500">
                  {image.uploadMethod === 'manual' ? 'Manually uploaded: ' : 'Migrated from local: '}
                  {image.filename}
                </p>
                <p className="text-xs text-gray-500">
                  大小: {formatFileSize(image.fileSize)}
                </p>
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            首页
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm">第</span>
            <input
              ref={pageInputRef}
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              onKeyDown={handlePageInputChange}
              className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
            />
            <span className="text-sm">页 / 共 {totalPages} 页</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            末页
          </Button>
        </div>
      </Card>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col h-full">
              <img
                src={selectedImage.publicUrl}
                alt={selectedImage.filename}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
              <div className="p-4 bg-gray-50 border-t">
                <p className="font-medium mb-2">{selectedImage.filename}</p>
                <p className="text-sm text-gray-600 mb-2">
                  路径: {selectedImage.relativePath}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  大小: {formatFileSize(selectedImage.fileSize)}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCopyPath(selectedImage.relativePath)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制路径
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(selectedImage)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
