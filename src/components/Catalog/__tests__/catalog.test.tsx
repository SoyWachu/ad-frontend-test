import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Catalog from "../Catalog";
import { useApp } from "@/app/context/AppContext/AppContext";
import { useSearchParams, useRouter } from "next/navigation";

// Mocks
jest.mock("@/app/context/AppContext/AppContext", () => ({
  __esModule: true,
  useApp: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Catalog component", () => {
  const mockFetchGames = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useApp as jest.Mock).mockReturnValue({
      state: {
        games: [
          {
            id: "1",
            name: "Game 1",
            genre: "Action",
            price: 50,
            isNew: true,
            description: "Great game",
            image: "/game1.png",
          },
        ],
        loading: false,
        availableFilters: ["Action", "RPG"],
        currentPage: 1,
        totalPages: 2,
        cart: [],
      },
      fetchGames: mockFetchGames,
    });

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
      toString: jest.fn().mockReturnValue(""),
    });
  });

  it("calls fetchGames on mount", async () => {
    render(<Catalog />);
    await waitFor(() => {
      // corregido: el segundo parámetro es undefined, no null
      expect(mockFetchGames).toHaveBeenCalledWith(1, undefined);
    });
  });

  it("calls fetchGames when clicking SEE MORE", async () => {
    render(<Catalog />);
    const seeMoreBtn = screen.getByRole("button", { name: /SEE MORE/i });
    fireEvent.click(seeMoreBtn);

    await waitFor(() => {
      // verificamos la última llamada y aceptamos undefined
      const lastCall =
        mockFetchGames.mock.calls[mockFetchGames.mock.calls.length - 1];
      expect(lastCall).toEqual([2, undefined, true]);
    });
  });

  it("renders loading spinner when loading is true", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: {
        games: [],
        loading: true,
        availableFilters: [],
        currentPage: 1,
        totalPages: 1,
        cart: [],
      },
      fetchGames: mockFetchGames,
    });

    render(<Catalog />);
    const spinner = screen.getByRole("status"); // usamos el role real
    expect(spinner).toBeInTheDocument();
  });
});
