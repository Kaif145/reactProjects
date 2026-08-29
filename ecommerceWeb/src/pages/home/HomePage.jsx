import "./Homepage.css";
import { Header } from "../../component/Header";
import { HomePageGrid } from "./HomePageGrid";
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function HomePage({ cartItem, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "/api/products";

      if (search) {
        url += `?search=${search}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    };

    fetchProducts();
  }, [search]);

  return (
    <>
      <Header cartItem={cartItem} />

      <div className="home-page">
        <HomePageGrid
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}

export default HomePage;