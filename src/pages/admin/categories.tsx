import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/AdminLayout";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create category");
      }

      setName("");
      setShowForm(false);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Failed to create category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#172033]">Categories</h1>
          <p className="mt-2 text-gray-600">Manage blog post categories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-[#ED893E] px-4 py-2 text-sm font-bold text-[#172033] transition hover:bg-[#d17531]"
        >
          {showForm ? "Cancel" : "New Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <div className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Category name..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#172033] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0F172A] disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No categories found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Posts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-[#172033]">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">/{category.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category._count.posts} posts
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
