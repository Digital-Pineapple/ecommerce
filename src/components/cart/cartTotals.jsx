import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupon,
  removeCoupon,
  startFinaliceSaleCheckout,
} from "../../actions/shoppingCartActions";
import { ShippingAddress } from "./shippingAddress";
import { TotalShoppingCart } from "./totalShoppingCart";
import CouponDetails from "./CouponDetails";
import { errorNotify } from "../../helpers/helpers";
import useKeyboardControl from "../../helpers/useKeyboardControl";
import useEscapeKey from "../../helpers/useEscapeKey";
import GavelIcon from "@mui/icons-material/Gavel";
import LoadingScreen from "../LoadingScreen";

import * as ga from "../../libs/ga/index";
export const CartTotals = ({ toggleBusinessRule, toggleSelectCountry }) => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const { disableKeyboard } = useKeyboardControl();
  const { isEscapeKeyPressed } = useEscapeKey();
  const {
    cart,
    subtotal,
    total,
    shipping_costs,
    shippingAddress,
    addressSelected,
    coupon,
    subtotalWithCoupon,
    canvas,
  } = useSelector((state) => state.cart);
  const router = useRouter();

  const [inputCoupon, setInputCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const proceedToCheckout = async () => {
    if (!logged) {
      return router.push(`/auth/login?p=${router.asPath}`);
    }

    if (cart.length < 1)
      return errorNotify(
        "Debes agregar almenos un producto al carrito de compras"
      );

    if (shippingAddress.length < 1) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Ups , hubo un problema',
      //   text: 'Al parecer no tienes direcciones de envío registradas , agrega una dirección y vuelve a intentarlo',
      //   timer: 3000,
      //   timerProgressBar: true,
      //   showConfirmButton: false
      // });
      errorNotify(
        "Al parecer no tienes direcciones de envío registradas , agrega una dirección y vuelve a intentarlo"
      );
      router.push("/perfil/direcciones");
      return;
    }

    if (Object.keys(addressSelected).length < 1)
      return errorNotify(
        "¡Upps!, Selecciona una dirección de envío antes de continuar"
      );

    setLoading(true);
    const products = await cart.reduce(
      (acc, item) => {
        const { product_id } = item;
        if (product_id.discount > 0 && product_id.product_type === "1") {
          acc.productsDiscount.push({
            product_id: product_id._id,
            quantity: item.quantity,
          });
        } else if (
          product_id.discount === 0 &&
          product_id.product_type === "1"
        ) {
          acc.productsWithoutDiscount.push({
            product_id: product_id._id,
            quantity: item.quantity,
          });
        } else {
          acc.productsCanvas.push({
            product_id: product_id._id,
            quantity: item.quantity,
          });
        }
        return acc;
      },
      { productsDiscount: [], productsWithoutDiscount: [], productsCanvas: [] }
    );

    const data = {
      productsDiscount: products.productsDiscount,
      productsWithoutDiscount: products.productsWithoutDiscount,
      shipment: shipping_costs?.shippingCosts,
      coupon_id: coupon ? coupon._id : "",
      shippment_direction: addressSelected,
      productsCanvas: products.productsCanvas,
    };

    const isValid = await dispatch(startFinaliceSaleCheckout(data));
    if (!isValid) return setLoading(false);
    ga.onCheckout(cart);
    if (!isEscapeKeyPressed) {
      router.push("/checkout");
    }
    setLoading(false);
  };

  const handleApplyCoupon = async (event) => {
    event.preventDefault();

    if (inputCoupon < 1) return;

    const { hasError, message } = await dispatch(
      getCoupon(subtotal, inputCoupon)
    );
    if (hasError)
      return errorNotify(`¡Upps! Parece que hubo un error, ${message}`);
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setInputCoupon("");
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="py-20 px-10 shadow-md">
        <div className="relative w-full">
          <p className="absolute right-0 -top-10 text-[#333] text-sm font-semibold">
            Cantidad:{" "}
            {cart?.length === 1
              ? `${cart?.length} producto`
              : `${cart?.length} productos`}
          </p>
        </div>
        <h4 className="font-Poppins text-[20px] text-center leading-[1.3] uppercase pb-[2px]">
          Total Carrito
        </h4>
        <div className="flex flex-row-reverse pr-5 mb-4">
          <GavelIcon
            className="text-[19px] text-[#888] cursor-pointer hover:text-[#e91e63]"
            onClick={toggleBusinessRule}
          />
        </div>
        {/* <div className="border-b-[1px] flex justify-start flex-wrap pb-[13px]">
          <SubtotalInfo
            subtotal={subtotal}
          />
        </div> */}
        <hr />
        <div className="border-b-[1px] border-dashed border-[#d9d9d9] flex flex-wrap flex-start pt-[20px]">
          {/* <InfoShippingCosts /> */}
          <div className="w-full flex justify-center flex-wrap my-[20px]">
            <ShippingAddress toggleSelectCountry={toggleSelectCountry} />
          </div>

          <div className="w-full">
            <CouponDetails
              handleApplyCoupon={handleApplyCoupon}
              setInputCoupon={setInputCoupon}
              coupon={coupon}
              handleRemoveCoupon={handleRemoveCoupon}
              subtotalWithCoupon={subtotalWithCoupon}
            />
          </div>
          <div className=" flex flex-wrap items-start pb-[33px] pt-[27px] justify-aound w-full">
            <TotalShoppingCart total={total} />
          </div>
          <button
            className="rounded-[25px] bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
            onClick={() => proceedToCheckout()}
            // onClick={handleSelectAddress}
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
};
