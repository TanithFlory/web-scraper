import prisma from "@/app/api/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, _res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url as string);
    const detailsOnly = searchParams.get("detailsOnly");
    const page = Number(searchParams.get("page")) || 1;
    const id = Number(req.headers.get("id"));

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

    const take = detailsOnly ? 13 : 4;

    const [scrapes, totalCount] = await Promise.all([
      prisma.scrape.findMany({
        where: {
          userId: id,
        },
        select: {
          createdAt: true,
          ...selectOptions,
        },
        take,
        skip: (page - 1) * 13,
        orderBy: {
          id: "desc",
        },
      }),
      prisma.scrape.count({
        where: {
          userId: id,
        },
      }),
    ]);
    if (!totalCount) {
      return NextResponse.json(
        { message: "Couldn't find any results." },
        { status: 203 } //204 causing typeerror in nextjs -> https://github.com/vercel/next.js/pull/48354
      );
    }
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
