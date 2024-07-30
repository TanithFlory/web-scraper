import { RelevantProducts } from "@/types";
import { Product } from "@/types";
import { Page } from "puppeteer";

const UserAgent = require("user-agents");

export default async function getScrapeData(
  page: Page,
  scrapeLink: string
): Promise<Product> {
  const userAgent = new UserAgent({ deviceCategory: "mobile" }).toString();

  await page.setViewport({
    width: 1920,
    height: 3000,
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });

  await page.setUserAgent(userAgent);
  await page.setJavaScriptEnabled(true);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(scrapeLink, { waitUntil: "domcontentloaded" });

  let items: (RelevantProducts | null)[] = [];

  // await page.waitForSelector("#main-image");
  await page.waitForSelector("#cm_cr_dp_mb_rating_histogram");
  await page.waitForSelector("#title");
  await page.waitForSelector("#acrCustomerReviewLink");
  await page.waitForSelector("#corePriceDisplay_mobile_feature_div");

  const imageSelector = await page.$("#main-image");
  const ratingSelector = await page.$("#cm_cr_dp_mb_rating_histogram i");
  const titleSelector = await page.$("#title");
  const totalReviewsSelector = await page.$(
    "#acrCustomerReviewLink span.cm-cr-review-stars-text-sm"
  );
  const priceSelector = await page.$(
    `#corePriceDisplay_mobile_feature_div span.a-price-whole`
  );

  const image = await page.evaluate((el: any) => {
    return el.src;
  }, imageSelector);

  const rating = await page.evaluate((el: any) => {
    return el.textContent.slice(0, 3) || 0;
  }, ratingSelector);

  const title = await page.evaluate((el: any) => {
    return el.textContent.trim();
  }, titleSelector);

  const totalReviews = await page.evaluate((el: any) => {
    return el.textContent.trim();
  }, totalReviewsSelector);

  const price = await page.evaluate((el: any) => {
    const text = el.textContent.trim();
    const numericText = text.replace(/[^\d]/g, "");
    return numericText;
  }, priceSelector);

  console.log(price);

  const scrapeData: Product = await page.evaluate(() => {
    const doc = document as any;
    // const rating =
    //   doc
    //     .querySelector("#cm_cr_dp_mb_rating_histogram")
    //     ?.querySelector("i")
    //     ?.textContent.slice(0, 3) || 0;

    // const title = doc.querySelector("#title")?.textContent.trim();

    // const totalReviews = doc
    //   .querySelector("#acrCustomerReviewLink")
    //   .querySelector("span")
    //   .textContent.trim();
    // const productPrice = doc
    //   .querySelector('[id^="corePriceDisplay"]')
    //   ?.innerText.trim()
    //   ?.split("\n");
    // const productId = doc
    //   .querySelector('div[data-csa-c-asin]:not([data-csa-c-asin=""])')
    //   .getAttribute("data-csa-c-asin");

    // items = Array.from(document.querySelectorAll(".a-carousel-card"))
    //   .map((el: Element): RelevantProducts | null => {
    //     const element = el.querySelector("[data-adfeedbackdetails]");
    //     if (!element) return null;
    //     const dataStr = element?.getAttribute("data-adfeedbackdetails");
    //     const data = JSON.parse(dataStr || "");
    //     const title = data.title.trim();
    //     const image = data.adCreativeImage.highResolutionImages[0]?.url;
    //     const rating = el
    //       .querySelector("i")
    //       ?.className?.trim()
    //       .replace(/\D/g, "");
    //     const currentPrice = data.priceAmount;
    //     const productId = data.asin;

    //     return {
    //       image,
    //       title,
    //       currentPrice,
    //       rating,
    //       productId,
    //     };
    //   })
    //   .filter((el: any) => el != null);

    return {
      title: "",
      relevantProducts: [],
      totalReviews: "",
      rating: "",
      image: "",
      productId: "",
      currentPrice: "",
      mrp: "",
    };
  });
  // await page.close()
  return scrapeData;
}
