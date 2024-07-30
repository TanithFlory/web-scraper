import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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

    if (existingUser && !existingUser.isVerified) {
      await prisma.user.update({
        where: { email },
        data: {
          otp: {
            create: {
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
              code: Math.floor(100000 + Math.random() * 999999),
            },
          },
        },
      });
      return NextResponse.json(
        {
          message: "Email not verified. Please wait.",
          data: {
            id: existingUser.id,
          },
        },
        { status: 201 }
      );
    }

    const validationResult = validation(email, password, existingUser);
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
          uuid: user.uuid,
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
