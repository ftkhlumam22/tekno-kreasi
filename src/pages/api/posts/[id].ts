import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";
import { generateSlug } from "@/lib/auth";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (req.method === "GET") {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
          tags: true,
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json({ post });
    } catch (error) {
      console.error("Get post error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { title, excerpt, content, coverImage, status, categoryId, tags, publishedAt } = req.body;

      const existingPost = await prisma.post.findUnique({ where: { id } });
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      let slug = existingPost.slug;
      if (title && title !== existingPost.title) {
        slug = generateSlug(title);
        const slugExists = await prisma.post.findFirst({
          where: { slug, id: { not: id } },
        });
        if (slugExists) {
          slug = `${slug}-${Date.now()}`;
        }
      }

      const currentTags = await prisma.post.findUnique({
        where: { id },
        select: { tags: { select: { id: true } } },
      });

      const post = await prisma.post.update({
        where: { id },
        data: {
          title: title ?? existingPost.title,
          slug,
          excerpt: excerpt !== undefined ? excerpt : existingPost.excerpt,
          content: content ?? existingPost.content,
          coverImage: coverImage !== undefined ? coverImage : existingPost.coverImage,
          status: status ?? existingPost.status,
          publishedAt:
            status === "PUBLISHED" && !existingPost.publishedAt
              ? publishedAt || new Date()
              : existingPost.publishedAt,
          categoryId: categoryId !== undefined ? categoryId : existingPost.categoryId,
          tags: tags
            ? {
                set: [],
                connect: tags.map((tagId: string) => ({ id: tagId })),
              }
            : undefined,
        },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
          tags: true,
        },
      });

      return res.status(200).json({ post });
    } catch (error) {
      console.error("Update post error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const existingPost = await prisma.post.findUnique({ where: { id } });
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      await prisma.post.delete({ where: { id } });
      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Delete post error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default withAuth(handler);
