import React from 'react';
import { Table, Tag, Card, Space, Typography, Dropdown, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { MoreOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Transaction, TransactionTableProps } from '../types';
import { SaudiRiyal } from 'lucide-react';

const { Text, Title } = Typography;

/**
 * TransactionTable Component
 * 
 * A responsive table component that displays financial transactions.
 * - Desktop/Tablet: Shows data in a traditional table format
 * - Mobile: Shows data as stacked cards for better mobile UX
 * 
 * @param {TransactionTableProps} props - Component props
 * @param {Transaction[]} props.transactions - Array of transaction objects to display
 */
const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  
  /**
   * Renders a colored status tag based on the transaction status
   * @param {string} status - Transaction status ('Approved' or 'Pending')
   * @returns {JSX.Element} Ant Design Tag component with appropriate color
   */
  const getStatusTag = (status: string) => {
    return (
      <Tag color={status === 'Approved' ? 'success' : 'warning'}>
        {status}
      </Tag>
    );
  };

  /**
   * Formats a number to Saudi locale format (e.g., 1,234.56)
   * @param {number} amount - The amount to format
   * @returns {string} Formatted number string
   */
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      // Using Saudi Arabia locale for number formatting
      // This will format numbers with commas as thousand separators
    }).format(amount);
  };

  // Type definition for the AmountWithIcon component props
  type AmountProps = {
    amount: number;
  };

  /**
   * Component that displays an amount with the Saudi Riyal currency icon
   * @param {AmountProps} props - Component props containing the amount
   * @returns {JSX.Element} Formatted amount with currency icon
   */
  const AmountWithIcon = ({ amount }: AmountProps) => {
    return (
      <div className="flex items-center gap-1 text-gray-800">
        {/* Saudi Riyal icon from lucide-react */}
        <SaudiRiyal className="w-3 h-3 text-black" />
        <span>{formatAmount(amount)}</span>
      </div>
    );
  };

  /**
   * Dropdown menu items for row actions
   * Each transaction row has these action options
   */
  const actionItems: MenuProps['items'] = [
    {
      key: 'view',
      label: 'View Details',
    },
    {
      key: 'edit',
      label: 'Edit',
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true, // Makes the delete option appear in red
    },
  ];

  /**
   * Table column configuration for the desktop view
   * Defines how each column should render and what data it displays
   */
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Status',
      dataIndex: 'status', // Maps to transaction.status
      key: 'status',
      render: (status) => getStatusTag(status), // Custom render for status tags
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <AmountWithIcon amount={amount} />, // Custom render with icon
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        // Dropdown menu for row actions (view, edit, delete)
        <Dropdown menu={{ items: actionItems }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  /**
   * Mobile Card Component
   * Renders a single transaction as a card for mobile devices
   * 
   * @param {Object} props - Component props
   * @param {Transaction} props.transaction - Single transaction object to display
   */
  const MobileTransactionCard = ({ transaction }: { transaction: Transaction }) => (
    <Card className="mb-3" hoverable>
      {/* Card Header: Vendor info and status */}
      <div className="flex justify-between items-start mb-2">
        {/* Left side: Vendor name and date */}
        <Space direction="vertical" size={0}>
          <Text strong>{transaction.vendor}</Text>
          <Text type="secondary" className="text-xs">{transaction.date}</Text>
        </Space>
        
        {/* Right side: Status tag and actions dropdown */}
        <Space>
          {getStatusTag(transaction.status)}
          <Dropdown menu={{ items: actionItems }} trigger={['click']}>
            <Button type="text" icon={<EllipsisOutlined />} size="small" />
          </Dropdown>
        </Space>
      </div>

      {/* Card Body: Transaction details in a 2-column grid */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {/* Member field */}
        <div>
          <Text type="secondary" className="text-xs">Member</Text>
          <div><Text>{transaction.member}</Text></div>
        </div>
        
        {/* Amount field with currency icon */}
        <div>
          <Text type="secondary" className="text-xs">Amount</Text>
          <div><Text strong><AmountWithIcon amount={transaction.amount} /></Text></div>
        </div>
        
        {/* Budget field */}
        <div>
          <Text type="secondary" className="text-xs">Budget</Text>
          <div><Text>{transaction.budget}</Text></div>
        </div>
        
        {/* Type field */}
        <div>
          <Text type="secondary" className="text-xs">Type</Text>
          <div><Text>{transaction.type}</Text></div>
        </div>
      </div>

      {/* Optional invoice number - only shown if it exists */}
      {transaction.invoiceNumber && (
        <div className="mt-2">
          <Text type="secondary" className="text-xs">Invoice #: </Text>
          <Text className="text-xs">{transaction.invoiceNumber}</Text>
        </div>
      )}
    </Card>
  );

  return (
    <>
      {/* Desktop/Tablet Table View 
          - hidden sm:block: Hidden on mobile, visible on small screens and up
          - Uses Ant Design Table component for traditional table layout
      */}
      <div className="hidden sm:block">
        <Table
          columns={columns}
          // Add unique key to each row for React rendering optimization
          dataSource={transactions.map(t => ({ ...t, key: t.id }))}
          pagination={{
            pageSize: 10, // Show 10 items per page by default
            showSizeChanger: true, // Allow users to change page size
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Display item count
          }}
          scroll={{ x: 800 }} // Enable horizontal scroll for smaller screens
        />
      </div>

      {/* Mobile Card View 
          - sm:hidden: Only visible on mobile (hidden on small screens and up)
          - Renders each transaction as a card for better mobile experience
      */}
      <div className="sm:hidden">
        {transactions.map((transaction) => (
          <MobileTransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  );
};

export default TransactionTable;