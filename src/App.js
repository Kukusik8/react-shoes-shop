import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.scss";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import axios from "axios";
import Favorites from "./pages/Favorites";
import AppContext from "./context";



function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://6538de63a543859d1bb216bb.mockapi.io/cart"
      );
      const favoriteResponse = await axios.get(
        "https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites"
      );

      const itemsResponse = await axios.get(
        "https://6538de63a543859d1bb216bb.mockapi.io/items"
      );
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://6538de63a543859d1bb216bb.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://6538de63a543859d1bb216bb.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
    try {
    } catch {}
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6538de63a543859d1bb216bb.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const [data] = await axios.post(
          "https://653f4e9d9e8bd3be29e0393e.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
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
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/favorites"
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
