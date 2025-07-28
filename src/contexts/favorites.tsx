import React, { createContext, useState } from "react";
import { Establishment } from "../models/Establishment";

type FavoritesContextType = {
  favorites: Establishment[];
  toggleFavorite: (establishment: Establishment) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Establishment[]>([]);

  const toggleFavorite = (establishment: Establishment) =>
    setFavorites((value) =>
      value.find((item) => item.FHRSID === establishment.FHRSID)
        ? value.filter((item) => item.FHRSID !== establishment.FHRSID)
        : [
          ...value,
          establishment,
        ]
    )

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};