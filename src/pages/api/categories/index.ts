import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";
import { generateSlug } from "@/lib/auth";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: { _count: { select: { posts: true } } },
        orderBy: { name: "asc" },
      });
      return res.status(200).json({ categories });
    } catch (error) {
      console.error("Get categories error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const slug = generateSlug(name);
      const existingCategory = await prisma.category.findFirst({ where: { slug } });
      if (existingCategory) {
        return res.status(400).json({ error: "Category already exists" });
      }

      const category = await prisma.category.create({
        data: { name, slug },
      });

      return res.status(201).json({ category });
    } catch (error) {
      console.error("Create category error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default withAuth(handler);
