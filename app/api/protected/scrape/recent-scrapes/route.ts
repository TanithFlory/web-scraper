import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(req.url as string);
    const id = searchParams.get("id");
    const detailsOnly = searchParams.get("detailsOnly");
    const page = Number(searchParams.get("page")) || 1;

    if (!id) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    let selectOptions = {
      product: {},
    };

    if (!detailsOnly) {
      selectOptions = {
        product: {
          select: {
            title: true,
            productId: true,
          },
        },
      };
    }

    const take = detailsOnly ? 10 : 4;

    const [scrapes, totalCount] = await Promise.all([
      prisma.scrape.findMany({
        where: {
          userId: id,
        },
        select: selectOptions,
        take,
        skip: (page - 1) * take,
        orderBy: {
          scrapedAt: "desc",
        },
      }),
      prisma.scrape.count({
        where: {
          userId: id,
        },
      }),
    ]);

    return NextResponse.json(
      { data: { totalCount, scrapes } },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
