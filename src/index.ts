import Sephora from './sephora';

async function test() {
  const sephora = await Sephora.init('firefox', { headless: false });
  const pd = await sephora.productDetails(false);
  await pd.getProductDetails();
  // console.log(JSON.stringify(details, undefined, 4));
}
test().then();
