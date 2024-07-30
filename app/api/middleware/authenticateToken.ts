import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload, NextRequestProtected } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";

async function authenticateToken(
  handler: (req: NextRequestProtected, res: NextResponse) => Promise<any>
) {
  const prisma = new PrismaClient();
  return async (req: NextRequestProtected, res: NextResponse) => {
    try {
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { message: "Token doesn't exist" },
          { status: 401 }
        );
      }

      const accessToken = authHeader.slice("Bearer ".length);

      const user = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      req.user = user;

      const userDetails = await prisma.user.findFirst({
        where: { uuid: user.uuid },
      });

      if (!userDetails) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      req.user.id = userDetails.id;

      // await handler(req, res);
    } catch (error) {
      console.log("Issue with JWT.");
      handleInvalidToken(res);
    }
  };
}

function handleInvalidToken(res: NextResponse) {
  res.headers.set("Clear-Token", "true");
  res.headers.set("Access-Control-Expose-Headers", "Clear-Token");
  return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
}

export default authenticateToken;
