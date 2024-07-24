import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(req.url as string);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "User not found!" }, { status: 404 });

    const scrapes = await prisma.scrape.findMany({
      where: {
        userId: id,
      },
      select: {
        product: {
          select: {
            title: true,
            productId: true,
          },
        },
      },
      take: 4,
      orderBy: {
        scrapedAt: "desc",
      },
    });

    return NextResponse.json({ data: scrapes }, { status: 200 });
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
}
