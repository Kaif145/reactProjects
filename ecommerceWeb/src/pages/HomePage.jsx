import "./Homepage.css";
import { Header } from "../component/Header";
import { React, } from "react";
import {HomePageGrid} from "./HomePageGrid"

export function HomePage({ cartItem, products,loadCart}) {

  return (
    <>
      <Header cartItem={cartItem} />

      <div className="home-page">
        <HomePageGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
export default HomePage;
