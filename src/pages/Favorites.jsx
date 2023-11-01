import React from 'react';
import Card from '../components/Card';
import { useContext } from 'react';
import AppContext from '../context';

const Favorites = ({ onAddToFavorite }) => {
    const {favorites} = useContext(AppContext)
    return (
        <div>
            <div className="content p-40 ">
        <div className="d-flex mb-40 align-center justify-between">
          <h1>
           Мои закладки
          </h1>
          
        </div>
        <div className="d-flex flex-wrap">
            {favorites
            .map((item, index) => (
                <Card
                key={index}
               favorited={true}
               onFavorite={onAddToFavorite}
                {...item}
                />
            ))}
        </div>
      </div>
        </div>
    );
}

export default Favorites;
