import { Game, GamesResponse } from "@/services/gamesService";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  genre: string;
  description: string;
}

export type AppState = {
  games: Game[];
  totalPages: number;
  currentPage: number;
  cart: CartItem[];
  loading: boolean;
  availableFilters: string[];
};

export type AppAction =
  | { type: "SET_GAMES"; payload: GamesResponse }
  | { type: "APPEND_GAMES"; payload: GamesResponse }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "TOGGLE_ITEM"; payload: CartItem }
  | { type: "CLEAR_CART" };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload.games,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        availableFilters: action.payload.availableFilters,
      };

    case "APPEND_GAMES":
      return {
        ...state,
        games: [...state.games, ...action.payload.games],
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        availableFilters: action.payload.availableFilters,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "ADD_ITEM": {
      const exists = state.cart.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: (i.quantity || 1) + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };

    case "TOGGLE_ITEM": {
      const exists = state.cart.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.payload.id),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}
