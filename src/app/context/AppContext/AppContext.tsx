"use client";
import { createContext, useContext } from "react";
import type { AppState, AppAction } from "@/app/reducers/appReducer";

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchGames: (
    page?: number,
    genre?: string,
    append?: boolean
  ) => Promise<void>;
} | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
}
