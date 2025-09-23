import { render, screen, fireEvent, within } from "@testing-library/react";
import CartPage from "@/components/CartPage/CartPage";
import React from "react";
import { AppContext } from "@/app/context/AppContext/AppContext";

const baseMockState = {
  games: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  availableFilters: [],
};

const mockStateWithItems = {
  ...baseMockState,
  cart: [
    {
      id: "1",
      title: "Game 1",
      genre: "Action",
      description: "Awesome game",
      price: 100,
      quantity: 2,
      imageUrl: "/game1.png",
    },
    {
      id: "2",
      title: "Game 2",
      genre: "RPG",
      description: "Another great game",
      price: 30,
      quantity: 1,
      imageUrl: "/game2.png",
    },
  ],
};

const mockStateEmpty = {
  ...baseMockState,
  cart: [],
};

const mockDispatch = jest.fn();
const mockFetchGames = jest.fn();

describe("CartPage", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders cart items correctly", () => {
    render(
      <AppContext.Provider
        value={{
          state: mockStateWithItems,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );

    const productList = screen.getByTestId("cart-product-list");
    const productItems = within(productList).getAllByTestId("cart-item");

    expect(within(productItems[0]).getByText("Game 1")).toBeInTheDocument();
    expect(within(productItems[1]).getByText("Game 2")).toBeInTheDocument();
    expect(
      within(productItems[0]).getByText(/Quantity: 2/i)
    ).toBeInTheDocument();
  });

  it("calculates total items and total price correctly", () => {
    render(
      <AppContext.Provider
        value={{
          state: mockStateWithItems,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );

    const orderSummary = screen.getByTestId("order-summary");
    expect(within(orderSummary).getByText("$230.00")).toBeInTheDocument();
    expect(within(orderSummary).getByText(/3 items/i)).toBeInTheDocument();
  });

  it("removes item from cart when clicking remove button", () => {
    render(
      <AppContext.Provider
        value={{
          state: mockStateWithItems,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );

    const productList = screen.getByTestId("cart-product-list");
    const productItems = within(productList).getAllByTestId("cart-item");

    const removeButtons = within(productItems[0]).getAllByLabelText(
      "remove Game 1"
    );

    fireEvent.click(removeButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_ITEM",
      payload: "1",
    });
  });

  it("shows empty cart message when cart is empty", () => {
    render(
      <AppContext.Provider
        value={{
          state: mockStateEmpty,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByText(/0 items/i)).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders back to catalog link correctly", () => {
    render(
      <AppContext.Provider
        value={{
          state: mockStateWithItems,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );

    expect(screen.getByText(/← Back to Catalog/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <AppContext.Provider
        value={{
          state: mockStateWithItems,
          dispatch: mockDispatch,
          fetchGames: mockFetchGames,
        }}
      >
        <CartPage />
      </AppContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
