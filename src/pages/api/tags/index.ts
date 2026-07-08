import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const tags = await prisma.tag.findMany({
        include: { _count: { select: { posts: true } } },
        orderBy: { name: "asc" },
      });
      return res.status(200).json({ tags });
    } catch (error) {
      console.error("Get tags error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      return res.status(201).json({ tag });
    } catch (error) {
      console.error("Create tag error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default withAuth(handler);
