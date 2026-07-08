import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useRef, useState } from "react";

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true, allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder || "Start writing..." }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-8 py-6",
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        if (res.ok) {
          const data = await res.json();
          editor?.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
    reader.readAsDataURL(file);
  }, [editor]);

  const handleAddLink = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded p-2 text-sm font-bold transition ${
              editor.isActive("bold") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded p-2 text-sm italic transition ${
              editor.isActive("italic") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded p-2 text-sm underline transition ${
              editor.isActive("underline") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Underline"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`rounded p-2 text-sm line-through transition ${
              editor.isActive("strike") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Strikethrough"
          >
            S
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`rounded px-3 py-2 text-sm font-bold transition ${
              editor.isActive("heading", { level: 1 }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`rounded px-3 py-2 text-sm font-bold transition ${
              editor.isActive("heading", { level: 2 }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`rounded px-3 py-2 text-sm font-bold transition ${
              editor.isActive("heading", { level: 3 }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Heading 3"
          >
            H3
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded p-2 transition ${
              editor.isActive("bulletList") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Bullet List"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded p-2 transition ${
              editor.isActive("orderedList") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Ordered List"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded p-2 transition ${
              editor.isActive("blockquote") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Quote"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`rounded p-2 font-mono text-xs transition ${
              editor.isActive("codeBlock") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Code Block"
          >
            {"<>"}
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`rounded p-2 transition ${
              editor.isActive({ textAlign: "left" }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Align Left"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4h16v2H2V4zm0 5h10v2H2V9zm0 5h16v2H2v-2z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`rounded p-2 transition ${
              editor.isActive({ textAlign: "center" }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Align Center"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4h16v2H2V4zm3 5h10v2H5V9zm-3 5h16v2H2v-2z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`rounded p-2 transition ${
              editor.isActive({ textAlign: "right" }) ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Align Right"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4h16v2H2V4zm6 5h10v2H8V9zm-6 5h16v2H2v-2z" />
            </svg>
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button
            type="button"
            onClick={() => setShowLinkInput(!showLinkInput)}
            className={`rounded p-2 transition ${
              editor.isActive("link") ? "bg-[#ED893E] text-white" : "hover:bg-gray-200"
            }`}
            title="Add Link"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded p-2 transition hover:bg-gray-200"
            title="Add Image"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="rounded p-2 transition hover:bg-gray-200"
            title="Undo"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="rounded p-2 transition hover:bg-gray-200"
            title="Redo"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>

        {showLinkInput && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL..."
              className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#ED893E] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="rounded bg-[#ED893E] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#d17531]"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("");
              }}
              className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <EditorContent editor={editor} />

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          padding: 1.5rem 2rem;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
        .ProseMirror h3 { font-size: 1.25em; font-weight: bold; margin: 0.5em 0; }
        .ProseMirror p { margin: 0.5em 0; line-height: 1.7; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .ProseMirror blockquote {
          border-left: 3px solid #ED893E;
          padding-left: 1em;
          margin: 1em 0;
          color: #666;
        }
        .ProseMirror code {
          background: #f1f3f5;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .ProseMirror pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        .ProseMirror a {
          color: #ED893E;
          text-decoration: underline;
        }
        .ProseMirror mark {
          background-color: #fff3bf;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
