import { createContext, useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

console.log(styles);

function Card({
  id,
  onPlus,
  onFavorite,
  title,
  imageUrl,
  price,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorire] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price });
    setIsFavorire(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#e7e4e4"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="1187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={onClickFavorite}
              src={
                isFavorite ? "/img/heart-liked.svg" : "img/heart-unliked.svg"
              }
              alt="red heart"
            />
          </div>
          <img width="100%" height={135} src={imageUrl} alt="shoe" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={styles.plus}
              onClick={onClickPlus}
              src={
                isItemAdded(id)
                  ? "/img/button-checked.svg"
                  : "/img/button-plus.svg"
              }
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
