import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionTable from "../TransactionTable";
import { Transaction } from "../../types";

// Mock Ant Design components
jest.mock("antd", () => ({
  Table: ({ dataSource }: any) => (
    <div data-testid="transaction-table">
      {dataSource.map((item: any, index: number) => (
        <div key={index} data-testid={`table-row-${index}`}>
          {item.vendor} - {item.amount}
        </div>
      ))}
    </div>
  ),
  Tag: ({ children, color }: any) => (
    <span data-testid="tag" data-color={color}>
      {children}
    </span>
  ),
  Card: ({ children }: any) => <div data-testid="mobile-card">{children}</div>,
  Space: ({ children }: any) => <div>{children}</div>,
  Typography: {
    Text: ({ children }: any) => <span>{children}</span>,
    Title: ({ children }: any) => <h1>{children}</h1>,
  },
  Dropdown: ({ children }: any) => <div>{children}</div>,
  Button: ({ children }: any) => <button>{children}</button>,
}));

jest.mock("@ant-design/icons", () => ({
  MoreOutlined: () => <span>More</span>,
  EllipsisOutlined: () => <span>Ellipsis</span>,
}));

describe("TransactionTable", () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      status: "Approved",
      date: "2024-01-01",
      member: "Alice",
      budget: "Marketing",
      type: "Expense",
      vendor: "Vendor A",
      invoiceNumber: "INV001",
      amount: 100,
    },
    {
      id: "2",
      status: "Pending",
      date: "2024-01-02",
      member: "Bob",
      budget: "IT",
      type: "Software",
      vendor: "Vendor B",
      invoiceNumber: "INV002",
      amount: 200,
    },
  ];

  test("renders table view", () => {
    render(<TransactionTable transactions={transactions} />);
    expect(screen.getByTestId("transaction-table")).toBeInTheDocument();
    expect(screen.getByTestId("table-row-0")).toHaveTextContent(
      "Vendor A - 100",
    );
    expect(screen.getByTestId("table-row-1")).toHaveTextContent(
      "Vendor B - 200",
    );
  });

  test("renders tags with correct color", () => {
    render(<TransactionTable transactions={transactions} />);
    const tags = screen.getAllByTestId("tag");
    expect(tags[0]).toHaveAttribute("data-color", "success");
    expect(tags[1]).toHaveAttribute("data-color", "warning");
  });

  test("renders mobile cards", () => {
    render(<TransactionTable transactions={transactions} />);
    const cards = screen.getAllByTestId("mobile-card");
    expect(cards).toHaveLength(transactions.length);
  });

  test("handles empty transaction list", () => {
    render(<TransactionTable transactions={[]} />);
    expect(screen.queryByTestId("table-row-0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mobile-card")).not.toBeInTheDocument();
  });
});
