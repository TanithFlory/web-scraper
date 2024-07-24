import { RelevantProducts } from "@/types";
import { Product } from "@/types";

const userAgent = require("user-agents");

export default async function getScrapeData(
  page: any,
  scrapeLink: string
): Promise<Product> {
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

  const scrapeData: Product = await page.evaluate(() => {
    const doc = document as any;
    const rating =
      doc
        .querySelector("#cm_cr_dp_mb_rating_histogram")
        ?.querySelector("i")
        ?.textContent.slice(0, 3) || 0;

    const title = doc.querySelector("#title")?.textContent.trim();

    const totalReviews = doc
      .querySelector("#acrCustomerReviewLink")
      .querySelector("span")
      .textContent.trim();

    const image = doc.querySelector("#main-image").getAttribute("src");

    const productPrice = doc
      .querySelector('[id^="corePriceDisplay"]')
      ?.innerText.trim()
      ?.split("\n");
    const productId = doc
      .querySelector('div[data-csa-c-asin]:not([data-csa-c-asin=""])')
      .getAttribute("data-csa-c-asin");

    items = Array.from(document.querySelectorAll(".a-carousel-card")).map(
      (el: Element): RelevantProducts | null => {
        const element = el.querySelector("[data-adfeedbackdetails]");
        if (!element) return null;
        const dataStr = element?.getAttribute("data-adfeedbackdetails");
        const data = JSON.parse(dataStr || "");
        const title = data.title;
        const image = data.adCreativeImage.highResolutionImages[0]?.url;
        const rating = el
          .querySelector("i")
          ?.className?.trim()
          .replace(/\D/g, "");
        const currentPrice = data.priceAmount;
        const productId = data.asin;

        return {
          image,
          title,
          currentPrice,
          rating,
          productId,
        };
      }
    );
    return {
      title,
      relevantProducts: items.filter((el: any) => el != null),
      totalReviews,
      rating,
      image,
      productId,
      currentPrice: productPrice[0],
      mrp: productPrice[3],
    };
  });

  return scrapeData;
}
