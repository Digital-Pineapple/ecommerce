import { useSelector } from "react-redux";
import { CartItems } from './cartItems';

import CartMobile from "../cartMobile/CartMobile";

import style from '../cart.module.css'

export const Cart = () => {
 
  const { cart } = useSelector((state) => state.cart);
  const { dimensions } = useSelector((state) => state.ui);

  return (
    <>
      {
        dimensions === 'sm' ? (
          <CartMobile cart={cart} />
        ) : (
          <div className={`overflow-auto mb-2 max-h-[800px] ${style.scrollbar}`}>
            <div>
              <table className="min-w-full leading-normal font-Poppins border-collapse">
                <thead>
                  <tr>
                    <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">
                      Producto
                    </th>
                    <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Existente</th>
                    <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Cantidad</th>
                    <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Subtotal</th>
                    <th className="px-5 py-4 text-lg bg-wapicolor-600 text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">
                      Opciones
                    </th>
                  </tr >
                </thead >
                <tbody>
                  {
                    !cart?.length ?
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan={6}>
                          <p className="text-gray-900 whitespace-no-wrap">
                            No has agregado productos al carrito de compras
                          </p>
                        </td>
                      </tr>
                      :
                      cart?.map(product => (
                        <CartItems
                          key={product.product_id?._id}
                          product={product}
                        />
                      ))
                  }
                </tbody>
              </table >
            </div >
          </div >
        )
      }

    </>
  )
}