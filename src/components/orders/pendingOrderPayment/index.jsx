import { IconContext } from "react-icons";
import {MdOutlineFileUpload} from "react-icons/md";
import { helpers } from "../../../helpers";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { OrderProductsList } from "./orderProductsList";
import moment from "moment";
import {AiFillCaretDown} from "react-icons/ai";
import { useToggle } from "../../../hooks/useToggle";
import { Modal } from "../../ui/modal";
import { useDispatch } from "react-redux";
import { startOrderCancel } from "../../../actions/ordersActions";
import { Grid } from "@mui/material";

export const PendingPaymentOrderIndex = ({order , handleOpenProofOfPayment , status ,text_description ,  text_color}) =>{
   
    const dispatch = useDispatch();
    const total =  helpers.priceFormat(order.total);
    const date = moment(order.createdAt).format('L');
    const [ open , toggle ] = useToggle();

    const handleClickAddress = () =>{
       toggle();
    }

    const handleCancelOrder = () =>{
      dispatch(startOrderCancel(order._id));
    }

    return(
     <div className="mb-6 border border-solid border-[#D5D9D9]  rounded-t-[6px]">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
           <div className="bg-[#eee] flex p-6">
            <div className="w-1/2 font-Poppins">
            <span className="uppercase text-sm leading-6 text-[#333]">
                Pedido realizado
            </span>
            <p className="text-sm text-[#888]">
               {date}
            </p>
          </div>
          <div className="w-1/3 text-center font-Poppins">
           <span className="uppercase text-sm leading-6 text-[#333]">
               Total
           </span>
            <p className="text-sm text-[#888]">
                {total}
            </p>
          </div>
          <div className="w-1/3 text-center font-Poppins cursor-pointer h-full"
          onClick={()=>handleClickAddress()}
          >
           <span className="uppercase text-sm leading-6 text-[#333]">
            Enviar a:
           </span>
           <span className="text-sm text-center text-[#1976d2] cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all flex items-center justify-center"
           >
           {order?.shippment_direction?.name}
            <AiFillCaretDown/>
           </span> 
          </div>
           </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="font-Poppins text-center bg-[#eee] p-6 flex flex-wrap justify-center">
              <span className="text-sm text-[#333]">Pedido N.º {order._id}</span>
              <div className="w-full mr-6 text-[#1976d2]">
               <span className="text-sm  cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all mr-5">Ver detalle del Pedido</span> 
               <span className="text-sm cursor-pointer hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all">Ver recibo</span>    
              </div>  
            </div>
          </Grid>
        </Grid>
    <Grid container spacing={5}>
    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
      <div className="flex items-center w-full h-full px-10">
        <h3 className={`font-Poppins text-lg leading-6 ${text_color}`}>
          {text_description}
        </h3>
      </div>
    </Grid>
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
      <div className="flex justify-center  md:justify-start items-center h-3/4 w-full pr-10">
    {
           status === 0 &&
            <button className="bg-[#FFD814] font-Poppins text-[#333] py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full"
                onClick={()=>handleOpenProofOfPayment(order._id)}
              >
                <IconContext.Provider value={{className:"color-[#fff] , text-[20px] , mr-[10px]"}}>
                  <MdOutlineFileUpload/>
                </IconContext.Provider>
                <span>Comprobante de pago</span> 
              </button>
         }
      </div>
    </Grid>
    </Grid>
    <div className="border-x border-b border-solid border-[#D5D9D9] py-3 px-10">
     <div className="w-full flex ">
         <Swiper
          pagination={{clickable:true}}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          navigation={false}
          loop={false}
          className="mySwiper w-full"
          modules={[Pagination, Autoplay , Navigation]}
           
         >
         {
             order.products_list.map((product , index)=>(
               <SwiperSlide key={product.product_id}>
                <OrderProductsList
                  product={product}
                  status={status}
                  index={index}
                  handleCancelOrder={handleCancelOrder}
                />
              </SwiperSlide>
             ))
         }
         </Swiper>
     </div>
    </div>
    <Modal
     title="Dirección de envio"
     open={open}
     handleOpenCheckout={handleClickAddress}
     actions={false}
     fullWidth={true}
     maxWidth={'sm'}
    >
      <div className="flex justify-between mb-2 ">
        <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Calle</p>
        <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.street}</span>
      </div>
      <div className="flex justify-between mb-2 ">
        <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Entre Calle y Calle</p>
        <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.between_street}</span>
      </div>
      <div className="flex justify-between mb-2 ">
        <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">
          Código
        </p>
        <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.postalcode}</span>
      </div>
      <div className="flex justify-between mb-2 ">
        <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Ciudad</p>
        <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.city}</span>
      </div>
      <div className="flex justify-between mb-2 ">
        <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Referencia</p>
        <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.references}</span>
      </div>  
    </Modal>
    </div>
    )
}