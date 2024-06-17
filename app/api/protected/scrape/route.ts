import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
const userAgent = require("user-agents");

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url as string);
    const scrapeLink = searchParams.get("scrapeLink") as string;
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    //Randomize User agent or Set a valid one
    const UA = userAgent.random().toString();

    //Randomize viewport size
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

    await page.setRequestInterception(true);

    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto(scrapeLink);

    const textSelector = await page.waitForSelector("#title");
    const title = await textSelector?.evaluate((el) => el.textContent?.trim());

    const ratingSelector = await page.waitForSelector("#acrCustomerReviewLink");
    const ratingStats = await ratingSelector?.evaluate((el) => {
      const rating = (el as any).querySelector("i").getAttribute("class").replace(/\D/g, "");

      const reviews = (el as any).querySelector("span")?.textContent.trim();

      return { rating, reviews };
    });
    console.log(ratingStats);
    // const ratingSelector = await page.waitForSelector(".starRatingsLeftDiv");
    // const rating = await ratingSelector?.evaluate((el) =>
    //   (el as any)?.querySelector("span")?.textContent.trim()
    // );

    // const reviewsSelector = await page.waitForSelector(
    //   `[data-hook="total-rating-count"]`
    // );
    // const totalReviews = await reviewsSelector?.evaluate((el) =>
    //   el.textContent?.trim()
    // );

    const relevantProducts = await page.evaluate(() => {
      const items: any = [];
      document
        .querySelectorAll(".a-carousel-card")
        .forEach((item: any, index) => {
          if (!item || index === 0) return;
          if (index === 9) return;
          const title = item.querySelector(".a-link-normal")?.innerText;
          const price = item
            .querySelector(".a-price")
            ?.innerText.split("\n")[0];
          const rating = item
            ?.querySelectorAll("i")[1]
            ?.className.replace(/[a-zA-Z/-]/g, "")
            .trim();

          const image = item?.querySelector("img")?.getAttribute("src");
          if (title && image && price) {
            items.push({
              title,
              price,
              rating:
                rating > 5
                  ? `${rating.substring(0, 1)}.${rating.substring(1)}`
                  : rating,
              image,
            });
          }
        });
      return items;
    });
    const image = await page.$("#main-image");
    const src = await image?.evaluate((img) => img?.getAttribute("src"));
    // await page.close();
    // await browser.close();
    return NextResponse.json({
      data: {
        image: src,
        title,
        rating: ratingStats?.rating,
        totalReviews: ratingStats?.reviews,
        // price: price?.[0],
        // mrp: price?.[3],
        relevantProducts,
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
