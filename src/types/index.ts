import React from "react";
import "antd/dist/reset.css";

// Sidebar related types
export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasSubmenu?: boolean;
  submenu?: SidebarItem[];
}

export interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

// Transaction related types
export interface Transaction {
  id: string;
  date: string;
  member: string;
  budget: string;
  type: string;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  status: "Pending" | "Approved";
}

export interface TransactionTableProps {
  transactions: Transaction[];
}

// Filter and search types
export interface FilterOptions {
  status: string;
  dateRange: string;
  searchQuery: string;
}

// Layout related types
export interface LayoutProps {
  children: React.ReactNode;
}

// Header related types
export interface HeaderProps {
  title: string;
  subtitle?: string;
}
