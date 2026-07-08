import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  publishedAt: string | null;
  author: { name: string };
  category: { name: string } | null;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/posts?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#172033]">Posts</h1>
          <p className="mt-2 text-gray-600">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-[#ED893E] px-4 py-2 text-sm font-bold text-[#172033] transition hover:bg-[#d17531]"
        >
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        {["all", "PUBLISHED", "DRAFT", "ARCHIVED"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              statusFilter === status
                ? "bg-[#172033] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {status === "all" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No posts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#172033]">{post.title}</div>
                      <div className="text-xs text-gray-500">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          post.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : post.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {post.category?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => router.push(`/admin/posts/${post.id}`)}
                        className="mr-3 text-[#ED893E] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
