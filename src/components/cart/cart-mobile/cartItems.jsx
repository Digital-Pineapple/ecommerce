import { useEffect, useState } from "react";
import Image from "next/image"
import { helpers } from "../../../helpers"
import { ButtonGroup } from "../../ui";
import { startRemoveProductShoppingCart, updatedProductQuantityCartNotLogged, startUpdatedProductQuantity, startRemoveProductsShoppingCartNotLogged } from "../../../actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../hooks/useDebounce";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


export const CartItems = ({ product }) => {
  const { product_id, quantity } = product;
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth)
  const [quantityInput, setQuantityInput] = useState(quantity);
  const [productSelected, setProductSelect] = useState({})

  const price_product = helpers.priceFormat(product_id.price);
  const subtotaProduct = product_id.price * quantity;
  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product_id.discount, subtotaProduct);
  const subtotal = helpers.priceFormat(totalWithDiscountApply || 0);

  const quantityInputadd = useDebounce(quantityInput, 1000);
  const productSelectedUpdated = useDebounce(productSelected, 2000);

  const notify = (message) => toast(message);


  useEffect(() => {
    if (Object.keys(productSelectedUpdated).length > 0) {
      dispatch(startUpdatedProductQuantity(product));
    }
  }, [productSelectedUpdated, dispatch]);

  useEffect(() => {

    product.quantity = Number(quantityInputadd);

    if (logged) {
      dispatch(startUpdatedProductQuantity(product));
    } else {
      dispatch(updatedProductQuantityCartNotLogged(product));
    }
  }, [quantityInputadd, logged]);


  const increaseDecreaseQuantityProduct = (value) => {
    if (value === -1) {
      if (product.quantity === 1) return;
      product.quantity = (Number(product.quantity) - 1);
      setQuantityInput((Number(product.quantity)));
      if (logged) {
        setProductSelect(product);

      } else {
        dispatch(updatedProductQuantityCartNotLogged(product));
      }
      return;
    }
    product.quantity = product.quantity + 1;
    if (product.quantity > product_id.quantity) return;
    setQuantityInput((Number(product.quantity)));
    if (logged) {
      setProductSelect(product);
    } else {
      dispatch(updatedProductQuantityCartNotLogged(product));
    }
    return;
  }

  const handleChangeQuantity = ({ target }) => {

    if (target.value.length < 1) {
      setQuantityInput(1);
      return;
    }

    if (target.value > product_id.quantity) {
      setQuantityInput(product_id.quantity);
      return;
    }
    const quantity = target.value.replace(/^0+/, '');
    setQuantityInput(quantity)
  }

  const handleRemoveProduct = (_id) => {
    if (logged) {
      dispatch(startRemoveProductShoppingCart(_id));
    } else {
      dispatch(startRemoveProductsShoppingCartNotLogged(_id));
    }
  }

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 bg-white text-sm flex items-center text-center truncate max-w-sm">
        <div>
          <Zoom zoomMargin={45}>
            <picture>
              <source media="(max-width: 10px)" srcSet={ product.product_id.multimedia[0].path } />
              <img
                src={(product.product_id.multimedia.length > 0) ? product.product_id.multimedia[0].path : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
                alt={product.name}
                className="min-w-[6rem] min-h-[6rem] h-[6rem] w-[6rem]"
              />
            </picture>
          </Zoom>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 font-normal px-4 whitespace-no-wrap truncate">
            {product_id.name}
          </span>
          <span className="text-gray-900 px-4 whitespace-no-wrap text-lg flex">
            {price_product}
          </span>
        </div>
      </td>
      <td className="px-5 py-5 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap ">
          {product_id.quantity}
        </p>
      </td>
      <td className="px-5 py-5 bg-white text-sm text-center">
        <ButtonGroup
          quantity={quantityInput}
          increaseDecreaseQuantityProduct={increaseDecreaseQuantityProduct}
          handleChangeQuantity={handleChangeQuantity}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap ">
          {subtotal}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <IconButton onClick={() => handleRemoveProduct(product_id._id)}>
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  )
}