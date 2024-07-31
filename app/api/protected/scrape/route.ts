import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PrismaClient } from "@prisma/client";
import getGraph from "./getGraph";
import getScrapeData from "./getScrapeData";
import { NextRequestProtected } from "@/types";

export async function GET(req: NextRequestProtected, res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(req.url as string);
    const scrapeLink = searchParams.get("scrapeLink");
    const id = Number(req.headers.get("id"));

    if (!scrapeLink) {
      return NextResponse.json(
        {
          message: "Parameters scrapeLink is required.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const scrapeData = await getScrapeData(page, scrapeLink);
    let graphSrc = "";
    const product = await prisma.product.upsert({
      where: { productId: scrapeData.productId },
      create: {
        productId: scrapeData.productId,
        title: scrapeData.title,
        currentPrice: scrapeData.currentPrice,
        image: scrapeData.image,
        totalReviews: scrapeData.totalReviews,
        rating: scrapeData.rating,
        scrapeCount: 1,
        graphSrc: "", // Initially set as empty
      },
      update: {
        currentPrice: scrapeData.currentPrice,
        scrapeCount: {
          increment: 1,
        },
      },
    });

    if (!product.graphSrc) {
      graphSrc = await getGraph(page, scrapeLink);
      await prisma.product.update({
        where: { productId: product.productId },
        data: { graphSrc },
      });
    } else {
      graphSrc = product.graphSrc;
    }

    await browser.close();

    const scrape = await prisma.scrape.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.productId,
        },
      },
      update: {},
      create: {
        user: { connect: { id } },
        product: { connect: { productId: product.productId } },
      },
    });

    await prisma.user.update({
      where: { id },
      data: {
        scrapes: { connect: { id: scrape.id } },
      },
    });

    return NextResponse.json(
      {
        data: {
          ...scrapeData,
          graphSrc,
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
