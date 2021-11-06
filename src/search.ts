import {

  ElementHandle, Page,
} from 'playwright-core';
import Module from './models/module';
import selectors from './selectors';

export default class Search extends Module {
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
      .$$(selectors.search.resultItem) ?? []) as ElementHandle<HTMLElement>[];
    console.log(`Number of products ${productListItems.length}`);
    return Promise.all(productListItems.map(async (productListItem) => JSON.parse(await productListItem.getAttribute('data-tcproduct') ?? '{}')));
  }

  async init(): Promise<void> {
    await this.page.goto('https://www.sephora.fr/single-day-parfum/');
  }
}
