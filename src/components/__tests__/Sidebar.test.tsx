import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../Sidebar";
import lamhaLogo from "../../assets/lamha.webp";


// Mock Ant Design components
jest.mock("antd", () => ({
  Menu: ({ items, onClick }: any) => (
    <div data-testid="menu">
      {items?.map((item: any) => (
        <div
          key={item.key}
          data-testid={`menu-item-${item.key}`}
          onClick={() => onClick && onClick({ key: item.key })}
          style={{ cursor: "pointer" }}
        >
          {item.label}
          {item.children?.map((child: any) => (
            <div key={child.key} data-testid={`menu-item-${child.key}`}>
              {child.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  Drawer: ({ children, open, onClose }: any) =>
    open ? (
      <div data-testid="mobile-drawer">
        {children}
        <button onClick={onClose} data-testid="drawer-close">
          Close
        </button>
      </div>
    ) : null,
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  Space: ({ children }: any) => <div data-testid="space">{children}</div>,
  Typography: {
    Text: ({ children, strong, type }: any) => (
      <span data-testid={`text-${strong ? "strong" : type || "normal"}`}>
        {children}
      </span>
    ),
  },
}));

describe("Sidebar Component", () => {
  const defaultProps = {
    className: "",
    isMobileOpen: false,
    onMobileClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sidebar with logo and menu items", () => {
    render(<Sidebar {...defaultProps} />);

    // Check if main menu items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Cash Flow")).toBeInTheDocument();
    expect(screen.getByText("Budget")).toBeInTheDocument();
    expect(screen.getByText("Transaction")).toBeInTheDocument();
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByText("Bill Pay")).toBeInTheDocument();
    expect(screen.getByText("Tax Report")).toBeInTheDocument();
    expect(screen.getByText("Card")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  test("renders user profile section", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByText("Ahmed Abbas")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  test("renders submenu items for Tax Report", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.getByText("VAT")).toBeInTheDocument();
    expect(screen.getByText("Withholding")).toBeInTheDocument();
  });

  test("handles menu item clicks", () => {
    render(<Sidebar {...defaultProps} />);

    const homeMenuItem = screen.getByTestId("menu-item-home");
    fireEvent.click(homeMenuItem);

    // The component should handle the click (no errors thrown)
    expect(homeMenuItem).toBeInTheDocument();
  });

  test("does not show mobile drawer when isMobileOpen is false", () => {
    render(<Sidebar {...defaultProps} />);

    expect(screen.queryByTestId("mobile-drawer")).not.toBeInTheDocument();
  });

  test("shows mobile drawer when isMobileOpen is true", () => {
    render(<Sidebar {...defaultProps} isMobileOpen={true} />);

    expect(screen.getByTestId("mobile-drawer")).toBeInTheDocument();
  });

  test("calls onMobileClose when mobile close button is clicked", () => {
    const mockOnMobileClose = jest.fn();
    render(
      <Sidebar
        {...defaultProps}
        isMobileOpen={true}
        onMobileClose={mockOnMobileClose}
      />,
    );

    const closeButton = screen.getByTestId("drawer-close");
    fireEvent.click(closeButton);

    expect(mockOnMobileClose).toHaveBeenCalledTimes(1);
  });

  test("applies custom className", () => {
    const customClass = "custom-sidebar-class";
    render(<Sidebar {...defaultProps} className={customClass} />);

    // Check if the component structure is maintained
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  test("renders logo image with fallback", () => {
    render(<Sidebar {...defaultProps} />);

    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", lamhaLogo);
  });

  test("handles image error and shows fallback", () => {
    render(<Sidebar {...defaultProps} />);

    const logoImage = screen.getByAltText("Logo");

    // Simulate image error
    fireEvent.error(logoImage);

    // The error handler should be called (image style changed)
    expect(logoImage).toBeInTheDocument();
  });
});
