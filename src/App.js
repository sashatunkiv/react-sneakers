import React from "react";
import axios from "axios";
// import Card from "./component/Card/Card";
import Cart from "./component/Cart";
import Header from "./component/Header";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import AppContext from "./context";
import Orders from "./pages/Orders";




function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
   async function fetchData() {
    setFavorites(true);
     // fetch('https://6444195390738aa7c07f0ed9.mockapi.io/items')
    // .then((res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });
    const itemsResponse = await axios.get('https://6444195390738aa7c07f0ed9.mockapi.io/items');
    const cartResponse = await axios.get('https://6444195390738aa7c07f0ed9.mockapi.io/cart');
    const favoritesResponse = await axios.get('https://64310702d4518cfb0e5940df.mockapi.io/Favorites');
    setIsLoading(false);

    setItems(itemsResponse.data);
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
   }

   fetchData();
  }, []);

  //    add to Cart backend
  const onAddToCard = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6444195390738aa7c07f0ed9.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6444195390738aa7c07f0ed9.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Помилка при додаванні в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6444195390738aa7c07f0ed9.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !==id));
  }

//    add to Favorite backend
  const onAddToFavorite = async (obj) => {
   try {
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      axios.delete(`https://64310702d4518cfb0e5940df.mockapi.io/Favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      const {data} = await axios.post('https://64310702d4518cfb0e5940df.mockapi.io/Favorites', obj);
    setFavorites((prev) => [...prev, data]);
    }
   } catch (error) {
    alert('Не вдалось додати до фаворитів');
   }
  }
 
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const removeInput = () => {
    setSearchValue('');
  }


  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCard, setCartItems, setCartOpened}}>
      <div className="wrapper clear">
      {cartOpened ? <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
      <Header
      onClickCart={() => setCartOpened(true)} 
      />

      <Routes>
      <Route path="/" element={<Home 
      searchValue={searchValue}
      cartItems={cartItems} 
      removeInput={removeInput}
      onChangeSearchValue={onChangeSearchValue}
      items={items}
      onAddToFavorite={onAddToFavorite}
      onAddToCard={onAddToCard}
      isLoading={isLoading}
      />} />
      </Routes>
      <Routes>
        <Route path="/favorite" element={<Favorite/>}/>
      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
