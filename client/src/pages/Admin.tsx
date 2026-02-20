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
  Edit2
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
                    {post.subtitle && <p className="text-sm text-gray-600 mb-2">{post.subtitle}</p>}
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
                    {caseItem.subtitle && <p className="text-sm text-gray-600 mb-2">{caseItem.subtitle}</p>}
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ITEMS_PER_PAGE = 20;

  const { data: images = [], isLoading, refetch } = trpc.images.list.useQuery();
  const uploadMutation = trpc.images.upload.useMutation();
  const deleteMutation = trpc.images.delete.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
          <div className="border-2 border-dashed rounded-lg p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image className="h-12 w-12 text-gray-400" />
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
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                Select Image
              </Button>
              {selectedFile && <p className="text-sm">{selectedFile.name}</p>}
            </div>
          </div>

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
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4">
                {paginatedImages.map((image: any) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.publicUrl}
                      alt={image.description}
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => setSelectedImageForLightbox(image)}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
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
          <div className="space-y-4">
            {appointments.map((appointment: any) => (
              <div key={appointment.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{appointment.name}</h3>
                    <p className="text-sm text-gray-500">{appointment.email}</p>
                    <p className="text-sm text-gray-500">{appointment.phone}</p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(appointment.appointmentDate), "MMM d, yyyy HH:mm")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
