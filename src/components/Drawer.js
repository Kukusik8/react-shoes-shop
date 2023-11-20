import React from "react";
import Info from "./info";

function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className=" d-flex justify-between  mb-20">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn  cu-p"
            src="/img/button-close.svg"
            alt="X"
          />
        </h2>

        {items.length > 0 ? (
          <div className=" d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/button-close.svg"
                    alt="X"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>14 348 руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b> 1074 руб.</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />{" "}
              </button>
            </div>
          </div>
        ) : (
          <Info
            title="Корзина пуста"
            description="Добавьте хотя бы одну пару кроссовков, чтобы сделать заказ"
            image="/img/empty-cart.svg"
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
