import React from "react";
import axios from "axios";

import Card from "../component/Card/Card";
import AppContext from "../context";


function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://64310702d4518cfb0e5940df.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Помилка при запиті товарів');
        console.error(error);
      }
    })();
  }, []);

    return(
        <div className="content p-40">
        <div className="mb-40 d-flex justify-between">
          <h1 >Мої замовлення</h1>
        </div>
        <div className="d-flex flex-wrap">
          {(isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card
            key={index}
          loading={isLoading}
          {... item}/>
          ))}
        </div>
        
      </div>
    );
}


export default Orders;