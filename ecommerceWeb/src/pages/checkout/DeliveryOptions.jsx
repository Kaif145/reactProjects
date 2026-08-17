import React from "react";
import moneyGenrator from "../../utiles/money";
import dayjs from "dayjs";
import axios from "axios";
export function DeliveryOptions({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "Free Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${moneyGenrator(deliveryOption.priceCents)} - Shipping`;
        }

        const updateDeiveryOption = async () => {
          await axios.put(`/api/cart-items/${cart.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });
          await loadCart();
        };
        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeiveryOption}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cart.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cart.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM, D",
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
