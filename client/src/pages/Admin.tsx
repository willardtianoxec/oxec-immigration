import React, { useState, useRef } from "react";
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
  Image
} from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage blog posts, success cases, and appointments</p>
        </div>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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

function BlogPostsManagement() {
  const { data: posts = [], isLoading } = trpc.posts.list.useQuery();
  const createMutation = trpc.posts.create.useMutation();
  const updateMutation = trpc.posts.update.useMutation();
  const deleteMutation = trpc.posts.delete.useMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", category: "", published: false });

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Post updated");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Post created");
      }
      setFormData({ title: "", content: "", category: "", published: false });
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Post" : "New Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Post title"
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Post content"
              rows={6}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Category"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label>Published</Label>
          </div>
          <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={() => { setEditingId(null); setFormData({ title: "", content: "", category: "", published: false }); }}>
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <div key={post.id} className="border rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-500">{post.category}</p>
                      <p className="text-xs text-gray-400">{format(new Date(post.createdAt), "MMM d, yyyy")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingId(post.id); setFormData(post); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SuccessCasesManagement() {
  const { data: cases = [], isLoading } = trpc.posts.list.useQuery();
  const createMutation = trpc.posts.create.useMutation();
  const updateMutation = trpc.posts.update.useMutation();
  const deleteMutation = trpc.posts.delete.useMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", category: "", published: false });

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Case updated");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Case created");
      }
      setFormData({ title: "", content: "", category: "", published: false });
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to save case");
    }
  };

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Case" : "New Case"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Case title"
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Case content"
              rows={6}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Category"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label>Published</Label>
          </div>
          <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={() => { setEditingId(null); setFormData({ title: "", content: "", category: "", published: false }); }}>
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : cases.length > 0 ? (
            <div className="space-y-4">
              {cases.map((caseItem: any) => (
                <div key={caseItem.id} className="border rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{caseItem.title}</h3>
                      <p className="text-sm text-gray-500">{caseItem.category}</p>
                      <p className="text-xs text-gray-400">{format(new Date(caseItem.createdAt), "MMM d, yyyy")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingId(caseItem.id); setFormData(caseItem); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(caseItem.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No success cases yet.</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
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
    if (!selectedFile) return;

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
        toast.success("Image uploaded successfully");
        refetch();
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("确定要删除这张图片吗？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Image deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    toast.success("Path copied to clipboard");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Calculate pagination
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedImages = images.slice(startIndex, endIndex);

  return (
    <>
      {/* Lightbox Modal */}
      {selectedImageForLightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImageForLightbox(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImageForLightbox(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            <img
              src={selectedImageForLightbox.publicUrl}
              alt={selectedImageForLightbox.filename}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="mt-4 text-white text-center">
              <p className="font-medium">{selectedImageForLightbox.filename}</p>
              {selectedImageForLightbox.size && (
                <p className="text-sm text-gray-300">大小: {formatFileSize(selectedImageForLightbox.size)}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>上传新图片</CardTitle>
            <CardDescription>上传图片到图库，所有图片将保存在GitHub仓库中</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : "点击或拖拽图片到此处"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">图片描述（可选）</Label>
                <Input
                  id="description"
                  placeholder="例如：PR Card Section 1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">分类（可选）</Label>
                <Input
                  id="category"
                  placeholder="例如：service-images"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploadMutation.isPending}
              className="w-full"
            >
              {uploadMutation.isPending ? "上传中..." : "上传图片"}
            </Button>
          </CardContent>
        </Card>

        {/* Image Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>图片库 ({images.length})</CardTitle>
            <CardDescription>管理所有上传的图片，复制相对路径在页面中使用</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              </div>
            ) : images.length > 0 ? (
              <>
                {/* Pagination Info */}
                <div className="text-sm text-gray-600">
                  显示 {startIndex + 1}-{Math.min(endIndex, images.length)} / 共 {images.length} 张图片
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {paginatedImages.map((image: any) => (
                    <Card key={image.id} className="overflow-hidden hover:shadow-lg transition">
                      <div
                        className="w-full h-48 bg-gray-200 cursor-pointer overflow-hidden"
                        onClick={() => setSelectedImageForLightbox(image)}
                      >
                        <img
                          src={image.publicUrl}
                          alt={image.filename}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm font-medium truncate">{image.filename}</p>
                        <p className="text-xs text-gray-500 break-all font-mono bg-gray-50 p-2 rounded">
                          {image.relativePath}
                        </p>
                        {image.size && (
                          <p className="text-xs text-gray-600">大小: {formatFileSize(image.size)}</p>
                        )}
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
                            className="flex-1 text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            复制路径
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
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      首页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      上一页
                    </Button>
                    <span className="text-sm text-gray-600">
                      第 {currentPage} / {totalPages} 页
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      下一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      末页
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value) || 1;
                        setCurrentPage(Math.min(Math.max(1, page), totalPages));
                      }}
                      className="w-16 h-9"
                      placeholder="页"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>暂无图片，请上传第一张图片</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function AppointmentManagement(){
  const { data: appointments, isLoading } = trpc.appointments.list.useQuery();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment: any) => (
                <div key={appointment.id} className="border rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{appointment.name}</h3>
                      <p className="text-sm text-gray-500">{appointment.email}</p>
                      <p className="text-xs text-gray-400">{format(new Date(appointment.appointmentDate), "MMM d, yyyy HH:mm")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointments yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
