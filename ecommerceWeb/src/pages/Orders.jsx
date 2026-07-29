import React from "react";
import "./Orders.css";
import dayjs from "dayjs";
import { moneyGenrator } from "../utiles/money";
import { Header } from "../component/Header";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
export function Order({ cartItem }) {
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders?expand=products");
        console.log(response);
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Header cartItem={cartItem} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orderItems.map((addedItem) => {
            return (
              <div key={orderItems.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {dayjs(addedItem.orderTimeMs).format("MMMM, D")}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{moneyGenrator(addedItem.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{addedItem.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {addedItem.products.map((productItems) => {
                    return (
                      <Fragment key={productItems.id}>
                        <div className="product-image-container">
                          <img src="images/products/athletic-cotton-socks-6-pairs.jpg" />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {productItems.name}
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
                              src={productItems.image}
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Order;
