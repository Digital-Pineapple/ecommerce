import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import ButtonGroup from "../../ui/buttonGroup";
import { helpers } from "../../../helpers"
import { useCart } from '../../../hooks/useCart';

export const CartItems = ({ product }) => {

  const { product_id, quantity } = product;
  const { logged } = useSelector((state) => state.auth);

  const price_product = helpers.priceFormat(product_id?.price);
  const subtotaProduct = product_id?.price * quantity;
  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product_id?.discount, subtotaProduct);
  const subtotal = helpers.priceFormat(totalWithDiscountApply || 0);

  const { updateProductQuantity, handleChangeProductQuantity, removeProduct, quantity: inputQuantity } = useCart(logged, quantity, product_id, undefined, undefined, true);

  return (
    <tr className={`border-b border-gray-200`}>
      <td className="px-4 bg-white text-sm flex items-center text-center truncate max-w-sm">
        <Zoom zoomMargin={45}>
          <picture>
            <source media="(max-width: 10px)" srcSet={product?.product_id?.multimedia[0].path} />
            <img
              src={(product?.product_id?.multimedia?.length > 0) ? product?.product_id?.multimedia[0].path : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
              alt={product?.name}
              className="min-w-[6rem] min-h-[6rem] h-[6rem] w-[6rem]"
            />
          </picture>
        </Zoom>
        <div className="flex flex-col">
          <span className="text-gray-900 font-normal px-4 whitespace-no-wrap truncate">
            {product_id?.name}
          </span>
          <span className="text-gray-900 px-4 whitespace-no-wrap text-lg flex">
            {price_product}
          </span>
        </div>
      </td>
      <td className="px-5 py-5 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap ">
          {product_id?.quantity}
        </p>
      </td>
      <td className="px-5 py-5 bg-white text-sm text-center">
        <ButtonGroup
          quantity={inputQuantity}
          increaseDecreaseQuantityProduct={updateProductQuantity}
          handleChangeQuantity={handleChangeProductQuantity}
          product={product_id}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap ">
          {subtotal}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <IconButton onClick={() => removeProduct(product_id._id)} className="text-wapicolor-600"> 
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  )
}