import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import getGraph from "./getGraph";
const userAgent = require("user-agents");

export async function GET(req: NextRequest, _res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url as string);
    const scrapeLink = searchParams.get("scrapeLink") as string;
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    const UA = userAgent.random().toString();

    await page.setViewport({
      width: 1920 + Math.floor(Math.random() * 100),
      height: 3000 + Math.floor(Math.random() * 100),
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    });

    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);
    await page.goto(scrapeLink, { waitUntil: "domcontentloaded" });

    let items: any = [];
    const data = await page.evaluate(() => {
      const rating =
        (document as any)
          .querySelector("#cm_cr_dp_mb_rating_histogram")
          ?.querySelector("i")
          ?.textContent.slice(0, 3) || 0;

      const title = (document as any)
        .querySelector("#title")
        ?.textContent.trim();

      const totalReviews = (document as any)
        .querySelector("#acrCustomerReviewLink")
        .querySelector("span")
        .textContent.trim();

      const image = (document as any)
        .querySelector("#main-image")
        .getAttribute("src");

      const productPrice = (document as any)
        .querySelector('[id^="corePriceDisplay"]')
        ?.innerText.trim()
        ?.split("\n");

      items = Array.from(document.querySelectorAll(".a-carousel-card")).map(
        (el: Element) => {
          const element = el.querySelector("[data-adfeedbackdetails]");
          if (!element) return;
          const dataStr = element?.getAttribute("data-adfeedbackdetails");
          const data = JSON.parse(dataStr || "");
          const title = data.title;
          const image = data.adCreativeImage.highResolutionImages[0]?.url;
          const rating = el
            .querySelector("i")
            ?.className?.trim()
            .replace(/\D/g, "");

          const price = data.priceAmount;
          return {
            image,
            title,
            price,
            rating,
          };
        }
      );
      return {
        title,
        relevantProducts: items.filter((el: any) => el != null),
        totalReviews,
        rating,
        image,
        price: productPrice[0],
        mrp: productPrice[3],
      };
    });

    const graphSrc = await getGraph(page, scrapeLink);

    return NextResponse.json({
      data: {
        ...data,
        graphSrc,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: "Internal Server Error" },
      { status: 500 }
    );
  }
}
