import client from "../config/axiosConfig";
import { shippingCosts } from "../staticData/shippingCosts";
import { types } from "../types";
import { helpers } from "../helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import { errorNotify } from "../helpers/helpers";

/*****************Obtiene el carrito del localStorage************************** */

export const startLoadCartFromLocalStorage = (cart) => ({
   type: types.loadShoppingCartFromLocalStorage,
   payload: cart,
});

const loadCartFromLocalStorage = (cart) => ({
});


/** Obtener carrito de compras de la base de datos */
export const startLoadShoppingCart = (token, currency) => {
   return async (dispatch) => {
      try {
         let url = '/cart';
         const { data } = await client.get(url, {
            headers: {
               'Authorization': token,
               'Currency': currency
            }
         });
         if (data.cart.products.length > 0) {
            dispatch(loadShoppingCart(data.cart.products, data.shippingCosts));
         }

      } catch (error) {
         console.log(error);
      }
   }
}

export const loadShoppingCart = (shoppingCart, shippingCosts) => ({
   type: types.loadShoppingCart,
   payload: {
      shoppingCart,
      shippingCosts
   }
});



/**Agregar productos al carrito de compras */
export const startAddProductShoppingCart = (data, product) => {
   return async (dispatch) => {
      try {
         let url = '/cart';
         const token = Cookies.get('token');
         const res = await client.post(url, data, {
            headers: {
               'Authorization': token
            }
         });
         Swal.fire({
            icon: "success",
            title: "¡¡Buen Trabajo!!",
            html: `<p class="font-Poppins text-base">El producto ha sido agregado al carrito satisfactoriamente</p>`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
         });
         dispatch(addProductToShoppingCart(product));
      } catch (error) {
         console.log(error);
         Swal.fire({
            icon: "error",
            title: "¡¡Ups , al parecer hubo un problema!!",
            text: "Vuelve a intentarlo en un rato más :( ",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
         })
      }
   }
}

export const addProductToShoppingCart = (product) => ({
   type: types.updatedShoppingCart,
   payload: product
});



/**calculate totals shoppingcart */

export const startCalculateTotalSale = (cart, logged) => {

   return async (dispatch, getState) => {

      const { cartNotLogged, coupon, shippingCosts } = getState().cart;

      const data = {};
      let subtotalCart = 0;
      let subtotalWithCoupon = 0;
      let total = 0;

      if (logged)
         data = helpers.calculateTotalOfCart(cart);
      else
         data = helpers.calculateTotalOfCart(cart);

      subtotalCart = data.productsDiscount + data.productsWithoutDiscount + data.productsCanvas;

      if (coupon) {
         subtotalWithCoupon = helpers.applyCoupon(data.productsWithoutDiscount, coupon.discount);
         total = shippingCosts + Number(subtotalWithCoupon + data.subtotalCartWithDiscount + data.subtotalCanvas) || 0;
      } else {
         total = subtotalCart + shippingCosts || 0;
      }

      dispatch(calculateTotalSale(subtotalWithCoupon, subtotalCart, total, shippingCosts))

   }
}

export const calculateTotalSale = (subtotalWithCoupon, subtotalCart, total, shippingSelected) => ({
   type: types.calculateTotalShoppingCart,
   payload: {
      subtotalWithCoupon,
      subtotalCart,
      total,
      shippingSelected
   }
});




/**Remove Products shopping cart */

export const startRemoveProductShoppingCart = (_id) => {
   return async (dispatch) => {
      try {
         let url = `/cart/product/${_id}`;
         const token = Cookies.get('token');
         const res = await client.delete(url, {
            headers: {
               'Authorization': token
            }
         });
         dispatch(removeProductShoppingCart(res.data.cart.products));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            errorNotify(error?.response?.data?.message);
            return;
         }
         errorNotify("Parece que hubo un error - Intenta más tarde");
      }
   }
}

export const removeProductShoppingCart = (shoppingCart) => ({
   type: types.removeProductShoppingCart,
   payload: shoppingCart
});


