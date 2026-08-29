import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export function Header({cartItem}) {
//  console.log("cartItem:", cartItem);

 const [searchParams] = useSearchParams();

const search = searchParams.get("search");

const navigate = useNavigate();

 let totalItem = 0;
cartItem.forEach((item) => {
  totalItem += item.quantity;
});
const [searchValue,setSeacrchValue] = useState(search || "");

   
 
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" value={searchValue} placeholder="Search" onChange={(e)=>{
            setSeacrchValue(e.target.value);
            // console.log(e.target.value);

           } }
            
            />
           

          <button className="search-button" onClick={()=>{
            console.log(searchValue);
          navigate(`/?search=${searchValue}`)
            
          }}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalItem}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
