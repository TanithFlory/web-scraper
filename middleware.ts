import { NextResponse } from "next/server";
import * as jose from "jose";
import { JwtPayload, NextRequestProtected } from "@/types";
import prisma from "./app/api/utils/db";

export async function middleware(
  req: NextRequestProtected,
  _res: NextResponse
): Promise<any> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token doesn't exist" },
        { status: 401 }
      );
    }

    const accessToken = authHeader.slice("Bearer ".length);
    const result = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const payload = result.payload as JwtPayload;

    const userDetails = await prisma.user.findFirst({
      where: { uuid: payload.uuid },
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const response = NextResponse.next();
    response.headers.set("id", userDetails.id.toString());

    return response;
  } catch (error) {
    console.log(error);
    // handleInvalidToken(res);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
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
