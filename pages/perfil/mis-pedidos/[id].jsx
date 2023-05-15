import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions';
import { startLoadCurrencies } from '../../../src/actions/countryAcctions';
import { getOrderId, loadProductDetail, startGetOrder } from '../../../src/actions/ordersActions';
import { wrapper } from '../../../src/store';

import { helpers } from '../../../src/helpers';

import Layout from '../../../src/components/Layouts';
import { BannerImage } from '../../../src/components/ui/bannerImage';

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

import Zoom from 'react-medium-image-zoom';

import { Modal } from "../../../src/components/ui/modal";
import UploadImages from "../../../src/components/orders/UploadImages";
import { useToggle } from "../../../src/hooks/useToggle";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ShowOrder = () => {

    const dispatch = useDispatch();

    const [openUploadImages, toggleUploadImages] = useToggle();

    const { orderDetail, shippingDetail, payments } = useSelector(state => state.orders);

    const handleOpenUploadImages = (product, order_id) => {
        toggleUploadImages();
        dispatch(loadProductDetail(product))
        dispatch(getOrderId(order_id))
    }

    const { products_list } = orderDetail;

    const subtotal = helpers.priceFormat(orderDetail?.subtotalCurrency || orderDetail?.subtotal, orderDetail?.currency?.currency || 'MXN');
    const total = helpers.priceFormat(orderDetail?.totalCurrency || orderDetail?.total, orderDetail?.currency?.currency || 'MXN');
    const shippment = helpers.priceFormat(orderDetail?.shippmentInCurrency || orderDetail?.shippment, orderDetail?.currency?.currency || 'MXN')

    const OrderStatus = ({ status }) => {
        return (
            <div className="ml-2 md:text-sm text-[10px] flex items-center">
                {
                    status === 0 ? (
                        <span className="bg-red-500 md:px-10 px-3 text-white rounded-lg">Pedido cancelado</span>
                    ) : status === 1 ? (
                        <span className="bg-amber-500 md:px-10 px-3 text-white rounded-lg">Pendiente de aprobación</span>
                    ) : status === 2 ? (
                        <span className="bg-blue-500 md:px-10 px-3 text-white rounded-lg">Aprobada - Pendiente de envío</span>
                    ) : (
                        <span className="bg-green-500 md:px-10 px-3 text-white rounded-lg">Pedido enviado</span>
                    )
                }
            </div>
        )
    }

    return (
        <Layout>
            <BannerImage
                title="Detalle de la orden"
                banner="bg-banner7"
            />
            <section className="min-h-screen mx-auto container my-10 lg:my-20 font-Poppins px-4 md:px-0">
                <div className="mt-10 grid grid-col-1 lg:grid-cols-2 text-sm md:text-base">
                    <div>
                        <div className="font-semibold mb-2">
                            <span>Pedido N.º </span>
                            {orderDetail.folio}
                        </div>
                        <hr />
                        <div className="flex font-semibold mt-2">
                            <span>Estatus de envío: </span>
                            <OrderStatus status={orderDetail.orderStatus} />
                        </div>
                    </div>
                    <hr className='lg:hidden' />
                    <div>
                        <h2 className="font-semibold lg:mb-2">Dirección de envío:</h2>
                        <hr className='hidden lg:block' />
                        <div className="lg:mt-2">
                            <span className="">{orderDetail?.shippment_direction?.name}</span>
                        </div>
                        <div>
                            <p className="text-gray-600">{`${orderDetail?.shippment_direction?.street} #${orderDetail?.shippment_direction?.no_ext}, ${orderDetail?.shippment_direction?.municipality?.name}, ${orderDetail?.shippment_direction?.state?.name}`}</p>
                        </div>
                    </div>
                </div>
                {
                    shippingDetail?.no_guide && (
                        <div>
                            <div className="text-sm md:text-base mb-10 mt-3 flex items-center">
                                <div className="w-6/12">
                                    <p className="font-semibold">Paquetería:</p>
                                    <p className="text-gray-600">{shippingDetail?.shipment_id?.name || 'No disponible'}</p>
                                </div>
                                <div className="w-6/12">
                                    <p className="font-bold">No. Guía:</p>
                                    <p className="text-gray-600">{shippingDetail?.no_guide || 'No disponible'}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="overflow-x-hidden">
                    <div className=" overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-white uppercase bg-[#333] dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Nombre
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Precio
                                    </th>
                                    {/* <th scope="col" className="py-3 px-6">
                                        Descuento
                                    </th> */}
                                    <th scope="col" className="py-3 px-6">
                                        Subtotal
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Total
                                    </th>
                                    <th scope="col" className="py-3 px-6">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products_list?.map((product) => (
                                        <tr className="cursor-pointer bg-white border-b hover:bg-gray-50" key={product._id}>
                                            <td scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
                                                <Image src={product.product?.multimedia[0]?.path} alt="" className="w-10 h-10 rounded-full" width="60" height="60" />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{product.product?.name}</div>
                                                    <div className="font-normal text-gray-500 truncate max-w-[200px]">{product.product.description}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {product.quantity > 1 ? `${product.quantity} pzas` : `${product.quantity} pza`}
                                            </td>
                                            <td className="py-4 px-6">
                                                {helpers.priceFormat(product.priceCurrency)}
                                            </td>
                                            {/* <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    {
                                                        discount > 0 ? ` -${discount}%` : `0%`
                                                    }
                                                </div>
                                            </td> */}
                                            <td className="py-4 px-6">
                                                <span className="font-semibold text-gray-600">{helpers.priceFormat(product.subtotalInCurrency)}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-semibold text-gray-600">{helpers.priceFormat(product.totalInCurrency)}</span>
                                            </td>
                                            {
                                                product.product.product_type === '2' && product.canvas_multimedia.length && !product.canvasStatus ? (
                                                    <td>
                                                        <span
                                                            className="bg-white w-6/12 flex items-center shadow-lg rounded-md hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleOpenUploadImages(product, orderDetail._id)}
                                                        >
                                                            <button className="bg-green-500 py-1 px-2 text-white rounded-l-md mr-1 text-xs h-full">Subir imagenes</button>
                                                            <VerticalAlignTopIcon className="text-xs text-green-500" />
                                                        </span>
                                                    </td>
                                                ): null
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div className="flex items-center mt-20">
                        <hr className="w-full h-0.5 bg-gray-200 mr-2" />
                        <p className="text-gray-700 font-semibold">Detalles</p>
                        <hr className="w-full h-0.5 bg-gray-200 ml-2" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="md:w-10/12 px-6 w-full  shadow-md">
                            <p className='text-center  text-lg font-medium'>Total de orden </p>
                            <span className='flex justify-between border-b-2 border-gray-2000 py-2'>
                                <p className='font-bold'>Tipo:</p>
                                <p>{`${orderDetail.type == 1
                                    ? 'Tarjeta' : ' Transferencia'}`}</p>
                            </span>
                            <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                <p className="font-bold">Subtotal:</p>
                                <p>{subtotal}</p>
                            </span>
                            {
                                orderDetail.coupon_id && (
                                    <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                        <p className="font-bold">Cupon:</p>
                                        <p>{`-${orderDetail.coupon_id.discount}%`}</p>
                                    </span>
                                )
                            }
                            <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                <p className="font-bold">Envío:</p>
                                <p>{shippment}</p>
                            </span>
                            <span className="flex justify-between py-2">
                                <p className="font-bold">Total:</p>
                                <p>{total}</p>
                            </span>
                        </div>
                        {
                            orderDetail.type == 2 && (
                                <div className='mt-10 lg:mt-0'>
                                    <p className='text-center text-lg font-medium'>Pagos</p>
                                    {payments?.map((payment) => (
                                        <Accordion key={payment._id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                Monto: {helpers.priceFormat(payment.amount)}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Zoom zoomMargin={45}>
                                                    <picture>
                                                        <source media="(max-width: 10px)" srcSet={payment.image} />
                                                        <img
                                                            src={payment.image}
                                                            alt={payment?.image}
                                                            className="min-w-[6rem] min-h-[6rem] h-[6rem] w-[6rem]"
                                                        />
                                                    </picture>
                                                </Zoom>
                                                {/* <Image
                                                    className='cursor-pointer'
                                                    src={payment.image}
                                                    alt="Comprobante"
                                                    width={200}
                                                    height={200}
                                                /> */}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
            <Modal
                showTitle={false}
                open={openUploadImages}
                handleOpenCheckout={toggleUploadImages}
                actions={false}
                fullWidth={true}
                maxWidth={'md'}
            >
                <UploadImages handleOpenUploadImages={handleOpenUploadImages} />
            </Modal>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        const isValid = await store.dispatch(startGetOrder(ctx.query.id, ctx.req.cookies.token));
        await store.dispatch(startLoadCurrencies());
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startGetOrder());
        if (!isValid) return { notFound: true };
    });

export default ShowOrder;