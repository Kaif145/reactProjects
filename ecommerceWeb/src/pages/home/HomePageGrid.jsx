import React from "react";


import { Product } from "./product";
export function HomePageGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
   
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
export default HomePageGrid;
