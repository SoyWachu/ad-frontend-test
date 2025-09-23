"use client";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { AppContext } from "@/app/context/AppContext/AppContext";
import { appReducer, AppState } from "@/app/reducers/appReducer";
import { getGames } from "@/services/gamesService";

const initialState: AppState = {
  games: [],
  totalPages: 1,
  currentPage: 1,
  cart: [],
  loading: false,
  availableFilters: [],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
      }
    } catch (err) {
      console.error("Error reading cart:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    }
  }, [state.cart, hydrated]);

  async function fetchGames(page = 1, genre?: string, append = false) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getGames(page, genre);
      dispatch({
        type: append ? "APPEND_GAMES" : "SET_GAMES",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch, fetchGames }}>
      {children}
    </AppContext.Provider>
  );
}
