import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Checkout from "./pages/checkout/Checkout";
import Order from "./pages/OrdersComponents/Orders";
import Tracking from "./pages/Tracking";
import "./App.css";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCartItem(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);

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

  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fatchProductData = async () => {
      const response = await axios.get("/api/products");
      setProduct(response.data);
    };
    fatchProductData();
  }, []);

  return (
    <>
      {/* this help us to navigation the page without loding */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartItem={cartItem}
              products={products}
              loadCart={loadCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cartItem={cartItem} loadCart={loadCart}/>} />
        <Route
          path="/orders"
          element={<Order cartItem={cartItem} orderItems={orderItems} loadCart ={loadCart}/>}
        />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
