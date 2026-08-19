import React from "react";
import "./Checkout.css";
import { CheackoutHeader } from "./CheckoutHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { PaymentSummery } from "./Payment";
import { OrderSummary } from "./OrderSummary";

export function Checkout({ cartItem, loadCart }) {
  const [paymentSummery, setPaymentSummery] = useState(null);

  useEffect(()=>{
    const fetchPaymentData = async()=>{
      const res = await axios.get("/api/payment-summary");
      setPaymentSummery(res.data);
    }
    fetchPaymentData();
  },[cartItem]);

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };
    fetchData();
  }, [cartItem]);

  if (!paymentSummery) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CheackoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cartItem={cartItem}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummery paymentSummery={paymentSummery} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default Checkout;
