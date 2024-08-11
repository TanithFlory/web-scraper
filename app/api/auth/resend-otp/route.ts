import { NextRequest, NextResponse } from "next/server";
import emailService from "../../services/emailService";
import prisma from "../../utils/db";

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const data = await req.json();
    const { email } = data;
    const otp = Math.floor(100000 + Math.random() * 999999);
    await prisma.user.update({
      where: { email },
      data: {
        otp: {
          update: {
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            code: Math.floor(100000 + Math.random() * 999999),
          },
        },
      },
    });
    await emailService(otp, email);

    return NextResponse.json(
      { message: `OTP sent to ${email}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to send otp. Please try again later." },
      { status: 500 }
    );
  }
}
