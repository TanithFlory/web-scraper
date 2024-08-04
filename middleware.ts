import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { JwtPayload } from "@/types";
import prisma from "./app/api/utils/db";

export async function middleware(
  req: NextRequest,
  _res: NextResponse
): Promise<any> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleInvalidToken();
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
      return handleInvalidToken();
    }

    const response = NextResponse.next();
    response.headers.set("id", userDetails.id.toString());

    return response;
  } catch (error) {
    console.log(error);
    return handleInvalidToken();
  }
}

function handleInvalidToken() {
  const response = new NextResponse(null, {
    headers: {
      "Clear-Token": "true",
      "Access-Control-Expose-Headers": "Clear-Token",
    },
  });
  return response;
}

export const config = {
  matcher: "/api/protected/:path*",
};
