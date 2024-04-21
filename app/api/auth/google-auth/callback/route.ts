import { NextRequest, NextResponse } from "next/server";
import oAuth2Client from "../oAuth2Client";
import { PrismaClient } from "@prisma/client";
import generateJwt from "@/app/api/utils/generateJwt";

export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const OAuth2Client = oAuth2Client();
    const url = new URL(req.url);

    const code = url.searchParams.get("code");

    if (!code) return;

    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);
    if (tokens) {
      const { access_token } = tokens;
      console.log(access_token);
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      const { email, verified_email } = json;

      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        await prisma.$disconnect();
        return NextResponse.redirect(
          `${req.url}?accessToken=${encodeURIComponent(
            generateJwt({ email, id: existingUser.id })
          )}`
        );
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: "",
          isVerified: verified_email,
          otp: 0,
        },
      });

      await prisma.$disconnect();

      return NextResponse.json(
        {
          message: "Successfully registered",
          token: generateJwt({ email, id: user.id }),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
