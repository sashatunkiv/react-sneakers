import React from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/use.Cart";

function Cart({onClose, onRemove, items = []}) {
const { cartItems, setCartItems, totalPrice} = useCart();
const [orderId, setOrderId] = React.useState(null);
const [isOrderComplete, setIsOrderComplete] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);




const onClickOrder = async () => {
   try {
    setIsLoading(true);
    const { data } = await  axios.post('https://64310702d4518cfb0e5940df.mockapi.io/orders', {items: cartItems});
    await axios.put('https://6444195390738aa7c07f0ed9.mockapi.io/cart', []);
   setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);
   } catch (error) {
    alert('Не вдалось створити замовлення :(');
   }
   setIsLoading(false);
}

    return(
        <div className="overlay">
        <div className="drawer">
          <div className="mb-30 d-flex justify-between">
            <h2>Корзина</h2>
            <img onClick={onClose} className="cu-p" src="./img/btnPlus.svg"/>
          </div>
          {items.length > 0 ? (
            <div className="d-flex flex-column flex">
                <div className="d-flex flex-column flex">
                {items.map((obj) => (
            <div className="d-flex flex-column">
                <div className="cartItem mb-20 d-flex justify-between flex">
                <img className="mr-20" width={70} height={70} src={obj.imageUrl}/>
                <div>
                <h4>{obj.title}</h4>
                <b>{obj.price} грн.</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="deletegoods" src="./img/btnPlus.svg" alt="Remove"/>
            </div>
            </div>
          ))}
                </div>
          <div className="cartTotalBlock">
            <div className="d-flex justify-between mb-20">
              <span>Загалом:</span>
              <div></div>
              <b>{totalPrice} грн.</b>
            </div>
            <button disabled={isLoading} onClick={onClickOrder} className="btnCart">Оформити замовдення
              <img src="./img/arrow.svg" alt="arrow"/>
            </button>
          </div>
            </div>
          ) : (<Info 
            title={isOrderComplete ? "Замовлення оформлене" : "Корзина порожня"} 
            description={isOrderComplete ? `Дякуємо за покупку номер замовлення №${orderId}` : "Добавте хочаб одну пара кросівок"} 
            image={isOrderComplete ? "./img/completle.jpg" : "./img/empty-Card.jpg"}/>
          )}
        </div>
      </div>
    )
}

export default Cart