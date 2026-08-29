import { moneyGenrator } from "../../utiles/money";
import React, { Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
export function OrdersGrid({ orderItems, loadCart }) {
  const addImtesOrderToCart = async (productItem) => {
    await axios.post("/api/cart-items", {
      productId: productItem.id,
      quantity: 1,
    });
    await loadCart();
  };

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
                        productItems.product?.image ||
                        "images/products/athletic-cotton-socks-6-pairs.jpg"
                      }
                      alt={productItems.product?.name || "Ordered product"}
                    />
                  </div>

                  <div className="product-details">
                    <div className="product-name">
                      {productItems.product?.name}
                    </div>
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
                        src={productItems.product?.image}
                        alt=""
                      />
                      <span
                        className="buy-again-message"
                        onClick={() => {
                          addImtesOrderToCart(productItems.product);
                        }}
                      >
                        Add to Cart
                      </span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <NavLink to="/tracking">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </NavLink>
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
