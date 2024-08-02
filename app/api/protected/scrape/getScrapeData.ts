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

  console.log("Navigating to:", scrapeLink);
  await page.goto(scrapeLink, { waitUntil: "domcontentloaded" });
  console.log("Page loaded");

  try {
    await Promise.all([
      page.waitForSelector("#main-image"),
      page.waitForSelector("#cm_cr_dp_mb_rating_histogram"),
      page.waitForSelector("#title"),
      page.waitForSelector("#acrCustomerReviewLink"),
      page.waitForSelector(`#twister-plus-price-data-price`),
      page.waitForSelector(`div[data-csa-c-asin]:not([data-csa-c-asin=""])`),
    ]);
  } catch (error) {
    console.error("Failed to find required selectors:", error);
    throw error;
  }

  const [
    imageSelector,
    ratingSelector,
    titleSelector,
    totalReviewsSelector,
    priceSelector,
    productIdSelector,
  ] = await Promise.all([
    page.$("#main-image"),
    page.$("#cm_cr_dp_mb_rating_histogram i"),
    page.$("#title"),
    page.$(`[data-hook='total-rating-count']`),
    page.$(`#twister-plus-price-data-price`),
    page.$(`div[data-csa-c-asin]:not([data-csa-c-asin=""])`),
  ]);

  const image = await page.evaluate((el: any) => el.src, imageSelector);

  const rating = await page.evaluate(
    (el: any) => el?.textContent.slice(0, 3).replace(/[^\d]/g, "") || 0,
    ratingSelector
  );

  const title = await page.evaluate(
    (el: any) => el?.textContent.trim(),
    titleSelector
  );

  const totalReviews = await page.evaluate((el: any) => {
    const text = el?.textContent.trim();
    const numericText = text.replace(/[^\d]/g, "");
    return Number(numericText);
  }, totalReviewsSelector);

  const currentPrice = await page.evaluate((el: any) => {
    return Number(el.value);
  }, priceSelector);

  const productId = await page.evaluate(
    (el: any) => el.getAttribute("data-csa-c-asin"),
    productIdSelector
  );

  // Handle MRP selector with default value and timeout
  let mrp = "";
  try {
    await page.waitForSelector(
      `#corePriceDisplay_mobile_feature_div div:nth-child(3)`,
      { timeout: 1000 }
    );
    const mrpSelector = await page.$(
      `#corePriceDisplay_mobile_feature_div div:nth-child(3)`
    );
    if (mrpSelector) {
      mrp = await page.evaluate(
        (el: any) => el.innerText.split("\n")[0],
        mrpSelector
      );
    }
  } catch (error) {
    console.warn("MRP selector failed or not found:", error);
  }
  let items: RelevantProducts[] = [];
  try {
    items = await page.$$eval("[data-adfeedbackdetails]", (elements: any) => {
      return elements
        .map((el: any) => {
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
        .filter((product: Product | null) => product !== null);
    });
  } catch (error) {
    console.log("Failed to find relevant products");
  }
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
