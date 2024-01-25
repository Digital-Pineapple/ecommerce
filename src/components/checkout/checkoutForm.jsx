import { CircularProgress } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as ga from "../../libs/ga/index";
import useEscapeKey from "../../helpers/useEscapeKey";
export const CheckoutForm = ({ setLoadingForm, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isEscapeKeyPressed } = useEscapeKey();
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !isEscapeKeyPressed) {
      return;
    }

    const origin = typeof window === "undefined" ? "" : window.location.origin;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      tagManager: {},
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: origin + "/perfil/mis-pedidos",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-10">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          onReady={() => setLoadingForm(false)}
        />
        {message && <div id="payment-message">{message}</div>}
        <button
          type="submit"
          className="bg-[#333] text-luz py-[23px] px-[0px] w-full uppercase text-[15px] hover:bg-[#000] mt-5"
          disabled={isLoading || (!stripe && !elements)}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <CircularProgress className="mr-5" />
                <span> Espere un momento</span>
              </div>
            ) : (
              "Pagar Ahora"
            )}
          </span>
        </button>
      </form>
    </div>
  );
};
