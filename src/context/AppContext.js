import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (fav) => fav.uid === item.uid && fav.type === item.type
      );
      return exists
        ? prev.filter((fav) => !(fav.uid === item.uid && fav.type === item.type))
        : [...prev, item];
    });
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};
