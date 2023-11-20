import React from 'react'
import { Link } from 'react-router-dom';


function Header(props) {

  return (
    <div>
      <header className="d-flex justify-between align-center p-40 ">
        <Link to="/">
          <div className="d-flex aligh-center">
            <img
              className=" cu-p"
              width={40}
              height={40}
              src="/img/logo.png"
              alt="logo"
            />
            <div className="headerInfo">
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex align-center">
          <li onClick={props.onClickCart} className="mr-30 cu-p d-flex">
            <img className="mr-5" src="/img/cart.svg" alt="cart" />
            <span>1205 рублей</span>{" "}
          </li>
          <Link to="/favorites">
            <li className="  d-flex cu-p mr-30">
              <img className="mr-5 " src="/img/heart.svg" alt="user" />
              <span>Закладки</span>
            </li>
          </Link>
          <li className=" d-flex cu-p mr-30">
            <img className="mr-5" src="/img/user.svg" alt="user" />
            <span>Профиль</span>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header