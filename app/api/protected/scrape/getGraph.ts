export default async function getGraph(
  page: any,
  scrapeLink: string
): Promise<string> {
  await page.goto("https://pricehistoryapp.com", {
    waitUntil: "domcontentloaded",
  });
  const inputSelector = await page.waitForSelector("input");
  await inputSelector?.evaluate((el: any) => {
    return el.parentElement?.querySelector("button");
  });
  await inputSelector?.evaluate(
    (el: any, scrapeLink: string) => (el.value = scrapeLink),
    scrapeLink
  );

  await page.focus("input");
  await page.keyboard.press("Space");

  await Promise.all([
    page.$eval(`button[title='Search Price History']`, (element: any) =>
      element.click()
    ),
    await page.waitForNavigation(),
  ]);

  await page.evaluate(() => {
    const frameButton = Array.from(document.querySelectorAll("button"));

    frameButton[3].click();
  });
  const code = await page.waitForSelector("code", { visible: true });

  const graphSrc = await code?.evaluate((el: any) => {
    return (el as any).textContent.match(/src="([^"]+)"/i)[1];
  });

  return graphSrc;
}
