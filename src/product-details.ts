import {
  Browser, BrowserContext, BrowserContextOptions,
  BrowserType, chromium, ElementHandle, firefox, LaunchOptions,
  webkit,
} from 'playwright-core';
import Product from "./models/product";
import Module from "./models/module";



export default class ProductDetails extends Module{

  public async getProductDetails(
  url:string,
  browser:'firefox' | 'chrome' | 'webkit' = 'firefox',
  launchOptions?:LaunchOptions,
  contextOptions?:BrowserContextOptions,
):Promise<(Product|string | null)[]> {
    let browserType: BrowserType;
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
    const b: Browser = await browserType.launch(launchOptions);
    const context: BrowserContext = await b.newContext(contextOptions);
    const page = await context.newPage();
    await page.goto(url);

    try {
      await super.helpers.scrollUntilElementAppears("");
    } catch (e) {
      console.warn('There is no product');
      return [];
    }
    // await super.helpers.expandAll(selectors.user.profile.education.seeMoreButton);
    const productListItems: ElementHandle<HTMLElement>[] = (await this.page
        .$$("//div[contains(@class,'primary-content')]/ul[contains(@id,'search-result-items')]/li[contains(@class,'grid-title')]") ?? []) as ElementHandle<HTMLElement>[];
    return Promise.all(productListItems.map(async (productListItem) => {
        return productListItem.getAttribute("data-tcproduct");
    }));

  }

  init(): void {
  }
}
test("https://www.sephora.fr/shop/parfum-c301/");


