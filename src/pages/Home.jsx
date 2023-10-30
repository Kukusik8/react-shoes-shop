import React from 'react';
import Card from '../components/Card';


const Home = ({ items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart }) => {
    
    return (
         <div className="content p-40 ">
        <div className="d-flex mb-40 align-center justify-between">
          <h1>
            {searchValue ? `Поиск по запросу:${searchValue}` : `Все кроссовки`}
          </h1>
          <div className="search-block d-flex ">
            <img src="/img/Group.svg" alt="search" />
            <input
              onChange={onChangeSearchInput}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item, index) => (
              <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                {...item}
              />
            ))}
        </div>
      </div>
    );
}

export default Home;
