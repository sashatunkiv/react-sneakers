import Card from "../component/Card/Card";
import React from "react";
import AppContext from "../context";


function Favorite() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return(
        <div className="content p-40">
        <div className="mb-40 d-flex justify-between">
          <h1 >Мої закладки</h1>
        </div>
        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {... item}
            />
          ))}
        </div>
        
      </div>
    );
}

export default Favorite;