import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

type Stats = {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, publishedPosts: 0, draftPosts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/posts?limit=1000");
        if (res.ok) {
          const data = await res.json();
          const posts = data.posts || [];
          setStats({
            totalPosts: posts.length,
            publishedPosts: posts.filter((p: any) => p.status === "PUBLISHED").length,
            draftPosts: posts.filter((p: any) => p.status === "DRAFT").length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#172033]">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Posts</p>
          <p className="mt-2 text-4xl font-bold text-[#172033]">
            {loading ? "-" : stats.totalPosts}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Published</p>
          <p className="mt-2 text-4xl font-bold text-green-600">
            {loading ? "-" : stats.publishedPosts}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Drafts</p>
          <p className="mt-2 text-4xl font-bold text-yellow-600">
            {loading ? "-" : stats.draftPosts}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#172033]">Quick Actions</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/posts/new"
            className="flex items-center justify-between rounded-xl bg-[#ED893E] p-6 text-white shadow-sm transition hover:bg-[#d17531]"
          >
            <div>
              <p className="text-lg font-bold">Create New Post</p>
              <p className="mt-1 text-sm opacity-90">Write a new blog article</p>
            </div>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
          <Link
            href="/admin/posts"
            className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm transition hover:bg-gray-50"
          >
            <div>
              <p className="text-lg font-bold text-[#172033]">Manage Posts</p>
              <p className="mt-1 text-sm text-gray-600">View and edit all posts</p>
            </div>
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
