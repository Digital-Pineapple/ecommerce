import { useSelector } from "react-redux";
import { helpers } from "../../helpers";

export const OrderInfo = () => {

  const { superTotal, withDiscount, withoutDiscount, finalShippingCosts, canvas, business_rule, coupon } = useSelector((state) => state.cart);

  const super_total = helpers.priceFormat(superTotal?.total || 0);
  const with_discount = helpers.priceFormat(withDiscount?.total || 0);
  const canvasTotal = helpers.priceFormat(canvas?.total || 0);
  const without_discount = helpers.priceFormat(withoutDiscount?.total || 0);
  const subtotal = helpers.priceFormat(
    withDiscount?.total + withoutDiscount?.total + canvas?.total || 0
  );

  const shipping = helpers.priceFormat(finalShippingCosts);

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr className="">
          <th className="bg-wapicolor-600 px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-[#fff] uppercase">
            Descripción
          </th>
          <th className="bg-wapicolor-600 px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold uppercase text-[#fff]">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {
          withDiscount.total > 0 && (
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333] text-left font-Poppins capitalize">
                  Subtotal productos con descuento
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-[#333] text-left font-Poppins">
                  {with_discount}
                </p>
              </td>
            </tr>
          )
        }
        {
          withoutDiscount.subtotal > 0 && (
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins capitalize">
                  Subtotal productos
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins">
                  {without_discount}
                </p>
              </td>
            </tr>
          )
        }
        {
          business_rule && business_rule.discount > 0 && (
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins capitalize">
                  Descuento aplicado
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins">
                  -{business_rule?.discount || 0} %
                </p>
              </td>
            </tr>
          )
        }
        {
          coupon && (
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins capitalize">
                  Cupón aplicado
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins">
                  -{coupon?.discount} %
                </p>
              </td>
            </tr>
          )
        }
        {
          canvas.subtotal > 0 && (
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins capitalize">
                  Productos canvas
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <p className="text-[#333]  text-left font-Poppins">
                  {canvasTotal}
                </p>
              </td>
            </tr>
          )
        }
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins capitalize">
              Gastós de Envio
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins">
              {shipping}
            </p>
          </td>
        </tr>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins capitalize">
              Subtotal del carrito
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins">{subtotal}</p>
          </td>
        </tr>

        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins capitalize">
              Total a pagar
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
            <p className="text-[#333]  text-left font-Poppins">
              {super_total}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
