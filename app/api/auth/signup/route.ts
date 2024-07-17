import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import generateJwt from "../../utils/generateJwt";
import validation from "./validation";
import createUser from "./createUser";

export async function POST(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const { email, password } = data;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!existingUser?.isVerified) {
      return NextResponse.json(
        { message: "Email not verified. Please wait." },
        { status: 201 }
      );
    } else if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const validationResult = validation(email, password);
    if (!validationResult.isValidated) {
      const { message, status } = validationResult.reason || {
        message: "Unknown error",
        status: 500,
      };
      return NextResponse.json({ message }, { status });
    }

    const user = await createUser(email, password, prisma);

    return NextResponse.json(
      {
        message: "Sucessful! Please wait...",
        data: {
          id: user.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
