import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { Seo, SiteLayout } from "@components";
import { prisma } from "@/lib/prisma";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  publishedAt: string;
  author: { name: string };
  category: { name: string; slug: string } | null;
  tags: { name: string }[];
};

type BlogPostPageProps = {
  post: Post | null;
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#172033]">Post Not Found</h1>
            <p className="mt-4 text-gray-600">The article you are looking for does not exist.</p>
            <Link
              href="/blog"
              className="mt-6 inline-block rounded-lg bg-[#ED893E] px-6 py-3 text-sm font-bold text-[#172033] hover:bg-[#d17531]"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
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
        title={`${post.title} | Tekno Kreasi Blog`}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
      />
      <SiteLayout>
        <article className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center text-sm font-medium text-[#ED893E] hover:underline"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            <header className="mb-8">
              {post.category && (
                <span className="mb-4 inline-block rounded-full bg-[#ED893E]/10 px-3 py-1 text-xs font-semibold text-[#ED893E]">
                  {post.category.name}
                </span>
              )}
              <h1 className="text-4xl font-extrabold leading-tight text-[#172033] md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{post.author.name}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </header>

            {post.coverImage && (
              <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl bg-gray-100 md:h-96">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {post.excerpt && (
              <p className="mb-8 text-lg leading-8 text-gray-600">{post.excerpt}</p>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#172033] prose-p:text-gray-700 prose-a:text-[#ED893E] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="mt-10 border-t border-gray-200 pt-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 border-t border-gray-200 pt-6 text-center">
              <Link
                href="/blog"
                className="inline-block rounded-lg bg-[#ED893E] px-6 py-3 text-sm font-bold text-[#172033] hover:bg-[#d17531]"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </article>
      </SiteLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
        tags: true,
      },
    });

    if (!post) {
      return { props: { post: null } };
    }

    return {
      props: {
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          publishedAt: post.publishedAt?.toISOString() || null,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { props: { post: null } };
  }
};
