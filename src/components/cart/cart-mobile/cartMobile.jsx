import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartItems } from './cartItems';

import { useCart } from '../../../hooks/useCart';

export const CartMobile = () => {


  const [shoppingCart, setShoppingCart] = useState([])
  const { cart, cartNotLogged } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.length > 0) {
      setShoppingCart(cart)
    } else {
      setShoppingCart(cartNotLogged)
    }
  }, [cart, cartNotLogged]);
  return (
    <div className="overflow-x-auto mb-2">
      <div>
        <table className="min-w-full leading-normal font-Poppins borfe border-collapse">
          <thead>
            <tr>
              <th className="px-5 py-4 text-lg bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">
                Producto
              </th>
              <th className="px-5 py-4 text-lg bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Existente</th>
              <th className="px-5 py-4 text-lg bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Cantidad</th>
              <th className="px-5 py-4 text-lg bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Subtotal</th>
              <th className="px-5 py-4 text-lg bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              !shoppingCart.length ?
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan={6}>
                    <p className="text-gray-900 whitespace-no-wrap">
                      No has agregado productos al carrito de compras
                    </p>
                  </td>
                </tr>
                :
                shoppingCart.map(product => (
                  <CartItems
                    key={product.product_id._id}
                    product={product}
                  />
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}