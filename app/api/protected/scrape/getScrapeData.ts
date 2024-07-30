import { Product, RelevantProducts } from "@/types";
import { Page } from "puppeteer";
import UserAgent from "user-agents";

export default async function getScrapeData(
  page: Page,
  scrapeLink: string
): Promise<Product & { relevantProducts: RelevantProducts[] }> {
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

  let items: RelevantProducts[] = [];

  await page.waitForSelector("#main-image");
  await page.waitForSelector("#cm_cr_dp_mb_rating_histogram");
  await page.waitForSelector("#title");
  await page.waitForSelector("#acrCustomerReviewLink");
  await page.waitForSelector("#corePriceDisplay_mobile_feature_div");
  await page.waitForSelector(`div[data-csa-c-asin]:not([data-csa-c-asin=""])`);

  const imageSelector = await page.$("#main-image");
  const ratingSelector = await page.$("#cm_cr_dp_mb_rating_histogram i");
  const titleSelector = await page.$("#title");
  const totalReviewsSelector = await page.$(`[data-hook='total-rating-count']`);
  const priceSelector = await page.$(
    `#corePriceDisplay_mobile_feature_div span.a-price-whole`
  );
  const mrpSelector = await page.$(
    `#corePriceDisplay_mobile_feature_div div:nth-child(3)`
  );
  const productIdSelector = await page.$(
    `div[data-csa-c-asin]:not([data-csa-c-asin=""])`
  );

  const image = await page.evaluate((el: any) => {
    return el.src;
  }, imageSelector);

  const rating = await page.evaluate((el: any) => {
    return el?.textContent.slice(0, 3) || 0;
  }, ratingSelector);

  const title = await page.evaluate((el: any) => {
    return el?.textContent.trim();
  }, titleSelector);

  const totalReviews = await page.evaluate((el: any) => {
    const text = el?.textContent.trim();
    const numericText = text.replace(/[^\d]/g, "");
    return Number(numericText);
  }, totalReviewsSelector);

  const currentPrice = await page.evaluate((el: any) => {
    const text = el?.textContent.trim();
    const numericText = text.replace(/[^\d]/g, "");
    return Number(numericText);
  }, priceSelector);

  const productId = await page.evaluate((el: any) => {
    return el.getAttribute("data-csa-c-asin");
  }, productIdSelector);

  const mrp = await page.evaluate((el: any) => {
    return el.innerText.split("\n")[0];
  }, mrpSelector);

  items = await page.$$eval("[data-adfeedbackdetails]", (elements) => {
    return elements
      .map((el) => {
        if (!el) return null;

        const dataStr = el.getAttribute("data-adfeedbackdetails");
        const data = JSON.parse(dataStr || "");
        const title = data.title.trim();
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
          rating: rating || "0",
          productId,
        };
      })
      .filter((product) => product !== null);
  });

  return {
    title,
    totalReviews,
    rating,
    image,
    productId,
    currentPrice,
    mrp,
    relevantProducts: items,
  };
}
