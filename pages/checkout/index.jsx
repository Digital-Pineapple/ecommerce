import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { loadTotalsFromCookies } from "../../src/actions/shoppingCartActions";
import Cookie from 'js-cookie';
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";
import { OrderInfo } from "../../src/components/checkout/orderInfo";
import { CheckoutForm } from "../../src/components/checkout/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToggle } from "../../src/hooks/useToggle";
import { Modal } from "../../src/components/ui/modal";
import { startfinaliceTransferCheckout, startLoadBanksAccounts, startLoadClientSecret } from "../../src/actions/checkoutActions";
import { CheckoutTransfer } from "../../src/components/checkout/checkoutTransfer";
import { ShoppingCartDetails } from "../../src/components/checkout/shoppingCartDetails";
import { useRouter } from "next/router";
import LoadingScreen from "../../src/components/LoadingScreen";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { startLoadCurrencies } from "../../src/actions/countryAcctions";

import styles from '../../src/components/styles.module.css'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT);

const Checkout = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { superTotal} = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const { dimensions } = useSelector((state) => state.ui);
  const { client_secret, bankAccountSelected, success} = useSelector((state) => state.checkout);
  const [isTransfer, setIsTransfer] = useState(false);
  const [openTransfer, toggleTransfer] = useToggle();
  const [loadingForm, setLoadingForm] = useState(false);

  const handleOpenTransfer = () => {
    toggleTransfer();
  }

  useEffect(() => {
    setLoadingForm(true);
    handleClickPaymentStripe();
  }, [])

  useEffect(() => {
    if (bankAccountSelected) {
      setIsTransfer(true);
    } else {
      setIsTransfer(false);
    }
  }, [bankAccountSelected]);


  useEffect(() => {
    if (success) {
      router.push({ pathname: '/perfil/mis-pedidos', query: { successTransfer: true } })
      Cookie.remove('superTotal');
      Cookie.remove('withDiscount');
      Cookie.remove('withoutDiscount');
      Cookie.remove('shippingCosts');
      Cookie.remove('order_id');
      localStorage.removeItem('cart')
    }
  }, [success]);

  useEffect(() => {
    if (!Object.keys(superTotal).length) {
      const superTotal = Cookie.get('superTotal') ? JSON.parse(Cookie.get('superTotal')) : {};
      const withDiscount = Cookie.get('withDiscount') ? JSON.parse(Cookie.get('withDiscount')) : {};
      const withoutDiscount = Cookie.get('withoutDiscount') ? JSON.parse(Cookie.get('withoutDiscount')) : {};
      const shippingCosts = Cookie.get('shippingCosts') ? JSON.parse(Cookie.get('shippingCosts')) : {};
      const order_id = Cookie.get('order_id') ? JSON.parse(Cookie.get('order_id')) : ''
      const canvasTotals = Cookie.get('canvasTotals') ? JSON.parse(Cookie.get('canvasTotals')) : ''
      const business_rule = Cookie.get('business_rule') ? JSON.parse(Cookie.get('business_rule')) : ''
      const coupon = Cookie.get('coupon') ? JSON.parse(Cookie.get('coupon')) : ''

      dispatch(loadTotalsFromCookies(superTotal,
        withDiscount,
        withoutDiscount,
        shippingCosts,
        order_id,
        canvasTotals,
        business_rule,
        coupon,
      ));

    }
  }, []);

  const appearance = {
    labels: 'floating',
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '3px',
      colorBackground: '#F6F8FA',
      colorPrimaryText: '#262626'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input:focus': {
        padding: '12px',
        border: '1px solid #e91e63',
        boxShadow: '-4px 1px 31px -14px rgba(233,30,99,0.59)'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: '#a31545'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  };

  const options = {
    clientSecret: client_secret,
    appearance
  }

  const handleClickPaymentStripe = async () => {

    const token = await Cookie.get('token') || '';

    await dispatch(startLoadClientSecret(token));

  }

  return (
    <Layout>
      {
        loadingForm && (<LoadingScreen />)
      }
      <BannerImage
        title="Realizar Pago"
        banner="bg-banner4"
      />
      <section className="max-w-[1480px] mx-auto my-20 px-2 md:px-[15px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12  md:my-10">
          <div className={`col-span-12 md:col-span-7 md:mx-4 overflow-y-auto ${dimensions === 'sm' && styles.scrollbar}`}>
            <ShoppingCartDetails />
          </div>
          <div className=" col-span-12 lg:col-span-5 xl:col-span-5">
            <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] mb-10 text-center">
              Detalle de la órden
            </h3>
            <div className="w-full mb-[20px] block">
              <OrderInfo />
            </div>
            {
              isTransfer ?
                <div>
                  <button className="bg-[#008cdd] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#1e90ff] mt-5 flex items-center justify-center"
                    onClick={() => handleOpenProofOfPayment()}
                  >
                    <ImportExportIcon
                      className="color-[#fff] text-[40px] mr-[30px]"
                    />
                    <span>Comprobante de pago</span>
                  </button>
                </div>

                :
                <div>
                  <div>
                    {client_secret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                          loadingForm={loadingForm}
                          cart={ cart}
                          setLoadingForm={setLoadingForm}
                        />
                      </Elements>
                    )}
                  </div>
                  <button className="bg-[#fb8c00] text-luz py-[23px] px-[20px] w-full uppercase text-[15px] hover:bg-[#e65100] mt-5 flex items-center justify-center"
                    onClick={() => handleOpenTransfer()}
                  >
                    <span>Pago por transferencia</span>
                  </button>
                </div>
            }

            {/* modal pago por transferencia */}
            <Modal
              title="Pago Por Transferencia"
              open={openTransfer}
              handleOpenCheckout={handleOpenTransfer}
              actions={false}
              fullWidth={true}
              maxWidth={'xs'}
            >
              <CheckoutTransfer 
                setLoadingForm = {setLoadingForm}
                handleOpenTransfer={handleOpenTransfer} 
                cart={ cart}
              />

            </Modal>
          </div>
        </div>
      </section>
    </Layout >
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadBanksAccounts());
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startfinaliceTransferCheckout());
});

export default Checkout
