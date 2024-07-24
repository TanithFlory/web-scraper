import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PrismaClient } from "@prisma/client";
import getGraph from "./getGraph";
import getScrapeData from "./getScrapeData";
import { ProductLauncher } from "puppeteer";

export async function GET(req: NextRequest, _res: NextResponse) {
  const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(req.url as string);
    const scrapeLink = searchParams.get("scrapeLink");
    const id = searchParams.get("id");

    if (!scrapeLink || !id)
      return NextResponse.json(
        {
          message: "Parameters id and scrapeLink are required.",
        },
        { status: 400 }
      );

    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const scrapeData = await getScrapeData(page, scrapeLink);
    let graphSrc = "";

    let product = await prisma.product.findUnique({
      where: { productId: scrapeData.productId },
    });

    const { productId, title, currentPrice, image, totalReviews, rating } =
      scrapeData;

    if (!product) {
      const graphSrc = await getGraph(page, scrapeLink);
      product = await prisma.product.create({
        data: {
          productId,
          title,
          currentPrice,
          image,
          totalReviews,
          rating,
          scrapeCount: 1,
          graphSrc,
        },
      });
    } else {
      graphSrc = product.graphSrc;
      product = await prisma.product.update({
        where: { productId },
        data: {
          currentPrice: scrapeData.currentPrice,
          scrapeCount: {
            increment: 1,
          },
        },
      });
    }

    const scrape = await prisma.scrape.create({
      data: {
        user: { connect: { id } },
        product: { connect: { productId: product.productId } },
        scrapedAt: new Date(),
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
