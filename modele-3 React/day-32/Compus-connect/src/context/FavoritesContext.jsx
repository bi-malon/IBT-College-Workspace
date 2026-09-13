import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteClubs, setFavoriteClubs] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  function toggleFavoriteClub(clubId) {
    setFavoriteClubs((prev) =>
      prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId]
    );
  }

  function toggleFavoriteEvent(eventId) {
    setFavoriteEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  }

  const value = {
    favoriteClubs,
    favoriteEvents,
    toggleFavoriteClub,
    toggleFavoriteEvent,
    isClubFavorite: (id) => favoriteClubs.includes(id),
    isEventFavorite: (id) => favoriteEvents.includes(id),
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
