import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import {
  FileText, 
  Award, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit,
  ArrowLeft,
  Loader2,
  Image,
  Edit2,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { getLoginUrl } from "@/const";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not admin
  if (!loading && (!isAuthenticated || user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            {!isAuthenticated ? (
              <Button onClick={() => window.location.href = getLoginUrl()} className="w-full">
                Login
              </Button>
            ) : (
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="container flex items-center py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">返回首页</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{color: '#000080'}}>Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage blog posts, success cases, and appointments</p>
        </div>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-4" style={{backgroundColor: '#e8e8e8'}}>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="cases">Success Cases</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="mt-6">
            <BlogPostsManagement />
          </TabsContent>

          <TabsContent value="cases" className="mt-6">
            <SuccessCasesManagement />
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <ImageLibraryManagement />
          </TabsContent>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// 内容分类的中英文映射
const CONTENT_CATEGORIES = {
  "investment-immigration": "投资移民",
  "family-reunion": "家庭团聚",
  "maple-leaf-renewal": "枫叶卡续签",
  "reconsideration": "拒签重审",
  "temporary-resident": "临时居民申请",
  "skilled-worker": "技术移民",
  "citizenship": "公民入籍",
  "other": "其他",
} as const;

function BlogPostsManagement() {
  const [, setLocation] = useLocation();
  const [contentCategory, setContentCategory] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(true);
  const { data: posts = [], isLoading, refetch } = trpc.posts.list.useQuery({
    type: "blog",
    contentCategory: contentCategory || undefined,
    publishedOnly: !showDrafts,
    limit: 100,
  });
  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这篇文章吗？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Post deleted");
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };

  const handleNewPost = () => {
    localStorage.setItem("postFormReturnTo", "/admin");
    setLocation("/admin/posts/new");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage blog posts</CardDescription>
        </div>
        <Button onClick={handleNewPost} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          新建
        </Button>
      </CardHeader>
      <CardContent>
        {/* 内容分类筛选和显示草稿选项 */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">按分类筛选:</label>
            <Select
              value={contentCategory || "all"}
              onValueChange={(value) =>
                setContentCategory(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {Object.entries(CONTENT_CATEGORIES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant={showDrafts ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDrafts(!showDrafts)}
            >
              {showDrafts ? "显示所有" : "仅显示已发布"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div key={post.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <div className="flex gap-2 items-center text-xs text-gray-500 flex-wrap mt-2">
                      {post.published ? (
                        <span className="text-green-600 font-semibold">✓ 已发布</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">◉ 草稿</span>
                      )}
                      {post.publishedAt && (
                        <span>{new Date(post.publishedAt).toLocaleDateString("zh-CN")}</span>
                      )}
                      {post.tags && <span>标签: {post.tags}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.published && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(`/blog/${post.slug}`, "_blank");
                        }}
                      >
                        查看
                      </Button>
                    )}
                    <Link href={`/admin/posts/${post.id}`}>
                      <Button size="sm" variant="outline" onClick={() => {
                        localStorage.setItem("postFormReturnTo", "/admin");
                      }}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">暂无文章</p>
            <Button onClick={handleNewPost} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              创建第一篇
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SuccessCasesManagement() {
  const [, setLocation] = useLocation();
  const [contentCategory, setContentCategory] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(true);
  const { data: cases = [], isLoading, refetch } = trpc.posts.list.useQuery({
    type: "success-case",
    contentCategory: contentCategory || undefined,
    publishedOnly: !showDrafts,
    limit: 100,
  });
  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这个案例吗？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Case deleted");
      } catch (error) {
        toast.error("Failed to delete case");
      }
    }
  };

  const handleNewPost = () => {
    localStorage.setItem("postFormReturnTo", "/admin");
    setLocation("/admin/posts/new");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Success Cases</CardTitle>
          <CardDescription>Manage success cases</CardDescription>
        </div>
        <Button onClick={handleNewPost} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          新建
        </Button>
      </CardHeader>
      <CardContent>
        {/* 内容分类筛选和显示草稿选项 */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">按分类筛选:</label>
            <Select
              value={contentCategory || "all"}
              onValueChange={(value) =>
                setContentCategory(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {Object.entries(CONTENT_CATEGORIES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant={showDrafts ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDrafts(!showDrafts)}
            >
              {showDrafts ? "显示所有" : "仅显示已发布"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : cases.length > 0 ? (
          <div className="space-y-4">
            {cases.map((caseItem: any) => (
              <div key={caseItem.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{caseItem.title}</h3>
                    <div className="flex gap-2 items-center text-xs text-gray-500 flex-wrap mt-2">
                      {caseItem.published ? (
                        <span className="text-green-600 font-semibold">✓ 已发布</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">◉ 草稿</span>
                      )}
                      {caseItem.publishedAt && (
                        <span>{new Date(caseItem.publishedAt).toLocaleDateString("zh-CN")}</span>
                      )}
                      {caseItem.tags && <span>标签: {caseItem.tags}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {caseItem.published && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(`/success-cases/${caseItem.slug}`, "_blank");
                        }}
                      >
                        查看
                      </Button>
                    )}
                    <Link href={`/admin/posts/${caseItem.id}`}>
                      <Button size="sm" variant="outline" onClick={() => {
                        localStorage.setItem("postFormReturnTo", "/admin");
                      }}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(caseItem.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">暂无案例</p>
            <Button onClick={handleNewPost} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              创建第一个
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageLibraryManagement() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageForLightbox, setSelectedImageForLightbox] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCountRef = useRef(0);
  const ITEMS_PER_PAGE = 20;

  const { data: images = [], isLoading, refetch } = trpc.images.list.useQuery();
  const uploadMutation = trpc.images.upload.useMutation();
  const deleteMutation = trpc.images.delete.useMutation();

  const validateAndSetFile = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size cannot exceed 10MB');
      return;
    }
    setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
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
      validateAndSetFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        await uploadMutation.mutateAsync({
          filename: selectedFile.name,
          base64Data: base64String,
          description: description || undefined,
          category: category || undefined,
        });
        toast.success("Image uploaded successfully");
        setSelectedFile(null);
        setDescription("");
        setCategory("");
        refetch();
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除这张图片吗？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Image deleted");
        refetch();
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  const paginatedImages = images.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Library</CardTitle>
        <CardDescription>Manage your image collection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Upload Section */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image className={`h-12 w-12 ${
                isDragging ? 'text-primary' : 'text-gray-400'
              }`} />
              <div className="text-center">
                <p className="font-semibold">Upload Image</p>
                <p className="text-sm text-gray-500">Click to select or drag and drop</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {selectedFile && <p className="text-sm">{selectedFile.name}</p>}
            </div>
          </div>

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Image description"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Image category"
              />
            </div>
          </div>

          <Button onClick={handleUpload} disabled={!selectedFile || uploadMutation.isPending} className="w-full">
            {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
          </Button>

          {/* Image Gallery */}
          {/* Lightbox Modal */}
          {selectedImageForLightbox && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImageForLightbox(null)}>
              <div className="bg-white rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <img
                    src={selectedImageForLightbox.publicUrl}
                    alt={selectedImageForLightbox.description}
                    className="w-full max-h-96 object-contain"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImageForLightbox(null)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="p-4 space-y-3">
                  {selectedImageForLightbox.description && (
                    <div>
                      <p className="text-sm font-medium">描述</p>
                      <p className="text-sm text-gray-600">{selectedImageForLightbox.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">文件大小</p>
                      <p className="text-gray-600">{(selectedImageForLightbox.fileSize / 1024).toFixed(1)} KB</p>
                    </div>
                    <div>
                      <p className="font-medium">MIME类型</p>
                      <p className="text-gray-600">{selectedImageForLightbox.mimeType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">URL</p>
                    <div className="flex gap-2 flex-wrap">
                      <input
                        type="text"
                        value={selectedImageForLightbox.publicUrl}
                        readOnly
                        className="flex-1 min-w-0 px-3 py-2 border rounded text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedImageForLightbox.publicUrl);
                            toast.success("URL copied to clipboard");
                          }}
                        >
                          复制
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            // 创建一个新窗口显示大图
                            const newWindow = window.open();
                            if (newWindow) {
                              newWindow.document.write(`
                                <html>
                                  <head>
                                    <title>图片预览</title>
                                    <style>
                                      body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; }
                                      img { max-width: 100%; max-height: 100%; cursor: pointer; }
                                    </style>
                                  </head>
                                  <body>
                                    <img src="${selectedImageForLightbox.publicUrl}" alt="${selectedImageForLightbox.description}" onclick="window.close()" />
                                  </body>
                                </html>
                              `);
                              newWindow.document.close();
                            }
                          }}
                        >
                          看大图
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4">
                {paginatedImages.map((image: any) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <div className="relative group">
                      <img
                        src={image.publicUrl}
                        alt={image.description}
                        className="w-full h-32 object-cover cursor-pointer"
                        onClick={() => setSelectedImageForLightbox(image)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white hover:bg-white hover:text-black"
                          onClick={() => {
                            navigator.clipboard.writeText(image.publicUrl);
                            toast.success("URL copied to clipboard");
                          }}
                        >
                          复制URL
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white hover:bg-white hover:text-black"
                          onClick={() => {
                            const newWindow = window.open();
                            if (newWindow) {
                              newWindow.document.write(`
                                <html>
                                  <head>
                                    <title>图片预览</title>
                                    <style>
                                      body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; }
                                      img { max-width: 100%; max-height: 100%; cursor: pointer; }
                                    </style>
                                  </head>
                                  <body>
                                    <img src="${image.publicUrl}" alt="${image.description}" onclick="window.close()" />
                                  </body>
                                </html>
                              `);
                              newWindow.document.close();
                            }
                          }}
                        >
                          看大图
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-gray-50">
                      {image.description && (
                        <p className="text-xs text-gray-600 truncate mb-1">{image.description}</p>
                      )}
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>大小: {(image.fileSize / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentManagement() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { data: appointments = [], isLoading, refetch } = trpc.appointments.list.useQuery();
  const deleteMutation = trpc.appointments.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这个预约吗？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Appointment deleted");
      } catch (error) {
        toast.error("Failed to delete appointment");
      }
    }
  };

  const getConsultationTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      "phone": "电话咨询",
      "in-person": "面对面咨询"
    };
    return typeMap[type] || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage consultation appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment: any) => (
              <div key={appointment.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* 默认显示的卡片头部 */}
                <div
                  className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => setExpandedId(expandedId === appointment.id ? null : appointment.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{appointment.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {appointment.consultationSubject || "未指定咨询主题"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {getConsultationTypeLabel(appointment.consultationType)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform ${
                        expandedId === appointment.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* 展开后显示的详细信息 */}
                {expandedId === appointment.id && (
                  <div className="p-4 border-t bg-white space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">邮箱</p>
                        <p className="text-sm text-gray-700">{appointment.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">电话</p>
                        <p className="text-sm text-gray-700">{appointment.phone}</p>
                      </div>
                    </div>

                    {appointment.preferredTimeSlots && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">预计咨询时间</p>
                        <p className="text-sm text-gray-700">{appointment.preferredTimeSlots}</p>
                      </div>
                    )}

                    {appointment.preferredDate && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">预约日期</p>
                        <p className="text-sm text-gray-700">
                          {format(new Date(appointment.preferredDate), "yyyy年MM月dd日 HH:mm")}
                        </p>
                      </div>
                    )}

                    {appointment.message && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">备注</p>
                        <p className="text-sm text-gray-700">{appointment.message}</p>
                      </div>
                    )}

                    <div className="pt-3 border-t flex justify-end">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除预约
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No appointments yet</p>
        )}
      </CardContent>
    </Card>
  );
}
