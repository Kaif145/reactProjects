import React from "react";
import "./Checkout.css";
import { CheackoutHeader } from "./CheckoutHeader";
import { moneyGenrator } from "../../utiles/money";
import axios from "axios";
import { useState, useEffect } from "react";

import { OrderSummary } from "./OrderSummary";

export function Checkout({ cartItem, loadCart }) {
  const [paymentSummery, setPaymentSummery] = useState(null);

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      const res = await axios.get("/api/payment-summary");

      setPaymentSummery(res.data);
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

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummery && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummery.totalItems})</div>
                  <div className="payment-summary-money">
                    {moneyGenrator(paymentSummery.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {moneyGenrator(paymentSummery.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {moneyGenrator(paymentSummery.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {moneyGenrator(paymentSummery.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {moneyGenrator(paymentSummery.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
