import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TagRecommenderProps {
  type: "blog" | "success-case";
  currentTags: string;
  onTagSelect: (tag: string) => void;
}

export default function TagRecommender({
  type,
  currentTags,
  onTagSelect,
}: TagRecommenderProps) {
  const [recommendedTags, setRecommendedTags] = useState<string[]>([]);

  useEffect(() => {
    // 根据类型推荐标签
    // 这里使用硬编码的推荐标签，实际应该从后端获取
    const tags = type === "blog"
      ? [
          "技术移民",
          "快速通道",
          "加拿大移民",
          "工作签证",
          "永久居民",
          "移民政策",
          "申请指南",
          "成功经验",
        ]
      : [
          "成功案例",
          "技术移民",
          "家庭团聚",
          "商业移民",
          "学生签证",
          "工作经验",
          "语言要求",
          "申请流程",
        ];

    setRecommendedTags(tags);
  }, [type]);

  const currentTagsArray = currentTags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);

  const handleAddTag = (tag: string) => {
    if (!currentTagsArray.includes(tag)) {
      onTagSelect(tag);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">推荐标签：</p>
      <div className="flex flex-wrap gap-2">
        {recommendedTags.map((tag) => (
          <Badge
            key={tag}
            variant={
              currentTagsArray.includes(tag) ? "default" : "secondary"
            }
            className="cursor-pointer hover:opacity-80 transition"
            onClick={() => handleAddTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
