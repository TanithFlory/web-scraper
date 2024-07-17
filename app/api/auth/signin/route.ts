import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decryption } from "../../utils/encryption";
import generateJwt from "../../utils/generateJwt";

export async function POST(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const { email, password } = data;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Email not verified. Please enter an OTP." },
        { status: 403 }
      );
    }

    const isValidPassword = await decryption(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Incorrect password." },
        { status: 403 }
      );
    }

    await prisma.$disconnect();

    const token = generateJwt({ email, id: user.id });

    return NextResponse.json(
      { message: "Successfully logged in", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
  }
}
