import React from "react";
import "./Orders.css";
import { Header } from "../../component/Header";

import { Fragment } from "react";
import { OrdersGrid } from "./OrdersGrid";

export function Order({ cartItem, orderItems,loadCart }) {
  return (
    <>
      <Header cartItem={cartItem} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orderItems={orderItems} loadCart={loadCart} />
      </div>
    </>
  );
}
export default Order;
