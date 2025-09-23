import { appReducer, AppState, AppAction } from "../appReducer";
import type { GamesResponse, Game } from "@/services/gamesService";
import type { CartItem } from "../appReducer";

describe("appReducer", () => {
  const initialState: AppState = {
    games: [],
    totalPages: 1,
    currentPage: 1,
    cart: [],
    loading: false,
    availableFilters: [],
  };

  const sampleGame: Game = {
    id: "1",
    name: "Game 1",
    genre: "Action",
    price: 10,
    description: "desc",
    image: "/img.png",
    isNew: true,
  };

  const sampleGamesResponse: GamesResponse = {
    games: [sampleGame],
    totalPages: 2,
    currentPage: 1,
    availableFilters: ["Action"],
  };

  const createCartItem = (game: Game, quantity = 1): CartItem => ({
    id: game.id,
    title: game.name,
    price: game.price,
    quantity,
    imageUrl: game.image,
    genre: game.genre,
    description: game.description,
  });

  it("SET_GAMES reemplaza los juegos y actualiza filtros/paginación", () => {
    const action: AppAction = {
      type: "SET_GAMES",
      payload: sampleGamesResponse,
    };
    const state = appReducer(initialState, action);

    expect(state.games).toEqual(sampleGamesResponse.games);
    expect(state.totalPages).toBe(2);
    expect(state.currentPage).toBe(1);
    expect(state.availableFilters).toEqual(["Action"]);
  });

  it("APPEND_GAMES agrega los juegos al estado existente", () => {
    const stateWithGames = { ...initialState, games: [sampleGame] };
    const newGame: Game = { ...sampleGame, id: "2", name: "Game 2" };
    const action: AppAction = {
      type: "APPEND_GAMES",
      payload: { ...sampleGamesResponse, games: [newGame] },
    };

    const state = appReducer(stateWithGames, action);
    expect(state.games.length).toBe(2);
    expect(state.games.map((g) => g.id)).toEqual(["1", "2"]);
  });

  it("SET_LOADING actualiza la propiedad loading", () => {
    const action: AppAction = { type: "SET_LOADING", payload: true };
    const state = appReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("ADD_ITEM agrega un item al carrito si no existe", () => {
    const cartItem = createCartItem(sampleGame);
    const action: AppAction = { type: "ADD_ITEM", payload: cartItem };
    const state = appReducer(initialState, action);

    expect(state.cart.length).toBe(1);
    expect(state.cart[0].quantity).toBe(1);
    expect(state.cart[0].title).toBe(sampleGame.name);
  });

  it("ADD_ITEM incrementa cantidad si el item ya existe", () => {
    const cartItem = createCartItem(sampleGame);
    const stateWithItem = appReducer(initialState, {
      type: "ADD_ITEM",
      payload: cartItem,
    });
    const state = appReducer(stateWithItem, {
      type: "ADD_ITEM",
      payload: cartItem,
    });

    expect(state.cart[0].quantity).toBe(2);
  });

  it("REMOVE_ITEM elimina un item del carrito", () => {
    const cartItem = createCartItem(sampleGame);
    const stateWithItem = appReducer(initialState, {
      type: "ADD_ITEM",
      payload: cartItem,
    });
    const state = appReducer(stateWithItem, {
      type: "REMOVE_ITEM",
      payload: sampleGame.id,
    });

    expect(state.cart.length).toBe(0);
  });

  it("TOGGLE_ITEM agrega o elimina un item del carrito", () => {
    const cartItem = createCartItem(sampleGame);

    let state = appReducer(initialState, {
      type: "TOGGLE_ITEM",
      payload: cartItem,
    });
    expect(state.cart.length).toBe(1);

    state = appReducer(state, { type: "TOGGLE_ITEM", payload: cartItem });
    expect(state.cart.length).toBe(0);
  });

  it("CLEAR_CART vacía el carrito", () => {
    const cartItem = createCartItem(sampleGame);
    const stateWithItem = appReducer(initialState, {
      type: "ADD_ITEM",
      payload: cartItem,
    });
    const state = appReducer(stateWithItem, { type: "CLEAR_CART" });
    expect(state.cart.length).toBe(0);
  });

  it("default case retorna el estado sin cambios", () => {
    const action = { type: "UNKNOWN" } as unknown as AppAction;
    const state = appReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
