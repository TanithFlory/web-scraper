import { Product, RelevantProducts } from "@/types";
import { Page } from "puppeteer";
import UserAgent from "user-agents";

export default async function getScrapeData(
  page: Page,
  scrapeLink: string
): Promise<Product & { relevantProducts: RelevantProducts[] }> {
  const userAgent = new UserAgent({ deviceCategory: "desktop" }).toString();

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
      page.waitForSelector("#landingImage", { timeout: 1000 }),
      page.waitForSelector("#acrPopover", { timeout: 1000 }),
      page.waitForSelector("#productTitle", { timeout: 1000 }),
      page.waitForSelector("#acrCustomerReviewLink", { timeout: 1000 }),
      page.waitForSelector("#priceValue", { timeout: 1000 }),
      page.waitForSelector("#asin", { timeout: 1000 }),
    ]);
  } catch (error) {
    console.error("Failed to find required selectors:", error);
  }

  const [
    imageSelector,
    ratingSelector,
    titleSelector,
    totalReviewsSelector,
    priceSelector,
    productIdSelector,
  ] = await Promise.all([
    page.$("#landingImage").catch(() => null),
    page.$("#acrPopover").catch(() => null),
    page.$("#productTitle").catch(() => null),
    page.$(`#acrCustomerReviewLink`).catch(() => null),
    page.$("#priceValue").catch(() => null),
    page.$("#asin").catch(() => null),
  ]);

  const image = imageSelector
    ? await page.evaluate((el: any) => el.getAttribute("src"), imageSelector)
    : "";

  const rating = ratingSelector
    ? await page.evaluate((el: any) => {
        const title = el.getAttribute("title");
        const match = title.match(/^\d+(\.\d+)?/);
        return match ? match[0] : "0";
      }, ratingSelector)
    : "0";

  const title = titleSelector
    ? await page.evaluate((el: any) => el.textContent.trim(), titleSelector)
    : "";

  const totalReviews = totalReviewsSelector
    ? await page.evaluate((el: any) => {
        const text = el.textContent.trim();
        const numericText = text.replace(/[^\d]/g, "");
        return Number(numericText);
      }, totalReviewsSelector)
    : 0;

  const currentPrice = priceSelector
    ? await page.evaluate((el: any) => Number(el.value), priceSelector)
    : 0;

  const productId = productIdSelector
    ? await page.evaluate((el: any) => el.value, productIdSelector)
    : "";

  // Handle MRP selector with default value and timeout
  let mrp = "";
  try {
    await page.waitForSelector(
      `#corePriceDisplay_desktop_feature_div div:nth-child(3)`,
      { timeout: 1000 }
    );
    const mrpSelector = await page.$(
      `#corePriceDisplay_desktop_feature_div div:nth-child(3)`
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
            .querySelectorAll("a")[2]
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
