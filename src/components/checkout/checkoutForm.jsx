import { CircularProgress, TextField } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as ga from "../../libs/ga/index";
import useEscapeKey from "../../helpers/useEscapeKey";
import { startSaveHeadlineCard } from "../../actions/checkoutActions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
export const CheckoutForm = ({ setLoadingForm, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headlineCard, setHeadlineCard] = useState(null);
  const handleChangeHeadLine = (e) => {
    setHeadlineCard(e.target.value);
  };
  localStorage.setItem("card_name", headlineCard);
  const token = Cookies.get("token");
  const currency = Cookies.get("Currency") || "MXN";
  const inputRef = useRef(null);
  useEffect(() => {
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
    if (headlineCard !== null) {
      await dispatch(startSaveHeadlineCard(headlineCard, token, currency));
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
  /**Para darle los stilos parecidos al los elementos de stripe en el input titular */
  useEffect(() => {
    const input = inputRef.current;

    const handleFocus = () => {
      input.style.borderColor = "#e91e63";
      input.style.boxShadow = "0 0 0 0.2rem rgba(233, 30, 99, 0.25)";
      input.style.outline = "none";
      input.placeholder = "Ferran Torres Martinez";
    };

    const handleBlur = () => {
      if (!input.value) {
        input.style.borderColor = "transparent";
        input.style.boxShadow = "none";
        input.placeholder = "Titular de la tarjeta";
      }
    };

    if (input) {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
      // Check input value on mount
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <div className="mt-10">
      {/**Este input se agrego para guardar el nombre del titular de la tarjeta */}
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="card_title"
            required
            ref={inputRef}
            onChange={handleChangeHeadLine}
            placeholder="Titular de la tarjeta"
            style={{
              backgroundColor: "#F6F8FA",
              padding: "15px",
              marginBottom: "5px",
              width: "100%",
              border: "0.5px solid transparent",
              borderRadius: "4px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            aria-label="Titular de tarjeta"
            name="headline_card"
          />
        </div>
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
