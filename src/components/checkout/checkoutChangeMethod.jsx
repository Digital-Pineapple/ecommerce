import { CircularProgress } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as ga from '../../libs/ga/index';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT);
export const CheckoutChangeMethod = ({ changemethod }) => {
    const { client_secret, orders, total, currency } = changemethod;
    const [loadingForm, setLoadingForm] = useState(false);
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


    return (
        <>
            <div className="flex justify-between mb-2 ">
                <p className="font-Poppins font-medium capitalize text-[#333] leading-6">Folio</p>
                <p className="font-Poppins font-medium capitalize text-[#333] leading-6">Total de venta</p>
            </div>
            {orders.map(order => <div className="flex justify-between mb-2 ">
                <span className="text-[#888] capitalize">{order.folio} </span>
                <span className="text-[#888] capitalize"> $ {order.total} {currency} </span>
            </div>)}
            {client_secret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                          loadingForm={loadingForm}
                          setLoadingForm={setLoadingForm}
                        />
                      </Elements>
                    )}

        </>



    )
}