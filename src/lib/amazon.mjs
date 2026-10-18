import products from '../data/amazon-products.json' with { type: 'json' };

// Change this single value when the US Amazon Associates tracking ID changes.
export const AMAZON_ASSOCIATE_ID = 'cravesmart09-20';
export const amazonProducts = products;

export function getAmazonProduct(productId) {
  if (!Object.hasOwn(products, productId)) {
    throw new Error(`Unknown Amazon product: ${productId}`);
  }
  return products[productId];
}

export function getAmazonUrl(productId) {
  const product = getAmazonProduct(productId);
  if (!/^[A-Z0-9]{10}$/.test(product.asin)) {
    throw new Error(`Invalid Amazon ASIN for ${productId}`);
  }
  const url = new URL(`/dp/${product.asin}`, 'https://www.amazon.com');
  // Retain observed variant/offer parameters, never obsolete attribution fields.
  const allowedParameters = new Set(['th', 'psc', 'smid', 'language', 'm', 'me', 'quantity']);
  for (const [key, value] of Object.entries(product.parameters ?? {})) {
    if (!allowedParameters.has(key)) throw new Error(`Unsupported Amazon parameter: ${key}`);
    url.searchParams.set(key, value);
  }
  url.searchParams.set('tag', AMAZON_ASSOCIATE_ID);
  return url.href;
}
