import { helpers } from "../../../helpers";
import { Grid } from "@mui/material";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './orderProduct.module.css';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

export const OrderProductsList = ({ product, handleOpenUploadImages, status, order_id, canvasStatus }) => {

    const { product_id: productList, quantity, subtotalInCurrency, subtotal, product: dataProduct, canvas_multimedia } = product;
    const subtotalProduct = helpers.priceFormat(subtotalInCurrency || subtotal);

    return (
        <div className="flex items-center justify-center flex-wrap">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div className="flex flex-wrap md:flex-nowrap md:justify-start justify-center mb-3 relative">
                        <Zoom>
                            <picture>
                                <img
                                    src={dataProduct?.multimedia[0]?.path}
                                    className="min-w-[7rem] min-h-[7rem] h-[10rem] w-[10rem]"
                                />
                            </picture>
                        </Zoom>
                        <div className="mt-6 lg:ml-5 font-Poppins overflow-hidden">
                            <h3 className="text-base text-[#333] leading-6 capitalice">
                                {dataProduct?.name}
                            </h3>
                            <p className="text-sm text-[#888] leading-7 truncate max-w-[400px]">
                                {dataProduct?.description}
                            </p>
                            <p className="text-sm leading-6">
                                Cantidad: {quantity} pzs
                            </p>
                            <p className="text-sm leading-6">
                                Subtotal: {subtotalProduct}
                            </p>
                            <div className="flex pb-5 pt-1">
                                {
                                    !canvasStatus && status === 2 && dataProduct.product_type === '2' && canvas_multimedia.length > 0 &&(
                                        <span
                                            className="bg-white flex items-center shadow-lg rounded-md hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleOpenUploadImages(product, order_id)}
                                        >
                                            <button className="bg-green-500 py-1 px-2 text-white rounded-l-md mr-1 text-xs h-full">Subir imagenes</button>
                                            <VerticalAlignTopIcon className="text-xs text-green-500" />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}