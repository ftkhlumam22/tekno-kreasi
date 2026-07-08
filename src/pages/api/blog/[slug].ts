import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { slug } = req.query;

    if (typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { name: true } },
        category: true,
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Get post by slug error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
