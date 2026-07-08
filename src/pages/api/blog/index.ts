import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { page = "1", limit = "10", category, tag, search } = req.query;

    const where: any = { status: "PUBLISHED" };

    if (category) {
      where.category = { slug: String(category) };
    }
    if (tag) {
      where.tags = { some: { name: String(tag) } };
    }
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { excerpt: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { name: true } },
          category: true,
          tags: true,
        },
        orderBy: { publishedAt: "desc" },
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
    console.error("Get public posts error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
