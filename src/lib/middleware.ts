import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { verifyToken } from "./auth";
import { prisma } from "./prisma";

export type AuthenticatedRequest = NextApiRequest & {
  userId?: string;
};

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await prisma.adminUser.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.userId = user.id;
    return handler(req, res);
  };
}
