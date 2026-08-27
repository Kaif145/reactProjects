import React, { useState } from "react";
import moneyGenrator from "../../utiles/money";
import { DeliveryOptions } from "./DeliveryOptions";
import dayjs from "dayjs";
import axios from "axios";

export function CartItemDetails({ cart, deliveryOptions, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cart.quantity);

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cart.deliveryOptionId;
  });

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cart.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cart.productId}`, {
      quantity: Number(quantity),
    });

    await loadCart();

    setIsUpdatingQuantity(false);
  };
  return (
    <div className="cart-item-container">
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
              {isUpdatingQuantity ? (
                <input
                  className="quantity-box"
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              ) : (
                <span className="quantity-label">{cart.quantity}</span>
              )}
            </span>

            <span
              className="update-quantity-link link-primary"
              onClick={() => {
                if (isUpdatingQuantity) {
                  updateQuantity();
                } else {
                  setIsUpdatingQuantity(true);
                }
              }}
            >
              Update
            </span>

            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
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
}
