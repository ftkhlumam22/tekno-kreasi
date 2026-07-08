import { useEffect, useState, FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import AdminLayout from "@/components/AdminLayout";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), { ssr: false });

type Category = {
  id: string;
  name: string;
};

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("DRAFT");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchCategories();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        const post = data.post;
        setTitle(post.title);
        setExcerpt(post.excerpt || "");
        setContent(post.content);
        setCoverImage(post.coverImage || "");
        setStatus(post.status);
        setCategoryId(post.categoryId || "");
      } else {
        setError("Post not found");
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File must be an image");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (res.ok) {
          const data = await res.json();
          setCoverImage(data.url);
        } else {
          setError("Failed to upload image");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image");
      setUploading(false);
    }
  }

  function removeCoverImage() {
    setCoverImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          coverImage,
          status,
          categoryId: categoryId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push("/admin/posts");
    } catch (err: any) {
      setError(err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center text-gray-600">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#172033]">Edit Post</h1>
        <p className="mt-2 text-gray-600">Update your blog article</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
        )}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg font-medium transition focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
              placeholder="Enter post title..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
              placeholder="Brief description of the post..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              {coverImage ? (
                <div className="relative">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
                    <Image
                      src={coverImage}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      {uploading ? "Uploading..." : "Change"}
                    </button>
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#ED893E] hover:bg-orange-50"
                >
                  {uploading ? (
                    <p className="text-sm text-gray-600">Uploading...</p>
                  ) : (
                    <>
                      <svg className="mb-2 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-gray-600">Click to upload</p>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP (max 5MB)</p>
                    </>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-gray-700">Content *</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#ED893E] px-6 py-2.5 text-sm font-bold text-[#172033] transition hover:bg-[#d17531] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Post"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
