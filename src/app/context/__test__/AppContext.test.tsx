import { renderHook } from "@testing-library/react";
import { AppContext, useApp } from "../AppContext/AppContext";
import type { AppState, AppAction } from "@/app/reducers/appReducer";

const mockState: AppState = {
  games: [],
  availableFilters: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  cart: [],
};

const mockDispatch = jest.fn() as React.Dispatch<AppAction>;
const mockFetchGames = jest.fn();

describe("useApp (AppContext)", () => {
  it("lanza un error si se usa fuera de AppProvider", () => {
    // NO accedemos a result.current
    expect(() => renderHook(() => useApp())).toThrow(
      "useApp debe usarse dentro de AppProvider"
    );
  });

  it("retorna el contexto si se usa dentro de un AppContext.Provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    expect(result.current.state).toEqual(mockState);
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(result.current.fetchGames).toBe(mockFetchGames);
  });
});
