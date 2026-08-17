import React from "react";
import moneyGenrator from "../../utiles/money";
import { DeliveryOptions } from "./DeliveryOptions";
import dayjs from "dayjs";
export function OrderSummary({ cartItem, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cartItem.map((cart) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cart.deliveryOptionId;
            },
          );
          return (
            <div key={cart.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM, D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cart.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cart.product.name}</div>
                  <div className="product-price">
                    {moneyGenrator(cart.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{cart.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  cart={cart}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
