import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header/Header";
import { useApp } from "@/app/context/AppContext/AppContext";

jest.mock("@/app/context/AppContext/AppContext", () => ({
  __esModule: true,
  useApp: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("Header", () => {
  const cartMock = [{ id: "1", title: "Game 1", quantity: 2 }];

  beforeEach(() => {
    jest.clearAllMocks();
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: cartMock },
    });
  });

  it("renders logo and home link", () => {
    render(<Header />);

    const logo = screen.getByText("GamerShop");
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /GamerShop/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders cart icon and badge if items exist", () => {
    render(<Header />);
    const badge = screen.getByText("1");
    expect(badge).toBeInTheDocument();
  });

  it("renders cart icon without badge if cart is empty", () => {
    (useApp as jest.Mock).mockReturnValue({
      state: { cart: [] },
    });

    render(<Header />);
    const badge = screen.queryByText("1");
    expect(badge).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
