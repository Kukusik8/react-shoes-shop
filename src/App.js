import { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

import "./App.scss";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import axios from "axios";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://6538de63a543859d1bb216bb.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6538de63a543859d1bb216bb.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6538de63a543859d1bb216bb.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6538de63a543859d1bb216bb.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites/${obj.id}`);
   setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    
    } else {
      axios.post("https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites", obj)
      setFavorites((prev) => [...prev, obj]);
    }
    
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App clear ">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/favorites"
          element={
            <Favorites
              onAddToFavorite={onAddToFavorite}
              items={favorites}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
