"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold, Italic, UnderlineIcon, Strikethrough, List, ListOrdered, Quote, Code,
  Undo, Redo, Maximize2, Minimize2, Link as LinkIcon, Unlink,
  ImageIcon, YoutubeIcon, Heading1, Heading2, Heading3
} from "lucide-react";
import { useCallback, useEffect, useState, ChangeEvent } from "react";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      Youtube.configure({ width: 480, height: 320, modestBranding: true }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    const url = window.prompt("Masukkan URL");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    const url = window.prompt("Masukkan URL gambar");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("Masukkan URL YouTube");
    if (url) editor?.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const imageUrl = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: imageUrl }).run();
  };

  if (!editor) return <p>Loading editor...</p>;

return (
  <div
    className={`mb-4 overflow-hidden rounded-xl border bg-white shadow-sm ${
      isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : ""
    }`}
  >
    {/* Toolbar */}
    <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2 sticky top-0 z-10">
      <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold size={16} />} />
      <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic size={16} />} />
      <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<UnderlineIcon size={16} />} />
      <ToolbarButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} icon={<Strikethrough size={16} />} />

      <ToolbarButton active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={<Heading1 size={16} />} />
      <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 size={16} />} />
      <ToolbarButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={<Heading3 size={16} />} />

      <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List size={16} />} />
      <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered size={16} />} />

      <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote size={16} />} />
      <ToolbarButton active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} icon={<Code size={16} />} />

      <ToolbarButton onClick={setLink} icon={<LinkIcon size={16} />} />
      <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} icon={<Unlink size={16} />} />

      <ToolbarButton onClick={addImageByUrl} icon={<ImageIcon size={16} />} />
      <label className="cursor-pointer rounded-md border bg-white px-2 py-1 hover:bg-gray-100">
        <ImageIcon size={16} />
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>
      <ToolbarButton onClick={addYoutube} icon={<YoutubeIcon size={16} />} />

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={16} />} />
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={16} />} />

      <ToolbarButton
        onClick={() => setIsFullscreen(!isFullscreen)}
        icon={isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      />
    </div>

    {/* Editor Area */}
    <EditorContent
      editor={editor}
      className="prose prose-lg max-w-none p-6 min-h-[600px] focus:outline-none"
    />
  </div>
);
}

/* Tombol Toolbar */
function ToolbarButton({
  onClick,
  icon,
  active = false,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1 rounded hover:bg-gray-200 ${
        active ? "bg-gray-300" : "bg-white"
      } border`}
    >
      {icon}
    </button>
  );
}
