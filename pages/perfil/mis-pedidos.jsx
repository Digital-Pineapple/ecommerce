import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../../src/store';

// actions
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { startLoadFiscalAddress } from "../../src/actions/profileActions";
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { selectedOrderPendding, startLoadOrdersCanceled, startLoadPendingOrders ,startLoadOrdersApproved , startLoadOrdersShipped , shippedOrders} from "../../src/actions/ordersActions";

{/** Custom Hooks */}
import { useToggle } from "../../src/hooks/useToggle";

{/* Components import */}
import Layout from '../../src/components/Layouts'
import { Modal } from "../../src/components/ui/modal";
import { BannerImage } from '../../src/components/ui/bannerImage';
import { UploadProofOfPayment } from "../../src/components/checkout/uploadProofOfPayment";
import {PendingPaymentOrderIndex} from "../../src/components/orders/pendingOrderPayment"
import { NotFoundOrders } from "../../src/components/orders/notFoundOrders";


import { Breadcrumbs, Grid,  Rating,  TextareaAutosize,  Typography , Tabs , Tab ,Box} from "@mui/material";
import Cookies from 'js-cookie';

import { customIcons } from "../../src/staticData/customIcons";
import { tabsData } from "../../src/staticData/ordersTabsData";

{/**Helpers */}
import helpersProducts from "../../src/helpers/helpersProducts";


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
         <div className="pt-10 mt-5 w-full">
             {children}
         </div>
        )}
      </div>
    );
  }
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  
const MisPedidos = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { penddingOrders , canceledOrders , approvedOrders ,  shippedOrders} = useSelector((state)=>state.orders)

    const { categories } = useSelector((state) => state.faqs)


    const [valueTab , setValueTab ] = useState(0);
    const [ testimonialModal , setTestimonialModal  ] = useState(false);
    const [ openProofOfPayment , toggleProofOfPayment] = useToggle();

    const { filterSearch } = helpersProducts;


    const filterOrdersByDate = ({ target }) => {
        const date = target.value;
        filterSearch({ router, date });
    }

    const handleClickOrder = (order) => {
        setOpenProductDetail(true);
        setOrder(order)
    }

    const handleChangeTab = (event , newValue) =>{
        setValueTab(newValue);
    }

    const handleOpenProofOfPayment = (order_id) =>{
        toggleProofOfPayment();
        if(order_id){
           dispatch(selectedOrderPendding(order_id));
        }
       
    }

    const handleCloseTestimonialArea = () =>{
      setTestimonialModal(false);
      Cookies.set('modalTestimonialOpen',false);
    }

    useEffect(() => {
      const modalTestimonialOpen =  Cookies.get('modalTestimonialOpen');
      if(modalTestimonialOpen && modalTestimonialOpen === "false"){
        setTestimonialModal(false);
        return;
      }
    }, []);

    useEffect(() => {
      const modalTestimonialOpen =  Cookies.get('modalTestimonialOpen');
      if(approvedOrders.length > 0 && !modalTestimonialOpen ){
        setTestimonialModal(true);
        return;
      }
    }, []);

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mis Pedidos"
            />

            <section className="container max-w-[1200px] my-10 mx-auto min-h-screen">
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Breadcrumbs aria-label="breadcrumb" className="px-6">
                    <Link  underline="hover" color="inherit" href="/">
                      Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/perfil" className="">
                      Perfil
                    </Link>
                    <Typography color="text.primary">Mis Pedidos</Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
             <Box sx={{width:'100%',marginTop:'20px'}}>
              <Box sx={{borderBottom:1 , borderColor:'divider'}}>
                <Tabs 
                  value={valueTab} 
                  onChange={handleChangeTab}
                  aria-label="basic example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                 {tabsData.map((tabData, index) => (
                    <Tab 
                     key={tabData._id}
                     label={tabData.name}
                     {...a11yProps(index)}
                     className="font-Poppins text-medium leading-[1.9]"
                    />
                  )
                 )}
                </Tabs>
              </Box>
              <TabPanel value={valueTab} index={0}>
                  {
                    !penddingOrders.length ? 
                      <NotFoundOrders
                         text="No cuentas con ordenes pendientes"
                        
                      />
                    :
                    penddingOrders.map(order=>(
                        <PendingPaymentOrderIndex
                          key={order._id}
                          order={order}
                          handleOpenProofOfPayment={handleOpenProofOfPayment}
                          openProofOfPayment={openProofOfPayment}
                          status={0}
                          text_description=" Pedido Pendiente de Pago"
                          text_color="text-[#333]"
                        />
                    ))
                  }
                
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                  {
                    !canceledOrders.length ? 
                      <NotFoundOrders
                        text="No cuentas con ordenes canceladas"
                      />
                    :
                    canceledOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={1}
                        text_description="Pedido Cancelado"
                        text_color="text-[#333]"
                      />
                    ))
                  }
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                   {
                     !approvedOrders.length ?
                      <NotFoundOrders
                        text="No cuentas con ordenes aprobadas"
                      />
                     :
                     approvedOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={2}
                        text_description="Pedido Aprobado"
                        text_color="text-[#333]"
                      />
                     ))

                   }
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                  {
                    !shippedOrders.length ? 
                    <NotFoundOrders
                    text="No cuentas con ordenes enviadas"
                    />
                     :
                     shippedOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={3}
                        text_description="Pedido Enviado"
                        text_color="text-[#333]"
                      />
                     ))
                  }
              </TabPanel>
             </Box>
               {/* modal comprobante de pago */}
                <Modal
                title="Sube tu comprobante de pago"
                open={openProofOfPayment}
                handleOpenCheckout={handleOpenProofOfPayment}
                actions={false}
                fullWidth={true}
                maxWidth={'xs'}
                >
                <UploadProofOfPayment
                    handleOpenProofOfPayment={handleOpenProofOfPayment}
                />
                </Modal>
                
                {/* modal reseña */}
                
                <Modal
                  open={testimonialModal}
                  handleOpenCheckout={handleCloseTestimonialArea}
                  fullWidth={true}
                  maxWidth="sm"
                  actions={false}
                  showTitle={false}

                >
                  <Grid container>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="w-full flex justify-center flex-col ">
                      <Typography variant="h3" className="leading-6 mb-7 text-center text-2xl font-Poppins text-[#333]">
                        ¿Qué tal te parecio nuestro servicio? 
                      </Typography>
                      <Typography variant="h4" className="leading-6 mb-7 text-center text-2xl font-Poppins text-[#888]">
                          Déjanos tu reseña
                      </Typography>
                      </div>
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="flex justify-center mt-2">
                        <Rating
                         name="rating"
                         defaultValue={4}
                         IconContainerComponent={IconContainer}
                         highlightSelectedOnly
                        />
                      </div>
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                       <div className="w-full mt-5">
                       <TextareaAutosize
                         placeholder="Ingresa tu comentario"
                         style={{width:'100%'}}
                         minRows={6}
                         className="p-5 border-[1px] border-solid border-[#888]"
                       />
                       </div>
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                       <div className="w-full flex justify-center mt-5">
                         <button 
                           className="bg-primary text-secondary py-3 px-16 mr-5"
                           onClick={handleCloseTestimonialArea}
                         >
                           Cancelar
                         </button>
                         <button className="bg-primary text-secondary py-3 px-16 ml-5">Enviar</button>
                       </div>
                     </Grid>
                  </Grid>
                  
                </Modal>
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
        await store.dispatch(startLoadPendingOrders(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersCanceled(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersApproved(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersShipped(ctx.req.cookies.token));
        await store.dispatch(startLoadFiscalAddress(ctx.req.cookies.token));
})

export default MisPedidos