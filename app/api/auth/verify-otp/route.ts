import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import generateJwt from "../../utils/generateJwt";

export async function POST(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const { otp, id } = data;

    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        otp: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.otp?.code === otp) {
      return NextResponse.json({ message: "Invalid otp!" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
      },
    });
    const token = generateJwt({ email: user.email, id: user.id });

    return NextResponse.json(
      {
        message: "Successful, redirecting...",
        data: {
          token,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
