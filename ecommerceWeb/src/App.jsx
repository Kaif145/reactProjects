import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Checkout from "./pages/checkout/Checkout";
import Order from "./pages/Orders";
import Tracking from "./pages/Tracking";
import "./App.css";

function App() {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    axios.get("/api/cart-items").then((response) => {
      setCartItem(response.data);
    });
  }, []);

  return (
    <>
      {/* this help us to navigation the page without loding */}
      <Routes>
        <Route path="/" element={<HomePage cartItem={cartItem} />} />
        <Route path="/checkout" element={<Checkout cartItem={cartItem} />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
