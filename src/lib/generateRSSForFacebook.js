import { writeFileSync } from 'fs';
import RSS from 'rss';
import { helpers } from '../helpers';

import { startLoadProductsRSS } from '../actions/productsAction';

export default async function getRSSForFacebook() {

  const { textToRSSFeed } = helpers;

  const siteURL = 'https://wapizima.com';

  const products = await startLoadProductsRSS();

  const feed = new RSS({
    title: "Wapizima",
    description: "Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más.",
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "es",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Digiatl Pineapple`,
  });

  products?.map((product) => {
    feed.item({
      title: textToRSSFeed(product.name),
      url: `${siteURL}/productos/${product.url}`,
      date: product.createdAt,
      description: textToRSSFeed(product.description),
      custom_elements: [
        { 'id': product._id },
        { 'availability': product.quantity > 0 ? 'in stock' : 'out of stock' },
        { 'condition': 'used' },
        { 'price': `${product.price} MXN` },
        { 'link': `${siteURL}/productos/${product?.url}` },
        { 'image_link':`${product?.multimedia[0].path}/original.webp`, },
        { 'brand': product?.brand?.name },
        { 'google_product_category': 2975}
      ]
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}