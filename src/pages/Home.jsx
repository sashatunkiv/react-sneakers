import React from "react";
import Card from "../component/Card/Card";

function Home({cartItems, searchValue, removeInput, onChangeSearchValue, items, onAddToFavorite, onAddToCard, isLoading}) 
{

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
          <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCard(obj)}
          loading={isLoading}
          {... item}
          />
        ))
    }
    return(
        <div className="content p-40">
        <div className="mb-40 d-flex justify-between">
          <h1 className="">{searchValue ? `Пошук по запиту: "${searchValue}"` : 'Всі кросівки'}</h1>
          <div className="searchBlock">
            <img src="./img/search.svg" alt="search"/>
            {searchValue && <img onClick={removeInput} width={18} height={18} className="cu-p clean" src="./img/btnPlus.svg"/>}
            <input onChange={onChangeSearchValue} value={searchValue} placeholder="Пошук..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    );
}

export default Home;