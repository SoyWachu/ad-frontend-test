import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img alt={props.alt || ""} {...props} />,
}));

describe("Footer", () => {
  it("renders logo correctly", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Logo Apply Digital");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logos/apply-digital-logo.png");
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
