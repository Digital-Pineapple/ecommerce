import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../../../src/store';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// actions
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";

import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions';
import { selectedOrderPendding, startLoadOrdersCanceled, startLoadPendingOrders, startLoadOrdersApproved, startLoadOrdersShipped, 
  shippedOrders, loadProductDetail, getOrderId } from "../../../src/actions/ordersActions";

{/** Custom Hooks */ }
import { useToggle } from "../../../src/hooks/useToggle";

{/* Components import */ }
import Layout from '../../../src/components/Layouts'
import { Modal } from "../../../src/components/ui/modal";
import { BannerImage } from '../../../src/components/ui/bannerImage';
import { UploadProofOfPayment } from "../../../src/components/checkout/uploadProofOfPayment";
import { PendingPaymentOrderIndex } from "../../../src/components/orders/pendingOrderPayment"
import { NotFoundOrders } from "../../../src/components/orders/notFoundOrders";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { Breadcrumbs, Grid, Rating, TextareaAutosize, Typography, Tabs, Tab, Box } from "@mui/material";
import Cookies from 'js-cookie';

import { customIcons } from "../../../src/staticData/customIcons";
import { tabsData } from "../../../src/staticData/ordersTabsData";

{/**Helpers */ }
import helpersProducts from "../../../src/helpers/helpersProducts";
import { startSendReview } from "../../../src/actions/reviewsActions";
import FormCancelInvoice from "../../../src/components/orders/pendingOrderPayment/FormCancelInvoice";
import LoadingScreen from "../../../src/components/LoadingScreen";
import ProductDetail from "../../../src/components/orders/ProductDetail";
import UploadImages from "../../../src/components/orders/UploadImages";
import { startLoadCurrencies } from "../../../src/actions/countryAcctions";
import { startLoadFiscalAddress } from "../../../src/actions/profileActions";


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
  const { penddingOrders, canceledOrders, approvedOrders, shippedOrders, success } = useSelector((state) => state.orders);

  const { categories } = useSelector((state) => state.faqs)

  const reloadData = async () => {
    const token = Cookies.get('token')
    await dispatch(startLoadOrdersApproved(token));
    await dispatch(startLoadOrdersShipped(token));
  }

  useEffect(() => {
    if (success) {
      reloadData();
    }
  }, [success]);

  useEffect(() => {
    if (router.query.redirect_status === 'succeeded' || router.query.successTransfer === 'true') {
      Cookies.remove("client_secret");
      Swal.fire({
        icon: "success",  
        title: "Venta finalizada con éxito",
        text: "Te invitamos a leer nuestras políticas de privacidad, para cualquier duda o aclaración.",
        confirmButtonText: "Cerrar",
        cancelButtonColor: "#1565c0",
        allowOutsideClick: false,
      }).then(() => {
        router.push(
          {
            pathname: router.path,
          },
          undefined,
          { shallow: true },
        );
      });
    }
  }, []);


  const [valueTab, setValueTab] = useState(0);
  const [testimonialModal, setTestimonialModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openProofOfPayment, toggleProofOfPayment] = useToggle();
  const [openCancelInvoice, toggleCancelInvoice] = useToggle();
  const [openProductDetail, toggleProductDetail] = useToggle();
  const [openUploadImages, toggleUploadImages] = useToggle();

  const { filterSearch } = helpersProducts;

  const initialValues = {
    qualification: 4,
    review: '',
  }

  const validationSchema = {
    review: Yup.string().required("La reseña es requerida"),
  }

  const handleSendReview = async (formData) => {
    await startSendReview(formData);
    handleCloseTestimonialArea();
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {
      handleSendReview(formData);
    }
  });

  const handleCancelInvoice = (id = '1') => {
    toggleCancelInvoice();
  }

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  }

  const handleOpenProofOfPayment = (order_id, total, totalPayments) => {
    toggleProofOfPayment();
    if (order_id && total) {
      dispatch(selectedOrderPendding(order_id, total, totalPayments));
    }

  }

  const handleCloseTestimonialArea = () => {
    setTestimonialModal(false);
    Cookies.set('modalTestimonialOpen', false);
  }

  useEffect(() => {
    const modalTestimonialOpen = Cookies.get('modalTestimonialOpen');
    if (modalTestimonialOpen && modalTestimonialOpen === "false") {
      setTestimonialModal(false);
    }
  }, []);

  useEffect(() => {
    const modalTestimonialOpen = Cookies.get('modalTestimonialOpen');
    if (approvedOrders.length > 0 && !modalTestimonialOpen) {
      setTestimonialModal(true);
      return;
    }
  }, []);

  const handleOpenProductDetail = (product) => {
    toggleProductDetail();
    dispatch(loadProductDetail(product))
  }

  const handleOpenUploadImages = (product, order_id) => {
    toggleUploadImages();
    dispatch(loadProductDetail(product))
    dispatch(getOrderId(order_id))
  }

  return (
    <Layout
      categories={categories}
    >
      <BannerImage
        title="Mis Pedidos"
        banner="bg-banner14"
      />
      {loading && <LoadingScreen />}
      <section className="container max-w-[1200px] my-10 mx-auto min-h-screen">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Breadcrumbs aria-label="breadcrumb" className="px-6">
              <Link underline="hover" color="inherit" href="/">
                Inicio
              </Link>
              <Link underline="hover" color="inherit" href="/perfil" className="">
                Perfil
              </Link>
              <Typography color="text.primary">Mis Pedidos</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
              !shippedOrders.length ?
                <NotFoundOrders
                  text="No cuentas con ordenes enviadas"
                />
                :
                shippedOrders.map(order => (
                  <PendingPaymentOrderIndex
                    key={order._id}
                    order={order}
                    status={3}
                    text_description="Pedido Enviado"
                    text_color="text-[#333]"
                    loading={loading}
                    setLoading={setLoading}
                    handleOpenProductDetail={handleOpenProductDetail}
                    handleOpenUploadImages={handleOpenUploadImages}
                  />
                ))
            }
          </TabPanel>
          <TabPanel value={valueTab} index={1}>
            {
              !approvedOrders.length ?
                <NotFoundOrders
                  text="No cuentas con ordenes aprobadas"
                />
                :
                approvedOrders.map(order => (
                  <PendingPaymentOrderIndex
                    key={order._id}
                    order={order}
                    status={2}
                    handleCancelInvoice={handleCancelInvoice}
                    text_description="Pedido Aprobado"
                    text_color="text-[#333]"
                    loading={loading}
                    setLoading={setLoading}
                    handleOpenProductDetail={handleOpenProductDetail}
                    handleOpenUploadImages={handleOpenUploadImages}
                  />
                ))

            }
          </TabPanel>
          <TabPanel value={valueTab} index={2}>
            {
              !penddingOrders.length ?
                <NotFoundOrders
                  text="No cuentas con ordenes pendientes"

                />
                :
                penddingOrders.map(order => (
                  <PendingPaymentOrderIndex
                    key={order._id}
                    order={order}
                    handleOpenProofOfPayment={handleOpenProofOfPayment}
                    openProofOfPayment={openProofOfPayment}
                    status={0}
                    text_description=" Pedido Pendiente de Pago"
                    text_color="text-[#333]"
                    loading={loading}
                    setLoading={setLoading}
                    handleOpenProductDetail={handleOpenProductDetail}
                    handleOpenUploadImages={handleOpenUploadImages}
                  />
                ))
            }

          </TabPanel>
          <TabPanel value={valueTab} index={3}>
            {
              !canceledOrders.length ?
                <NotFoundOrders
                  text="No cuentas con ordenes canceladas"
                />
                :
                canceledOrders.map(order => (
                  <PendingPaymentOrderIndex
                    key={order._id}
                    order={order}
                    status={1}
                    text_description="Pedido Cancelado"
                    text_color="text-[#333]"
                    loading={loading}
                    setLoading={setLoading}
                    handleOpenProductDetail={handleOpenProductDetail}
                    handleOpenUploadImages={handleOpenUploadImages}
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
            setLoading={setLoading}
          />
        </Modal>

        {/* modal reseña */}

        <Modal
          title="Cancelar Factura"
          open={openCancelInvoice}
          handleOpenCheckout={toggleCancelInvoice}
          actions={false}
          fullWidth={true}
          maxWidth={'xs'}
        >
          <FormCancelInvoice />
        </Modal>

        <Modal
          title="Detalle del producto"
          open={openProductDetail}
          handleOpenCheckout={toggleProductDetail}
          actions={false}
          fullWidth={true}
          maxWidth={'md'}
          showTitle={false}
        >
          <ProductDetail />
        </Modal>

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

        <Modal
          open={testimonialModal}
          handleOpenCheckout={handleCloseTestimonialArea}
          fullWidth={true}
          maxWidth="sm"
          actions={false}
          showTitle={false}
        >
          <Grid container>
            <form onSubmit={formik.handleSubmit} className="w-full">
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
                    name="qualification"
                    defaultValue={4}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    onChange={formik.handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="w-full mt-5">
                  <TextareaAutosize
                    placeholder="Ingresa tu comentario"
                    style={{ width: '100%' }}
                    minRows={6}
                    name="review"
                    onChange={formik.handleChange}
                    className="p-5 border-[1px] border-solid border-[#888]"
                  />
                  {formik.touched.review && formik.errors.review ? (
                    <span className="text-red-500 text-sm">{formik.errors.review}</span>
                  ) : null}
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
                  <button
                    className="bg-primary text-secondary py-3 px-16 ml-5"
                    type="submit"
                  >
                    Enviar
                  </button>
                </div>
              </Grid>
            </form>
          </Grid>
        </Modal>
      </section>
    </Layout>
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
    await store.dispatch(startLoadCurrencies());
  })

export default MisPedidos