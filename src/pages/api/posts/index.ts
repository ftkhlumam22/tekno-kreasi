import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";
import { generateSlug } from "@/lib/auth";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { status, page = "1", limit = "10", search } = req.query;

      const where: any = {};
      if (status && status !== "all") {
        where.status = status;
      }
      if (search) {
        where.title = { contains: String(search), mode: "insensitive" };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            author: { select: { id: true, name: true, email: true } },
            category: true,
            tags: true,
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: Number(limit),
        }),
        prisma.post.count({ where }),
      ]);

      return res.status(200).json({
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Get posts error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, excerpt, content, coverImage, status, categoryId, tags, publishedAt } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      let slug = generateSlug(title);
      const existingPost = await prisma.post.findUnique({ where: { slug } });
      if (existingPost) {
        slug = `${slug}-${Date.now()}`;
      }

      const post = await prisma.post.create({
        data: {
          title,
          slug,
          excerpt: excerpt || null,
          content,
          coverImage: coverImage || null,
          status: status || "DRAFT",
          publishedAt: status === "PUBLISHED" ? (publishedAt || new Date()) : null,
          authorId: req.userId!,
          categoryId: categoryId || null,
          tags: tags?.length
            ? {
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

      return res.status(201).json({ post });
    } catch (error) {
      console.error("Create post error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default withAuth(handler);
