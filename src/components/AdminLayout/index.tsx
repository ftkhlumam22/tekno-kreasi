import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link href="/admin" className="text-xl font-bold text-[#172033]">
            Admin Panel
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin"
                className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive("/admin")
                    ? "bg-[#ED893E]/10 text-[#ED893E]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts"
                className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive("/admin/posts")
                    ? "bg-[#ED893E]/10 text-[#ED893E]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts/new"
                className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive("/admin/posts/new")
                    ? "bg-[#ED893E]/10 text-[#ED893E]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                New Post
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive("/admin/categories")
                    ? "bg-[#ED893E]/10 text-[#ED893E]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Categories
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
