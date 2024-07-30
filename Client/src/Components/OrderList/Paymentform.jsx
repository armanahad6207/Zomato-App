// File: PaymentForm.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51PUpG402Ca2xbOBVTrgeh2jcb6O5GmaHsmG6P1Uh4vQI9r2iuwt9YUWKZR8t4eO0WFoPcHjg1gDcVUqxBPXHUJTA00EiUQ1o6j"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        address: {
          postal_code: postalCode,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;

    try {
      const response = await axios.post("http://localhost:3000/api/payment", {
        id,
        amount: 1e3, // Example amount in cents
      });

      const { clientSecret } = response.data;

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
          },
        }
      );

      if (confirmError) {
        setError("request failed");
        setLoading(false);
        return;
      }

      setSuccess("Payment succeeded!");
      setLoading(false);
    } catch (error) {
      setError("request failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <CardElement
            className="p-2 border border-gray-300 rounded"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripeWrapper;
