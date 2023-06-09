import { writeFileSync } from 'fs';
import RSS from 'rss';
import { helpers } from '../helpers';

import { loadBrands, startLoadProductsPerBrand, startLoadProductsRSS } from '../actions/productsAction';

export default async function getRSSForGoogle() {

    const { textToRSSFeed, priceFormatForGoogleFeed, calculatNewTotalToPay } = helpers;

    const siteURL = 'https://wapizima.com';

    const products = await startLoadProductsRSS();
    const feed = new RSS({
        title: "Wapizima",
        description: "Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más.",
        site_url: siteURL,
        feed_url: `${siteURL}/google-feed.xml`,
        language: "es",
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Digiatl Pineapple`,
        custom_namespaces: {
            'g': 'http://base.google.com/ns/1.0'
          },
    });


    products?.map((product) => {
        const { totalWithDiscountApply } = calculatNewTotalToPay(product.discount, product.price);
        feed.item({
            title: textToRSSFeed(product.name),
            custom_elements: [
                { 'g:id': product._id },
                { 'g:title': textToRSSFeed(product.name) },
                { 'g:description': product.description },
                { 'g:link': `${siteURL}/productos/${product?.url}` },
                { 'g:image_link': product?.multimedia[0]?.path },
                { 'g:mobile_link': `${siteURL}/productos/${product?.url}` },
                { 'g:additional_image_link': product?.multimedia[0]?.path },
                { 'g:availability': product.quantity > 0 ? 'in_stock' : 'out_of_stock' },
                { 'g:availability_date': product.updatedAt },
                { 'g:price': `MXN ${priceFormatForGoogleFeed(product.price)}` },
                (product.discount > 0) && { 'g:sale_price': `MXN ${priceFormatForGoogleFeed(totalWithDiscountApply)}` },
                { 'g:brand': product?.brand?.name },
                { 'g:gtin': product?.barcode },
                { 'g:gender': 'unisex'}
            ]
        });
    });
    writeFileSync(`./public/googleFeed.xml`, feed.xml({ indent: true }));

}