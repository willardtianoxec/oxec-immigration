import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Code,
  Undo2,
  Redo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("输入图片URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("输入链接URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-muted p-3 border-b border-border flex flex-wrap gap-1">
        {/* 标题 */}
        <Button
          onClick={() => toggleHeading(1)}
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="标题1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => toggleHeading(2)}
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="标题2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        {/* 文本格式 */}
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="粗体"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="斜体"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive("code") ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="代码"
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        {/* 列表 */}
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="无序列表"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          title="有序列表"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        {/* 媒体 */}
        <Button
          onClick={addImage}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          title="插入图片"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={addLink}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          title="插入链接"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        {/* 撤销/重做 */}
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          title="撤销"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          title="重做"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* 编辑区域 */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-96 focus:outline-none"
      />
    </div>
  );
}
