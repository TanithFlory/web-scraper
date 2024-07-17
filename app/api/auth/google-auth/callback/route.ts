import { NextRequest, NextResponse } from "next/server";
import oAuth2Client from "../oAuth2Client";
import { PrismaClient } from "@prisma/client";
import generateJwt from "@/app/api/utils/generateJwt";
import { headers } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const headersList = headers();
  const domain = headersList.get("host") || "";
  try {
    const OAuth2Client = oAuth2Client();
    const url = new URL(req.url);

    const code = url.searchParams.get("code");

    if (!code) return;

    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);
    if (tokens) {
      const { access_token } = tokens;
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
        const accessToken = generateJwt({ email, id: existingUser.id });
        console.log(`http://${domain}/?accessToken=${accessToken})`);
        return NextResponse.redirect(
          `http://${domain}#accessToken=${accessToken}`,
          { status: 302 }
        );
      }
      const user = await prisma.user.create({
        data: {
          email,
          password: "",
          isVerified: verified_email,
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
