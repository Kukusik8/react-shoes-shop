import { useEffect, useState } from "react";
import styles from "./Card.module.scss";

console.log(styles);

function Card({ id,onPlus,onFavorite, title, imageUrl, price,favorited=false }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorire] = useState(favorited);

  const onClickPlus = () => {
    onPlus({id,title,imageUrl,price});
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price });
    setIsFavorire(!isFavorite)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFavorite}
          src={isFavorite ? "/img/heart-liked.svg" : "img/heart-unliked.svg"}
          alt="red heart"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="shoe" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/button-checked.svg" : "/img/button-plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
}

export default Card;
