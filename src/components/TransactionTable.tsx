import React from 'react';
import { Table, Tag, Card, Space, Typography, Dropdown, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { MoreOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Transaction, TransactionTableProps } from '../types';

const { Text, Title } = Typography;

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const getStatusTag = (status: string) => {
    return (
      <Tag color={status === 'Approved' ? 'success' : 'warning'}>
        {status}
      </Tag>
    );
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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
      danger: true,
    },
  ];

  const columns: ColumnsType<Transaction> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
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
      render: (amount) => formatAmount(amount),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown menu={{ items: actionItems }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Mobile Card View
  const MobileTransactionCard = ({ transaction }: { transaction: Transaction }) => (
    <Card className="mb-3" hoverable>
      <div className="flex justify-between items-start mb-2">
        <Space direction="vertical" size={0}>
          <Text strong>{transaction.vendor}</Text>
          <Text type="secondary" className="text-xs">{transaction.date}</Text>
        </Space>
        <Space>
          {getStatusTag(transaction.status)}
          <Dropdown menu={{ items: actionItems }} trigger={['click']}>
            <Button type="text" icon={<EllipsisOutlined />} size="small" />
          </Dropdown>
        </Space>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <Text type="secondary" className="text-xs">Member</Text>
          <div><Text>{transaction.member}</Text></div>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Amount</Text>
          <div><Text strong>{formatAmount(transaction.amount)}</Text></div>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Budget</Text>
          <div><Text>{transaction.budget}</Text></div>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Type</Text>
          <div><Text>{transaction.type}</Text></div>
        </div>
      </div>
      
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
      {/* Desktop/Tablet Table View - Shows on tablets and larger */}
      <div className="hidden sm:block">
        <Table
          columns={columns}
          dataSource={transactions.map(t => ({ ...t, key: t.id }))}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
        />
      </div>

      {/* Mobile Card View - Only on mobile */}
      <div className="sm:hidden">
        {transactions.map((transaction) => (
          <MobileTransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  );
};

export default TransactionTable;