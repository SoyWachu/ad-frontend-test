import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import React from "react";
import { useApp } from "@/app/context/AppContext/AppContext";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

jest.mock("@/app/context/AppContext/AppContext", () => ({
  __esModule: true,
  useApp: jest.fn(),
}));

describe("ProductCard", () => {
  const mockDispatch = jest.fn();
  const mockFetchGames = jest.fn();

  const baseProps = {
    id: "1",
    imageUrl: "/game.png",
    title: "Cool Game",
    genre: "Action",
    price: 100,
    description: "An awesome game",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product info correctly", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: [] },
      dispatch: mockDispatch,
      fetchGames: mockFetchGames,
    });

    render(<ProductCard {...baseProps} />);

    expect(screen.getByText("Cool Game")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/game.png");
  });

  it("shows 'New' badge when isNew is true", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: [] },
      dispatch: mockDispatch,
      fetchGames: mockFetchGames,
    });

    render(<ProductCard {...baseProps} isNew />);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("adds item to cart when not in cart", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: [] },
      dispatch: mockDispatch,
      fetchGames: mockFetchGames,
    });

    render(<ProductCard {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /ADD TO CART/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_ITEM",
      payload: expect.objectContaining({
        id: "1",
        title: "Cool Game",
        price: 100,
        quantity: 1,
        imageUrl: "/game.png",
        genre: "Action",
        description: "An awesome game",
      }),
    });
  });

  it("removes item from cart when already in cart", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: {
        cart: [
          {
            id: "1",
            title: "Cool Game",
            price: 100,
            quantity: 1,
            imageUrl: "/game.png",
            genre: "Action",
            description: "An awesome game",
          },
        ],
      },
      dispatch: mockDispatch,
      fetchGames: mockFetchGames,
    });

    render(<ProductCard {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /REMOVE FROM CART/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_ITEM",
      payload: "1",
    });
  });

  it("matches snapshot", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: [] },
      dispatch: mockDispatch,
      fetchGames: mockFetchGames,
    });

    const { container } = render(<ProductCard {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