/**update quantity product cart */
export const startUpdatedProductQuantity = (product) => {
   return async (dispatch) => {
      try {
         let url = '/cart';
         const token = Cookies.get('token');
         const currency = Cookies.get('Currency');
         const { data } = await client.post(url, product, {
            headers: {
               'Authorization': token,
               'Currency': currency
            }
         });
         dispatch(updatedProductQuantity(data.cart.products, data.shippingCosts));
      } catch (error) {
         console.log(error);
      }
   }
}
export const updatedProductQuantity = (shoppingCart, shippingCosts) => ({
   type: types.updatedProductQuantity,
   payload: {
      shoppingCart,
      shippingCosts,
   }
});




/**load shoppingCart from localStorage */
export const addShoppingCartFromLocalStorage = (shoppingCart) => ({
   type: types.loadShoppingCartFromLocalStorage,
   payload: shoppingCart
})

/**load subtotals , totals in shoppingcart */
export const loadTotalsFromCookies = (superTotal, withDiscount, withoutDiscount, shippingCosts, order_id, canvasTotals, business_rule, coupon) => ({
   type: types.loadTotalsFromCookies,
   payload: {
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts,
      order_id,
      canvasTotals,
      business_rule,
      coupon
   }
})


/**save shoppingcart in db */

export const startFinaliceSaleCheckout = (data) => {
   return async (dispatch, getState) => {

      const { shipping_costs } = getState().cart;
      try {
         const oldToken = Cookies.get('token');
         const currency = Cookies.get('Currency') || 'MXN'
         let url = '/orders/calculate/discount/web';
         const res = await client.post(url, data, {
            headers: {
               'Authorization': oldToken,
               'Currency': currency
            }
         });

         Cookies.set('superTotal', JSON.stringify(res.data.superTotal));
         Cookies.set('withDiscount', JSON.stringify(res.data.withDiscount));
         Cookies.set('withoutDiscount', JSON.stringify(res.data.withoutDiscount));
         Cookies.set('shippingCosts', JSON.stringify(shipping_costs || {}));
         Cookies.set('order_id', JSON.stringify(res.data.order_id));
         Cookies.set('canvasTotals', JSON.stringify(res.data.canvasTotals));
         Cookies.set('typeOrder', JSON.stringify(res.data.typeOrder));
         Cookies.set('business_rule', JSON.stringify(res.data.business_rule));
         Cookies.set('coupon', JSON.stringify(res.data.coupon));

         dispatch(finaliceSaleCheckout(
            res.data.superTotal,
            res.data.withDiscount,
            res.data.withoutDiscount,
            res.data.order_id,
            res.data.canvasTotals,
            res.data.business_rule
         ));

      } catch (error) {
         if (axios.isAxiosError(error)) {
            errorNotify(`${error?.response?.data?.message}. ${error?.response?.data?.product?.name} Disponibles: ${error?.response?.data?.actual_stock}`);
            return;
         }
         errorNotify("Parece que hubo un error - Intenta más tarde");
      }

   }
}

export const finaliceSaleCheckout = (superTotal, withDiscount, withoutDiscount, order_id, canvasTotals, business_rule, coupon) => ({
   type: types.finaliceCheckoutCart,
   payload: {
      superTotal,
      withDiscount,
      withoutDiscount,
      order_id,
      canvasTotals,
      business_rule,
      coupon,
   }
});




/** Usuarios no autenticados */
export const addProductToCartClientsNotLogged = (cartNotLogged) => ({
   type: types.addProductShoppingCartNoLoggued,
   payload: cartNotLogged
});

export const shoppingCartNotLoggedfromLocalStorage = (cartNotLogged) => ({
   type: types.loadShoppingCartNotLoggedFromLocalStorage,
   payload: cartNotLogged
});

export const updatedProductQuantityCartNotLogged = (product) => ({
   type: types.updatedProductQuantityCartNotLogged,
   payload: product
});

