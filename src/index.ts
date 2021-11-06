import {
  Browser, BrowserContext, BrowserContextOptions,
  BrowserType, chromium, firefox, LaunchOptions,
  webkit,
} from 'playwright-core';

export default async function test(
  url:string,
  browser:'firefox' | 'chrome' | 'webkit' = 'firefox',
  launchOptions?:LaunchOptions,
  contextOptions?:BrowserContextOptions,
) {
  let browserType:BrowserType;
  switch (browser) {
    case 'firefox':
      browserType = firefox;
      break;
    case 'chrome':
      browserType = chromium;
      break;
    default:
      browserType = webkit;
  }
  const b:Browser = await browserType.launch(launchOptions);
  const context:BrowserContext = await b.newContext(contextOptions);
  const page = await context.newPage();
  await page.goto(url);
  await b.close();
}
test('https://www.sephora.fr/', undefined, { headless: false });
