import { useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";

import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { helpers } from "../../src/helpers";
import { useRouter } from "next/router";
import { ProductCard } from "../../src/components/ui";
import ButtonGroup from "../../src/components/ui/buttonGroup";
import Image from "next/image";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { CircularProgress } from '@mui/material';

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import ProductSliderShow from "../../src/components/products/ProductSliderShow";
import { startLoadCurrencies } from "../../src/actions/countryAcctions";
import { useCart } from "../../src/hooks/useCart";

const Show = () => {

  const router = useRouter();
  const { product, relatedProducts } = useSelector((state) => state.products);

  console.log(product)

  const { cart } = useSelector((state) => state.cart);
  const { logged } = useSelector((state) => state.auth);

  const { addProduct, updateProductQuantity, handleChangeProductQuantity, quantity: inputQuantity, loading } = useCart(logged, "", product, cart, 2, false);

  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(
    product?.discount,
    product?.price
  );

  const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);
  const price = helpers.priceFormat(product?.price);

  const origin = typeof window === "undefined" ? "" : window.location.origin;

  const url = `${origin}${router.asPath}`;

  const handleClickRedirectCart = () => {
    addProduct();
    router.push("/mi-carrito");
  };

  const structuredData = {
    "@context": "https://www.schema.org",
    "@type": "Product",
    "description": product?.description,
    "name": product?.name,
    "image": product?.multimedia[0]?.path,
    "sku": product?.sku,
    "brand": {
      "@type": "Brand",
      "name": product?.brand?.name,
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "price": product?.price,
      "priceCurrency": "MXN",
    }
  };

  return (
    <Layout
      title={`Wapizima - ${product?.name}`}
      keywords={`Wapizima, ${product?.category?.name}, ${product?.brand?.name
        }. ${product?.subcategory?.name
        }, ${product?.name.toLowerCase()}, ${product?.description?.toLowerCase()},${product?.tags.length > 0 &&
        product?.tags.map((tags) => ` ${tags?.tag_id?.name}`)
        }`}
      description={product?.description}
      ogTitle={`Wapizima - ${product?.name}`}
      ogType="Product"
      ogUrl={origin}
      ogImage={product?.multimedia[0]?.path}
      robots="index, follow"
      canonical={origin}
      price={product?.price}
      curren="MXN"
      structuredData={structuredData}
    >
      <section className="container mx-auto mt-20 font-Poppins">
        <Container>
          <div className="grid grid-cols-1">
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <Link href="/" passHref>
                <div className="flex items-center justify-between cursor-pointer">
                  <HomeIcon />
                  <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                </div>
              </Link>
              <Link href="/productos" passHref>
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-lg font-Poppins ml-3 ">Productos</span>
                </div>
              </Link>
              <Typography
                variant="subtitle1"
                className="text-base font-Poppins text-[#e91e63]"
              >
                {product?.name}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-5 lg:p-10">
            <div className="lg:pb-5 md:px-5">
              {product?.multimedia.length > 0 ? (
                <ProductSliderShow
                  slideImages={product?.multimedia}
                  product={product}
                />
              ) : (
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                  alt={product?.name}
                  width={100}
                  height={100}
                  layout="responsive"
                />
              )}
            </div>
            <div className="mt-5 md:mt-0 p-2 md:pl-5 lg:pl-10">
              <h1 className="text-[22px] font-Poppins font-normal capitalize leading-[1.5] text-[#212529]">
                {product?.name}
              </h1>
              <div className="mt-5">
                <div className="flex mb-[5px] fle">
                  {product?.discount > 0 && (
                    <p className="text-[18px] text-[#333] mr-5 ">
                      {sale_price_discount}
                    </p>
                  )}
                  <p
                    className={`mr-12 ${product?.discount > 0
                      ? "line-through text-[#333] text-[18px] font-thin"
                      : "text-[18px] text-[#333]"
                      }`}
                  >
                    {price}
                  </p>
                </div>
                <p className="mt-4 font-medium uppercase">
                  {product?.quantity} Disponibles
                </p>
              </div>
              <div className="mt-5">
                <div className="flex items-center">
                  <h3 className="text-[#666] text-[16px]">Marca:</h3>
                  <p
                    className="text-[#333] font-medium ml-2 cursor-pointer hover:text-gray-700 duration-500"
                  >
                    {product?.brand?.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="text-[#666] text-[16px]">Categoría:</h3>
                  <p
                    className="text-[#333] font-medium ml-2 cursor-pointer hover:text-gray-700 duration-500"
                  >
                    {product?.category?.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="text-[#666] text-[16px]">Subcategoría:</h3>
                  <p
                    className="text-[#333] font-medium ml-2 cursor-pointer hover:text-gray-700 duration-500"
                  >
                    {product?.subcategory?.name}
                  </p>
                </div>
                {product?.tags.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-[#666] text-[16px] leading-8">Tags:</h3>
                    <div className="flex">
                      {product?.tags.map((tag) => (
                        <div
                          key={tag?.tag_id?._id}
                          className="bg-[#333] rounded-3xl px-4 py-1 mr-2 cursor-pointer "
                        >
                          <span
                            className="text-secondary font-medium text-xs duration-500 flex items-center justify-center text-center"
                          >
                            {tag?.tag_id?.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {
                  product?.product_type === '2' && (
                    <>
                      <div className="flex items-center mt-4">
                        <h3 className="text-[#666] text-[16px]">Tipo de producto:</h3>
                        <p
                          className="text-[#333] font-medium ml-2 cursor-pointer hover:text-gray-700 duration-500"
                        >
                          {product?.variation?.name}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <h3 className="text-[#666] text-[16px]">Imágenes:</h3>
                        <p
                          className="text-[#333] font-medium ml-2 cursor-pointer hover:text-gray-700 duration-500"
                        >
                          {product?.variation?.number_images === '1' ? `${product?.variation?.number_images} imágenen requerida` : `${product?.variation?.number_images} imágenes requeridas`}
                        </p>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="mt-12 lg:mt-10">
                {
                  product?.product_type === '1' && product.quantity > 0 && (
                    <div className="flex items-center mb-10">
                      <ButtonGroup
                        quantity={inputQuantity}
                        increaseDecreaseQuantityProduct={updateProductQuantity}
                        handleChangeQuantity={handleChangeProductQuantity}
                        product={product}
                      />

                      <button
                        className="h-[45px] top-[-2px] relative cursor-pointer border-[1px] border-solid border-[#333] flex items-center px-[25px] rounded-none uppercase hover:bg-[#333] hover:text-secondary transition-all duration-700 ease-in-out text-xs ml-2 md:ml-5 md:text-[14px] md:text-xs"
                        onClick={addProduct}
                      >
                        {                          
                          loading ? (<><CircularProgress size={25} /> <p className="ml-5">Agregando...</p></>)
                            : (<><ShoppingCartIcon /> Añadir a carrito</>)
                      }
                      </button>
                    </div>
                  )
                }
                {
                  product?.quantity > 0 && (
                    <button
                      className="bg-[#333] border-2 text-white py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            hover:bg-[#000]
                            "
                      onClick={() => handleClickRedirectCart()}
                    >
                      COMPRAR AHORA!
                    </button>
                  )
                }
              </div>
            </div>
          </div>
          <div className="px-10 w-full break-words text-center">
            <h3 className="inline-block text-[14px] relative pl-[18px] uppercase text-[#666]">
              Descripción
            </h3>
            <hr />
            <p className="text-left my-[20px] text-[#666] leading-[1.8] text-[14px]">
              {product?.description || ""}
            </p>
          </div>
          <div className="mb-[40px] text-center bg-[#f8f8f8] p-[15px]">
            <h3 className="mb-0 inline-block relative pl-[20px]  text-[20px] font-semibold">
              Productos Relacionados
            </h3>
          </div>
          <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-24`}>
            {
              relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }

            {/* {relatedProducts.map((product) => (
              (dimensions === 'sm') ? (
                <ProductCardMobile key={product._id} product={product} />
              ) : (
                <ProductCard key={product._id} product={product} />
              )
            ))} */}
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(startLoadCurrencies());
    const url = ctx.query.url;
    const currency = ctx.req.cookies.Currency || 'MXN';
    const isValid = await store.dispatch(startLoadProduct(url, currency));
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadCurrencies());
    if (!isValid) {
      return {
        notFound: true
      }
    }
  }
);

export default Show;
