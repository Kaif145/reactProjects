import React from "react";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({
  cartItem,
  deliveryOptions,
  loadCart,
}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cartItem.map((cart) => {
          return (
            <CartItemDetails
              key={cart.productId}
              cart={cart}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          );
        })}
    </div>
  );
}