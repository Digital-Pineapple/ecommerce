import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";

//import { newProduct } from "../../src/actions/shoppingCartActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { helpers } from "../../src/helpers";
import {
  addProductToCartClientsNotLogged,
  addShoppingCartFromLocalStorage,
  shoppingCartNotLoggedfromLocalStorage,
  startAddProductShoppingCart,
} from "../../src/actions/shoppingCartActions";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { ButtonGroup, ProductCard } from "../../src/components/ui";
import Image from "next/image";
import Cookies from "js-cookie";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useDebounce } from "../../src/hooks/useDebounce";
import ProductSliderShow from "../../src/components/products/ProductSliderShow";
import { infoNotify } from "../../src/helpers/helpers";
import { startLoadCurrencies } from "../../src/actions/countryAcctions";

const Show = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { product, relatedProducts } = useSelector((state) => state.products);

  const { cart, cartNotLogged } = useSelector((state) => state.cart);
  const { logged } = useSelector((state) => state.auth);

  const [quantityInput, setQuantityInput] = useState(1);
  const quantityInputadd = useDebounce(quantityInput, 1000);

  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(
    product?.discount,
    product?.price
  );

  const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);
  const price = helpers.priceFormat(product?.price);

  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const url = `${origin}${router.asPath}`;

  const addProductCard = (product) => {
    const itemCart = {
      product_id: {
        price: product.price,
        quantity: product.quantity,
        multimedia: product.multimedia,
        _id: product._id,
        name: product.name,
        discount: product.discount,
        product_type: product.product_type,
      },
      quantity: quantityInput,
      _id: product._id,
    };

    if (logged) {
      const token = Cookies.get("token");
      let shoppingCart = [...cart, itemCart];
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
      dispatch(startAddProductShoppingCart(itemCart, product.name, token));
    } else {
      let shoppingCart;
      let productInCart = cartNotLogged.find(
        (cart) => cart._id === itemCart._id
      );
      if (productInCart) {
        shoppingCart = cartNotLogged.map((cart) =>
          cart._id === itemCart._id
            ? { ...cart, quantity: itemCart.quantity }
            : cart
        );
      } else {
        shoppingCart = [...cartNotLogged, itemCart];
      }
      dispatch(addProductToCartClientsNotLogged(shoppingCart));
      localStorage.setItem("cartNotlogged", JSON.stringify(shoppingCart));
      Swal.fire({
        icon: "success",
        title: "¡¡Buen Trabajo!!",
        html: `<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const increaseDecreaseQuantityProduct = (value) => {
    if (value === -1) {
      if (Number(quantityInput) === 1) return;
      setQuantityInput((prev) => Number(prev) - 1);
    } else {
      if (Number(quantityInput) === Number(product?.quantity)) return;
      setQuantityInput((prev) => Number(prev) + 1);
    }
  };

  const handleChangeQuantity = ({ target }) => {
    if (target.value.length < 1) return setQuantityInput(1);

    if (target.value > product.quantity) return setQuantityInput(product.quantity);

    const quantity = target.value.replace(/^0+/, "");
    setQuantityInput(quantity);
  };

  const handleClickRedirectCart = () => {
    addProductCard(product);
    router.push("/mi-carrito");
  };
  useEffect(() => {
    if (!logged) {
      let cartNotLogged =
        JSON.parse(localStorage.getItem("cartNotlogged")) || [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged));
    }
  }, [logged]);

  const structuredData = {
    "@context": "http://www.schema.org",
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
        }, ${product?.name.toLowerCase()}, ${product?.description?.toLowerCase()}, ${product?.tags.length > 0 &&
        product?.tags.map((tags) => tags?.tag_id?.name)
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
                  product?.product_type === '1' && (
                    <div className="flex items-center mb-10">
                      <ButtonGroup
                        quantity={quantityInput}
                        increaseDecreaseQuantityProduct={increaseDecreaseQuantityProduct}
                        handleChangeQuantity={handleChangeQuantity}
                      />
                      <button
                        className="h-[45px] top-[-2px] relative cursor-pointer border-[1px] border-solid border-[#333] flex items-center px-[25px] rounded-none uppercase hover:bg-[#333] hover:text-secondary transition-all duration-700 ease-in-out text-xs ml-2 md:ml-5 md:text-[14px] md:text-xs"
                        onClick={() => addProductCard(product)}
                      >
                        <ShoppingCartIcon />
                        Añadir a carrito
                      </button>
                    </div>
                  )
                }
                <button
                  className="bg-[#333] border-2 text-white py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            hover:bg-[#000]
                            "
                  onClick={() => handleClickRedirectCart()}
                >
                  COMPRAR AHORA!
                </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-24">
            {relatedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
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
