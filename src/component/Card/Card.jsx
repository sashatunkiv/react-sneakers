import React from "react";
import AppContext from "../../context";
import styles from "./Card.module.scss"
import ContentLoader from "react-content-loader"


function Card({id, imageUrl, title, price, onFavorite, onPlus, favorited = false, loading = false}) {
const { isItemAdded } = React.useContext(AppContext);
const [isFavorite, setIsFavorite] = React.useState(favorited); 
const obj = {id, parentId: id, title, price, imageUrl}

const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
}

const onClickPlus = () => {
    onPlus(obj);
}

return (
    <div className={styles.card}>
       { loading ? <ContentLoader 
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="10" ry="10" width="150" height="90" /> 
    <rect x="0" y="130" rx="3" ry="3" width="150" height="15" /> 
    <rect x="0" y="150" rx="3" ry="3" width="92" height="15" /> 
    <rect x="0" y="190" rx="8" ry="8" width="80" height="25" /> 
    <rect x="116" y="183" rx="8" ry="8" width="32" height="32" />
  </ContentLoader> : 
        <>
            <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"} alt="Unliked"/>
        </div>
        <div>
            <img width={133} height={112} src={imageUrl}/>
        </div>
        <div><h4>{title}</h4></div>
        <div className="d-flex justify-between align-center">
            <div className={styles.cardText}>
            <span className="text-uppercase">ЦІНА:</span>
            <b>{price} грн.</b>
            </div>
            <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "./img/btnAdd.png" : "./img/btnPlus.svg"}/>
        </div>
        </>
        }
    </div>
)
}

export default Card;