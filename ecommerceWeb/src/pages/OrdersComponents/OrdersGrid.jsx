import { moneyGenrator } from "../../utiles/money";
import React, { Fragment } from "react";

import dayjs from "dayjs";

export function OrdersGrid({ orderItems }) {
  return (
    <div className="orders-grid">
      {orderItems.map((addedItem) => (
        <div key={addedItem.id} className="order-container">
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(addedItem.orderTimeMs).format("MMMM, D")}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>
                  {typeof moneyGenrator === "function"
                    ? moneyGenrator(addedItem.totalCostCents)
                    : addedItem.totalCostCents}
                </div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{addedItem.id}</div>
            </div>
          </div>

          <div className="order-details-grid">
            {Array.isArray(addedItem.products) &&
              addedItem.products.map((productItems) => (
                <Fragment key={productItems.id}>
                  <div className="product-image-container">
                    <img
                      src={
                        productItems.image ||
                        "images/products/athletic-cotton-socks-6-pairs.jpg"
                      }
                      alt={productItems.name}
                    />
                  </div>

                  <div className="product-details">
                    <div className="product-name">{productItems.name}</div>
                    <div className="product-delivery-date">
                      {dayjs(productItems.estimatedDeliveryTimeMs).format(
                        "MMMM D",
                      )}
                    </div>
                    <div className="product-quantity">
                      Quantity: {productItems.quantity}
                    </div>
                    <button className="buy-again-button button-primary">
                      <img
                        className="buy-again-icon"
                        src={productItems.image}
                        alt=""
                      />
                      <span className="buy-again-message">Add to Cart</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <a href="tracking">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </a>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersGrid;
