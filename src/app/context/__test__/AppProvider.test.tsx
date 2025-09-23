import { renderHook, act } from "@testing-library/react";
import { AppProvider } from "../AppProvider/AppProvider";
import { useApp } from "../AppContext/AppContext";
import { getGames } from "@/services/gamesService";
import type { GamesResponse } from "@/services/gamesService";

jest.mock("@/services/gamesService");
const mockedGetGames = getGames as jest.MockedFunction<typeof getGames>;

// Datos falsos acorde a tu interfaz Game
const fakeData: GamesResponse = {
  games: [
    {
      id: "1",
      genre: "Action",
      image: "/img/game1.png",
      name: "Game 1",
      description: "Desc Game 1",
      price: 59.99,
      isNew: true,
    },
  ],
  availableFilters: ["Action", "Adventure"],
  totalPages: 1,
  currentPage: 1,
};

describe("AppProvider & useApp", () => {
  it("lanza error si useApp se usa fuera de AppProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // silencia error esperado

    expect(() => renderHook(() => useApp())).toThrow(
      "useApp debe usarse dentro de AppProvider"
    );

    spy.mockRestore(); // restaurar console.error
  });

  it("provee estado inicial correctamente", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    expect(result.current.state.games).toEqual([]);
    expect(result.current.state.cart).toEqual([]);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.availableFilters).toEqual([]);
    expect(result.current.state.currentPage).toBe(1);
    expect(result.current.state.totalPages).toBe(1);
    expect(typeof result.current.fetchGames).toBe("function");
    expect(typeof result.current.dispatch).toBe("function");
  });

  it("fetchGames actualiza el estado correctamente", async () => {
    mockedGetGames.mockResolvedValueOnce(fakeData);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await act(async () => {
      await result.current.fetchGames();
    });

    expect(result.current.state.games).toEqual(fakeData.games);
    expect(result.current.state.availableFilters).toEqual(
      fakeData.availableFilters
    );
    expect(result.current.state.totalPages).toBe(fakeData.totalPages);
    expect(result.current.state.currentPage).toBe(fakeData.currentPage);
    expect(result.current.state.loading).toBe(false);
  });

  it("fetchGames con append = true agrega juegos al estado", async () => {
    const initialData: GamesResponse = {
      games: [
        {
          id: "2",
          genre: "Adventure",
          image: "/img/game2.png",
          name: "Game 2",
          description: "Desc Game 2",
          price: 39.99,
          isNew: false,
        },
      ],
      availableFilters: ["Adventure"],
      totalPages: 1,
      currentPage: 1,
    };

    mockedGetGames.mockResolvedValueOnce(initialData);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await act(async () => {
      await result.current.fetchGames();
    });

    const appendData: GamesResponse = {
      games: [
        {
          id: "3",
          genre: "Action",
          image: "/img/game3.png",
          name: "Game 3",
          description: "Desc Game 3",
          price: 49.99,
          isNew: true,
        },
      ],
      availableFilters: ["Action"],
      totalPages: 2,
      currentPage: 2,
    };

    mockedGetGames.mockResolvedValueOnce(appendData);

    await act(async () => {
      await result.current.fetchGames(2, undefined, true);
    });

    expect(result.current.state.games).toEqual([
      initialData.games[0],
      appendData.games[0],
    ]);
    expect(result.current.state.availableFilters).toEqual(
      appendData.availableFilters
    );
    expect(result.current.state.totalPages).toBe(appendData.totalPages);
    expect(result.current.state.currentPage).toBe(appendData.currentPage);
  });
});
