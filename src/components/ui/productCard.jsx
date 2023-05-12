import { memo, useState } from 'react';
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { addOneProduct, removeOneProduct } from "../../actions/wishListActions";
import { helpers } from "../../helpers";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { notify } from "../../helpers/helpers";

import { useCart } from "../../hooks/useCart";
import ButtonGroup from "./buttonGroup";
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';

import * as ga from '../../libs/ga/index';
export const ProductCard = memo(({ product }) => {

  const { logged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { _id, name, price, url, quantity, discount } = product;

  const { addProduct, productInCart, updateProductQuantity, handleChangeProductQuantity, quantity: inputQuantity, loading } = useCart(logged, 1, product, cart, undefined, true, 500);

  const history = useRouter();
  const dispatch = useDispatch();

  const [isInWhisList, setisInWhisList] = useState(helpers.existInWishList(_id));

  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product.discount, product.price);

  const sale_price = helpers.priceFormat(price);
  const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);

  const handleShowProduct = () => {
    history.push(`/productos/${url}`);
    ga.click(product);
  };
 
  const handleToogleWishList = (_id) => {
    const { message, existInWishList } = helpers.toggleWishListProducts(_id);
    setisInWhisList(!isInWhisList);
    notify(message);
    if (existInWishList) {
      dispatch(removeOneProduct(_id));
    } else {
      dispatch(addOneProduct(_id));
    }
  };
  
  return (
    <div className="mb-[30px] relative p-2 md:card animate__animated animate__zoomIn md:mx-2 shadow-md md:shadow-none">
      <div className="relative overflow-hidden">
        <div className="w-full h-full relative cursor-pointer">
          {
            product.multimedia.length > 0 ? (
              <Image
                src={product?.multimedia[0]?.images?.original}
                alt={product.name}
                width="320"
                height="320"
                priority="true"
                fill="true"
                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                onClick={handleShowProduct}
              />
            ) : (
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                alt={product?.name}
                width={100}
                height={100}
                layout="responsive"
              />
            )
          }
          {/* <SliderProductCard
            images={product.multimedia}
            className="w-[20rem]"
            handleShowProduct={handleShowProduct}
          /> */}
          <div className="absolute bottom-0 right-0 z-[999] md:hidden">
            <span
              className="inline-block relative  text-[#858585] 
                                     text-[15px] 
                                     line-through 
                                     mr-1
                                     rounded-lg
                                     bg-gray-200
                                     text-xs
                                     top-5
                                     -left-16
                                     px-2
                                     "
            >
              {product.discount > 0 && sale_price}
            </span>
            <span className=" relative bg-gray-200 text-pink-500 text-left rounded-lg text-sm px-2 block">
              {sale_price_discount}
            </span>
          </div>
        </div>
        {quantity <= 0 && (
          <span
            className="text-xs absolute bg-[#333] text-white md:px-6 px-4 py-1 rounded-r-lg top-0 font-bold"
          >
            Agotado
          </span>
        )}
        {discount > 0 && (
          <div
            className="text-center 
                              absolute 
                              text-md
                              md:text-xl
                              top-[12px]
                              md:top-[10px] 
                              md: left-[10px] 
                              bg-[#f57c00] 
                              text-[#fff] 
                              md: w-[20%] 
                              md:h-[10%] 
                              md:leading-[50px] 
                              rounded-[50%] 
                              z-[990]"
          >
            -{discount}%
          </div>
        )}

        <div>
          <h3 className="text-[#333] mb-2 text-xs md:text-[18px] md:font-semibold capitalize md:py-1 md:mt-1 mt-2 truncate cursor-pointer">
            {name}
          </h3>
          <div className="hidden md:block md:mt-[8px] md:mb-[12px]">
            <span
              className="text-[#858585] 
                                     text-[15px] 
                                     line-through 
                                     inline-block 
                                     mr-1"
            >
              {product.discount > 0 && sale_price}
            </span>
            <span className="text-[17px] inline-block">
              {sale_price_discount}
            </span>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <div className="btn-area">
              {
                product.quantity > 0 && (
                  <>
                    {!productInCart ? (
                      <>
                      {
                        loading ? (
                          <CircularProgress
                            size={20}
                            className="ml-10"
                         />
                        ):(
                          <button
                          onClick={addProduct}
                          className="bg-[#fff]
                                          py-[8px] 
                                          md:py-[10px]
                                          px-[10px]
                                          btn-add
                                          md:px-[20px] 
                                          cursor-pointer 
                                          text-[#333] 
                                          border-[#333] 
                                          border-[1px] 
                                          border-solid 
                                          leading-normal 
                                          rounded-lg 
                                          font-normal 
                                          uppercase 
                                          text-[10px]
                                          md:text-[11px]
                                          lg:text-sm
                                          hover:bg-[#333]
                                          hover:text-white
                                          transition-all duration-700 ease-in-out
                                          "
                        >
                          <span
                            className="flex items-center font-Poppins"
                          >
                            Agregar
                          </span>
                        </button>
                        )
                      }
                      </>
                    ) : (
                      <div>
                        <ButtonGroup
                          quantity={inputQuantity}
                          increaseDecreaseQuantityProduct={updateProductQuantity}
                          handleChangeQuantity={handleChangeProductQuantity}
                          product={product}
                        />
                      </div>
                    )
                    }
                  </>
                )
              }

            </div>
            <div className="flex ">
              {/* <span
                className="w-[35px] 
                h-[35px] 
                leading-[38px] 
                text-center  
                text-[#333] 
                rounded-[50%] 
                shadow-md 
                flex justify-center 
                items-center  
                hover:bg-[#333] 
                hover:transition
                hidden
                md:block
                cursor-pointer
                mr-4"
                onClick={() => handleShowProduct()}
              >
                <VisibilityIcon
                  className="text-[25px] text-[#888] w-[90%] z-[2]  hover:text-[#fff] hover:transition"
                />
              </span> */}

              <span
                className="w-[35px] 
                                     h-[35px] 
                                     leading-[38px] 
                                     text-center  
                                     text-[#333] 
                                     rounded-[50%] 
                                     shadow-md 
                                     flex justify-center 
                                     items-center  
                                     hover:bg-[#333] 
                                     hover:transition"
                onClick={() => handleToogleWishList(_id)}
              >
                {isInWhisList ? (
                  <FavoriteIcon className="text-[25px] left-40  space-x-16 text-red-600 w-[60%] z-[2] hover:text-red-600 hover:transition cursor-pointer" />
                ) : (
                  <FavoriteBorderIcon className="text-[25px] text-[#888] w-[60%] z-[2] hover:text-[#fff] hover:transition cursor-pointer" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
});


ProductCard.displayName = 'ProductCard';