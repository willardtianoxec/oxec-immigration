import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ImageSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (imagePath: string) => void;
}

export function ImageSelectorModal({
  open,
  onOpenChange,
  onSelect,
}: ImageSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const { data: images = [], isLoading } = trpc.images.list.useQuery();

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    images.forEach((img: any) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats).sort();
  }, [images]);

  // Filter images based on search and category
  const filteredImages = useMemo(() => {
    return images.filter((img: any) => {
      const matchesSearch =
        img.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || img.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [images, searchQuery, selectedCategory]);

  const handleSelectImage = (imagePath: string) => {
    onSelect(imagePath);
    onOpenChange(false);
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const handleCopyPath = (path: string, id: number) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    toast.success("Path copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>选择图片</DialogTitle>
          <DialogDescription>
            从图库中选择图片或复制图片路径
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 px-4">
          {/* Search Bar */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索图片名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">分类过滤</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  全部
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Image Grid */}
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              加载中...
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image: any) => (
                <div
                  key={image.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    <img
                      src={image.publicUrl}
                      alt={image.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-2 space-y-2">
                    <p className="text-xs font-medium truncate">
                      {image.filename}
                    </p>
                    {image.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    {image.category && (
                      <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {image.category}
                      </span>
                    )}
                    <div className="flex gap-1 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleSelectImage(image.relativePath)
                        }
                        className="flex-1 text-xs h-7"
                      >
                        选择
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopyPath(image.relativePath, image.id)
                        }
                        className="h-7 w-7 p-0"
                      >
                        {copiedId === image.id ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>暂无匹配的图片</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
