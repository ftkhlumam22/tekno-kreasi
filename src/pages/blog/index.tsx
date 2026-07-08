import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Seo, SiteLayout } from "@components";
import { SectionHeading } from "@/modules/umkm-site/components";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string;
  author: { name: string };
  category: { name: string; slug: string } | null;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?page=${page}&limit=9`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <Seo
        title="Blog | Tekno Kreasi"
        description="Tips, tutorial, dan inspirasi seputar digitalisasi UMKM, website, dan teknologi untuk bisnis."
        path="/blog"
      />
      <SiteLayout>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#fee9d2,transparent_34%),linear-gradient(135deg,#fffaf4_0%,#f4fff9_100%)] px-5 py-16 md:px-10 md:py-24">
          <div className="relative mx-auto max-w-7xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-[#c86f25] shadow-sm">
              Blog & Artikel
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-[#172033] md:text-6xl">
              Tips & Inspirasi untuk Bisnis Digital
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Pelajari strategi digitalisasi UMKM, tips membuat website efektif, dan tren teknologi untuk mengembangkan bisnis Anda.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="py-20 text-center text-gray-600">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="py-20 text-center text-gray-600">
                <p className="text-xl">Belum ada artikel yang dipublikasikan</p>
                <p className="mt-2 text-sm">Kembali lagi nanti untuk konten terbaru</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-orange-100 transition hover:shadow-lg"
                    >
                      {post.coverImage && (
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {post.category && (
                          <span className="mb-3 inline-block rounded-full bg-[#ED893E]/10 px-3 py-1 text-xs font-semibold text-[#ED893E]">
                            {post.category.name}
                          </span>
                        )}
                        <h2 className="mb-3 text-xl font-bold text-[#172033] transition group-hover:text-[#ED893E]">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        {post.excerpt && (
                          <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.author.name}</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 text-sm text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
