import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url as string);
    const scrapeLink = searchParams.get("scrapeLink") as string;
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

    const priceSelector = await page.waitForSelector(
      "#corePriceDisplay_desktop_feature_div"
    );

    const price = await priceSelector?.evaluate((el) =>
      (el as HTMLDivElement).innerText.split("\n")
    );

    const textSelector = await page.waitForSelector("#title");
    const title = await textSelector?.evaluate((el) => el.textContent?.trim());
    const ratingSelector = await page.waitForSelector(
      "#averageCustomerReviews"
    );
    const rating = await ratingSelector?.evaluate((el) =>
      (el as any)?.querySelector(".a-size-base.a-color-base").textContent.trim()
    );
    const reviewsSelector = await page.waitForSelector(
      "#acrCustomerReviewText"
    );
    const reviews = await reviewsSelector?.evaluate((el) => el.textContent);

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
    const image = await page.$("#landingImage");
    const src = await image?.evaluate((img) => img?.getAttribute("src"));
    await page.close();
    await browser.close();
    return NextResponse.json({
      data: {
        image: src,
        title,
        rating,
        price: price?.[0],
        mrp: price?.[3],
        reviews,
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
