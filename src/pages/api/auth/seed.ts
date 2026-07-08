import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Not allowed in production" });
  }

  try {
    const existingAdmin = await prisma.adminUser.findFirst();
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name are required" });
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "admin",
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return res.status(201).json({ user: admin });
  } catch (error) {
    console.error("Seed error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
