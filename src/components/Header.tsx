import React, { useState } from "react";
import {
  Input,
  Select,
  DatePicker,
  Button,
  Dropdown,
  Space,
  Form,
  message,
  Tabs,
  FloatButton,
} from "antd";
import type { MenuProps } from "antd";
import { SearchOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { HeaderProps } from "../types";
import {
  validateSearchQuery,
  validateDateRange,
  validateStatus,
} from "../utils/validation";
import TransactionForm from "./TransactionForm";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

/**
 * Header Component
 *
 * A responsive header that contains:
 * - Page title and action buttons (desktop only)
 * - Tab navigation (Transaction/Draft)
 * - Search and filter controls
 * - Floating action button (mobile/tablet only)
 *
 * Responsive behavior:
 * - Desktop: Full header with title, buttons, and all filters
 * - Tablet: No title/buttons (shown in Layout), but includes date filter
 * - Mobile: Simplified with search and status only, date filter hidden
 *
 * @param {HeaderProps} props - Component props
 * @param {string} props.title - Page title to display (desktop only)
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  // Ant Design Form instance for managing form state
  const [form] = Form.useForm();

  // Track active tab (Transaction vs Draft)
  const [activeTab, setActiveTab] = useState("transaction");
  const [isFormVisible, setFormVisible] = useState(false);

  const handleOpenForm = () => setFormVisible(true);
  const handleCloseForm = () => setFormVisible(false);

  const handleSubmitForm = (data: any) => {
    console.log("Submitted Transaction:", data);
    setFormVisible(false);
  };

  /**
   * Dropdown menu configuration for "Other action" button
   * Currently only has one option, but can be expanded
   */
  const dropdownItems: MenuProps["items"] = [
    {
      key: "reimbursement",
      label: "Request reimbursement",
      onClick: () => message.info("Request reimbursement clicked!"),
      // Note: In production, this would trigger a modal or navigate to a form
    },
  ];

  /**
   * Handle search input
   * Validates the search query before processing
   *
   * @param {string} value - Search query entered by user
   */
  const handleSearch = (value: string) => {
    // Validate search input (e.g., check for SQL injection, length limits)
    const validation = validateSearchQuery(value);
    if (!validation.isValid) {
      // Show error toast if validation fails
      message.error(validation.error);
    } else {
      // Perform search - in real app, this would trigger an API call
      console.log("Searching for:", value);
      // TODO: Implement actual search functionality
      // e.g., onSearch?.(value) or dispatch search action
    }
  };

  /**
   * Handle status filter change
   * Validates the selected status before applying filter
   *
   * @param {string} value - Selected status (pending/approved)
   */
  const handleStatusChange = (value: string) => {
    const validation = validateStatus(value);
    if (!validation.isValid) {
      message.error(validation.error);
    } else {
      // Apply status filter - in real app, this would update the data query
      console.log("Status filter:", value);
      // TODO: Implement actual filter functionality
      // e.g., onStatusChange?.(value) or update filter state
    }
  };

  /**
   * Handle date range selection
   * Validates the date range and formats it for use
   *
   * @param {any} dates - Array of dayjs objects [startDate, endDate]
   */
  const handleDateRangeChange = (dates: any) => {
    // Check if both start and end dates are selected
    if (dates && dates[0] && dates[1]) {
      // Format dates to YYYY-MM-DD string
      const dateRange = `${dates[0].format("YYYY-MM-DD")} - ${dates[1].format("YYYY-MM-DD")}`;

      // Validate date range (e.g., end date after start date, reasonable range)
      const validation = validateDateRange(dateRange);
      if (!validation.isValid) {
        message.error(validation.error);
      } else {
        // Apply date filter - in real app, this would update the data query
        console.log("Date range:", dateRange);
        // TODO: Implement actual date filter functionality
        // e.g., onDateRangeChange?.(dates) or update filter state
      }
    }
  };

  return (
    <>
      {/* Main header container with white background */}
      <div className="bg-white lg:border-b lg:border-gray-200">
        <div className="lg:px-6 lg:py-4">
          {/* Desktop-only Title and Action Section
              - hidden lg:flex: Hidden on mobile/tablet, visible on desktop
              - Contains page title and action buttons
              - mb-6: Bottom margin for spacing
          */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            {/* Page title - dynamic based on current page */}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            {/* Action buttons container */}
            <Space size="middle">
              {/* Dropdown for additional actions */}
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <Button>
                  Other action <DownOutlined />
                </Button>
              </Dropdown>

              {/* Primary CTA button with brand color */}
              <Button
                type="primary"
                style={{ backgroundColor: "#14b8a6" }}
                onClick={handleOpenForm}
              >
                Create New
              </Button>
            </Space>
          </div>

          {/* Tab Navigation Section
              - Allows switching between Transaction and Draft views
              - Visible on all screen sizes
          */}
          <div className="mb-4 md:mb-6">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                { key: "transaction", label: "Transaction" },
                { key: "draft", label: "Draft" },
              ]}
            />
          </div>

          {/* Search and Filter Controls
              - Uses Ant Design Form for consistent layout
              - Responsive layout changes based on screen size
          */}
          <Form form={form} layout="inline" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
              {/* Search Input
                  - Full width on mobile, max-width on larger screens
                  - Includes search icon and clear button
              */}
              <Form.Item className="flex-1 sm:max-w-md mb-0">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                  allowClear // Shows X button to clear input
                  size="large"
                />
              </Form.Item>

              {/* Filter Controls Container */}
              <Space wrap size="middle">
                {/* Status Filter Dropdown
                    - Available on all screen sizes
                    - Options: Pending, Approved
                */}
                <Form.Item className="mb-0">
                  <Select
                    placeholder="Status"
                    style={{ width: 120 }}
                    onChange={handleStatusChange}
                    allowClear // Allows clearing selection
                    size="large"
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "approved", label: "Approved" },
                    ]}
                  />
                </Form.Item>

                {/* Date Range Filter
                    - hidden sm:block: Hidden on mobile, visible on tablet and desktop
                    - Allows selecting a date range for filtering
                    - Disables future dates (can't select dates after today)
                */}
                <Form.Item className="hidden sm:block mb-0">
                  <RangePicker
                    size="large"
                    onChange={handleDateRangeChange}
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Space>
            </div>
          </Form>

          {/* Mobile/Tablet Floating Action Button
              - lg:hidden: Only visible on mobile and tablet
              - Fixed position at bottom right of screen
              - Replaces the "Create New" button from desktop header
              - Uses brand color for consistency
          */}
          <FloatButton
            className="lg:hidden"
            type="primary"
            style={{
              backgroundColor: "#14b8a6",
              right: 24,
              bottom: 24,
            }}
            icon={<PlusOutlined />}
            onClick={handleOpenForm}
          />
        </div>
      </div>

      <TransactionForm
        visible={isFormVisible}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />
    </>
  );
};

export default Header;