export const startRemoveProductsShoppingCartNotLogged = (_id) => {
   return (dispatch) => {
      let cartNoAuth = JSON.parse(localStorage.getItem('cartNotlogged') || '');
      const newCart = cartNoAuth.filter((cart) => cart.product_id._id !== _id);
      localStorage.setItem('cartNotlogged', JSON.stringify(newCart));
      dispatch(removeProductsShoppingCartNotLogged(_id))
   }

}

export const removeProductsShoppingCartNotLogged = (_id) => ({
   type: types.deleteProductShoppingCartNotLogged,
   payload: _id
});




/**shoppingCart Fussion */

export const startloadshoppingCartFussion = (products, token) => {
   return async (dispatch) => {
      try {
         let url = '/cart/fussion';

         const { data } = await client.post(url, { products }, {
            headers: {
               'Authorization': token
            }
         });
         dispatch(loadShoppingCartFussion(data.cart.products));
      } catch (error) {
         console.log(error);
      }
   }
}

export const loadShoppingCartFussion = (fussionShoppingCart) => ({
   type: types.loadShoppingCartFussion,
   payload: fussionShoppingCart
});


/** Get shipping Address client */
export const startGetDirections = (token) => {
   return async (dispatch) => {
      let url = '/auth/directions/user';
      try {
         const res = await client.get(url, {
            headers: {
               'Authorization': token
            }
         })
         dispatch(getDirections(res.data.directions));
      } catch (error) {
         console.log(error);
      }
   }
}

export const getDirections = (directions) => ({
   type: types.loadDirectionsShoppingCart,
   payload: directions
});

export const addShippingAddressSelected = (address) => ({
   type: types.addAddressSelected,
   payload: address
})

export const startSaveNewAddress = (data) => {

   return async (dispatch) => {
      let url = 'auth/save-directions';
      try {
         const token = await Cookies.get('token');
         const res = await client.post(url, data, {
            headers: {
               'Authorization': token
            }
         });
         dispatch(saveNewAddress(res.data.direction));
         return {
            hasError: false,
            message: res?.data?.message,
         }

      } catch (error) {
         if (axios.isAxiosError(error)) {
            return {
               hasError: true,
               message: error?.response?.data?.message,
            }
         }

         return {
            hasError: true,
            message: "No se pudo guardar la dirección - intente mas tarde"
         }
      }
   }
}
export const saveNewAddress = (directions) => ({
   type: types.addDirectionInCart,
   payload: directions,
});

/****************cupones*********************/

export const getCoupon = (subtotal, coupon) => {
   return async (dispatch) => {
      let url = `coupons/code/${coupon}`
      try {
         const res = await client.get(url);
         if (res.data.coupon) {
            const newSubtotal = await helpers.applyCoupon(subtotal, res.data.coupon.discount);
            dispatch(addCoupon(newSubtotal, res.data.coupon));
         }
         return {
            hasError: false,
            message: res.data.message,
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return {
               hasError: true,
               message: error?.response?.data?.message
            }
         }

         return {
            hasError: true,
            message: "Parece que hubo un error - Intente más tarde"
         }
      }
   }
}

export const addCoupon = (subtotal, coupon) => ({
   type: types.add_coupon,
   payload: {
      subtotal,
      coupon
   }
})

export const removeCoupon = () => ({
   type: types.remove_coupon,
});

export const removeAddressFromCart = () => ({
   type: types.removeAddressFromCart,
});

export const startLoadBusinessRules = () => {
   return async (dispatch) => {
      let url = `/business-rules`
      try {
         const { data } = await client.get(url);
         dispatch(loadBusinesRules(data.business_rules));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            errorNotify(error?.response?.data?.message);
         }
         return {
            hasError: true,
            message: "Parece que hubo un error - Intente más tarde"
         }
      }
   }
}

const loadBusinesRules = (businesRules) => ({
   type: types.load_business_rules,
   payload: businesRules
})