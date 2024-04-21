import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encryption } from "../../utils/encryption";
import generateJwt from "../../utils/generateJwt";

export async function POST(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const { email, password } = data;
    const emailRegex = /^[\w-._]+@([\w-]{3,}\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\w\W]{6,}$/;

    if (!email.trim().length && !password.trim().length) {
      return NextResponse.json(
        { message: "Validation Error. Email & Password fields are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid Email, enter a valid email" },
        { status: 400 }
      );
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password criteria failed." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await encryption(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
        otp: Math.floor(100000 + Math.random() * 999999),
        otpValid: new Date(Date.now() + 600000),
      },
    });

    await prisma.$disconnect();
    
    const token = generateJwt({ email, id: user.id });
    
    return NextResponse.json(
      { message: "Successfully registered", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
