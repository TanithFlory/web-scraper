import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { scrapeLink } = data;
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(scrapeLink);
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
    await page.setUserAgent(ua);
    await page.setViewport({ width: 1080, height: 1024 });

    const textSelector = await page.waitForSelector("#title");
    const fullTitle = await textSelector?.evaluate((el) =>
      el.textContent?.trim()
    );
    const ratingSelector = await page.waitForSelector(
      "#averageCustomerReviews"
    );
    const rating = await ratingSelector?.evaluate((el) =>
      (el as any)?.querySelector(".a-size-base.a-color-base").textContent.trim()
    );
    
    const olElements = await page.evaluate(() => {
      const items: any = [];
      document
        .querySelectorAll(".a-carousel-card")
        .forEach((item: any, index) => {
          if (!item || index === 0) return;
          const title = item.querySelector(".a-link-normal")?.innerText;
          const price = item.querySelector(".a-price")?.innerText;
          const rating = item
            ?.querySelectorAll("i")[1]
            ?.className.replace(/[a-zA-Z/-]/g, "")
            .trim();

          const image = item?.querySelector("img")?.getAttribute("src");
          if (title && image && price) {
            items.push({ title, price, rating, image });
          }
        });
      return items;
    });
    const image = await page.$("#landingImage");
    const src = await image?.evaluate((img) => img?.getAttribute("src"));
    await page.close();
    // await browser.close();
    return NextResponse.json({
      message: {
        image: src,
        title: fullTitle,
        rating,
        olElements: olElements,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
