import React from "react";
import {Link} from 'react-router-dom';
import { useCart } from "../hooks/use.Cart";


function Header(props) {
    const { totalPrice} = useCart();


    return(
        <header className="d-flex justify-between align-center p-40">
       <Link to='/'>
       <div className="headerLeft d-flex align-center">
        <img className="mr-15" weight={40} height={40} src="./img/logo.png"/>
        <div className="headerInfo">
            <h3 className="text-uppercase">Sneakers</h3>  
            <p>Найкращі кроси</p>     
          </div>
       </div>
       </Link>
        <ul className="headerRight d-flex">
          <li onClick={props.onClickCart} className="cu-p">
            <img className="mr-10" src="./img/card.svg"/>
            <span>{totalPrice} грн.</span>
          </li>
          <li className="cu-p">
            <Link to='/favorite'>
            <img src="./img/wishlist.svg"/>
            </Link>
          </li>
          <li className="cu-p">
            <Link to='/orders'>
            <img src="./img/user.svg"/>
            </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;