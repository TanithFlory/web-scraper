import { Page } from "puppeteer";

export default async function getGraph(
  page: any,
  scrapeLink: string
): Promise<string> {
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
  });

  await page.goto("https://pricehistoryapp.com", {
    waitUntil: "domcontentloaded",
  });

  const inputSelector = await page.waitForSelector("input");
  if (!inputSelector) {
    return ""; // Return empty if input is not found
  }

  await inputSelector.evaluate((el: any) => {
    return el.parentElement?.querySelector("button");
  });
  await inputSelector.evaluate(
    (el: any, scrapeLink: string) => (el.value = scrapeLink),
    scrapeLink
  );

  await page.focus("input");
  await page.keyboard.press("Space");

  const searchButtonSelector = "button[title='Search Price History']";
  await page.$eval(searchButtonSelector, (element: any) => element.click());

  const navigationPromise = page.waitForNavigation({
    timeout: 3000, 
  });

  const navigationPromiseResolved = navigationPromise
    .then(() => true)
    .catch(() => false);

  // Wait for navigation or timeout
  const isNavigationSuccessful = await navigationPromiseResolved;

  if (!isNavigationSuccessful) {
    // Navigation did not succeed or timed out
    return "";
  }

  // If navigation was successful, proceed to find the graph
  await page.evaluate(() => {
    const frameButton = Array.from(document.querySelectorAll("button"));
    if (frameButton[3]) {
      frameButton[3].click();
    }
  });

  const codeSelector = await page.waitForSelector("code", { visible: true });
  if (!codeSelector) {
    await page.close();
    return ""; // Return empty if code element is not found
  }

  const graphSrc = await codeSelector.evaluate((el: any) => {
    const match = el.textContent.match(/src="([^"]+)"/i);
    return match ? match[1] : "";
  });

  await page.close();

  return graphSrc;
}
