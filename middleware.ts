import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload, NextRequestProtected } from "@/types";
import { PrismaClient } from "@prisma/client";

export async function middleware(
  req: NextRequestProtected,
  res: NextResponse
): Promise<any> {
  const prisma = new PrismaClient();
  console.log("Runs");
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

    const userDetails = await prisma.user.findFirst({
      where: { uuid: user.uuid },
    });

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    req.cookies.set("id", userDetails.id.toString());

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    // handleInvalidToken(res);
  }
}

function handleInvalidToken(res: NextResponse) {
  res.headers.set("Clear-Token", "true");
  res.headers.set("Access-Control-Expose-Headers", "Clear-Token");
  return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
}

export const config = {
  matcher: "/api/protected/:path*",
};
