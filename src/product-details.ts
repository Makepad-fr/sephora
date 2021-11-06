import {

  ElementHandle, Page,
} from 'playwright-core';
import Module from './models/module';

export default class ProductDetails extends Module {
  public constructor(page:Page) {
    super(page);
  }

  public async getProductDetails() {
    try {
      await this.helpers.scrollToTheEnd();
    } catch (e) {
      console.warn('There is no product');
      return [];
    }
    // await super.helpers.expandAll(selectors.user.profile.education.seeMoreButton);
    const productListItems: ElementHandle<HTMLElement>[] = (await this.page
      .$$("//div[contains(@class,'primary-content')]/ul[contains(@id,'search-result-items')]/li[contains(@class,'grid-tile')]/div[contains(@class,'product-tile')]") ?? []) as ElementHandle<HTMLElement>[];
    console.log(`Number of products ${productListItems.length}`);
    return Promise.all(productListItems.map(async (productListItem) => JSON.parse(await productListItem.getAttribute('data-tcproduct') ?? '{}')));
  }

  async init(): Promise<void> {
    await this.page.goto('https://www.sephora.fr/single-day-parfum/');
  }
}
