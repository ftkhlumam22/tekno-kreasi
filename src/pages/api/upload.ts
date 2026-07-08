import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    if (!mimeType.startsWith("image/")) {
      return res.status(400).json({ error: "File must be an image" });
    }

    const ext = mimeType.split("/")[1] || "png";
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(base64Data, "base64");
    await writeFile(filePath, buffer);

    const url = `/uploads/${filename}`;

    return res.status(200).json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default withAuth(handler);
