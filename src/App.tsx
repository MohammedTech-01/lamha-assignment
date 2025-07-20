import React, { useState, useEffect } from 'react';
import { ConfigProvider, Spin, Alert, Empty, theme } from 'antd';
import Layout from './components/Layout';
import TransactionTable from './components/TransactionTable';
import ErrorBoundary from './components/ErrorBoundary';
import { Transaction } from './types';
import 'antd/dist/reset.css';

// Ant Design theme configuration
const customTheme = {
  token: {
    colorPrimary: '#14b8a6', // Teal color matching your design
    borderRadius: 8,
  },
  algorithm: theme.defaultAlgorithm,
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching transactions with error handling
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch transactions. Please check your connection.');
      }

      // Sample transaction data
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          date: '2024-01-15',
          member: 'John Doe',
          budget: 'Marketing',
          type: 'Expense',
          vendor: 'ABC Company',
          invoiceNumber: 'INV-001',
          amount: 1500.00,
          status: 'Approved'
        },
        {
          id: '2',
          date: '2024-01-16',
          member: 'Jane Smith',
          budget: 'Operations',
          type: 'Expense',
          vendor: 'XYZ Corp',
          invoiceNumber: 'INV-002',
          amount: 2750.50,
          status: 'Pending'
        },
        {
          id: '3',
          date: '2024-01-17',
          member: 'Mike Johnson',
          budget: 'IT',
          type: 'Purchase',
          vendor: 'Tech Solutions',
          invoiceNumber: 'INV-003',
          amount: 5000.00,
          status: 'Approved'
        },
        {
          id: '4',
          date: '2024-01-18',
          member: 'Sarah Wilson',
          budget: 'HR',
          type: 'Service',
          vendor: 'Consulting Inc',
          invoiceNumber: 'INV-004',
          amount: 3200.00,
          status: 'Pending'
        },
        {
          id: '5',
          date: '2024-01-19',
          member: 'Tom Brown',
          budget: 'Sales',
          type: 'Expense',
          vendor: 'Travel Agency',
          invoiceNumber: 'INV-005',
          amount: 1800.75,
          status: 'Approved'
        }
      ];

      setTransactions(mockTransactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleRetry = () => {
    fetchTransactions();
  };

  return (
    <ConfigProvider theme={customTheme}>
      <ErrorBoundary>
        <Layout>
          <div className="p-4 md:p-6">
            {loading && (
              <div className="flex items-center justify-center h-64">
                <Spin size="large" tip="Loading transactions..." />
              </div>
            )}
            
            {error && !loading && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                action={
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Try Again
                  </button>
                }
              />
            )}
            
            {!loading && !error && transactions.length === 0 && (
              <Empty
                description={
                  <span>
                    No transactions found<br />
                    <span className="text-sm text-gray-400">Create a new transaction to get started</span>
                  </span>
                }
              />
            )}
            
            {!loading && !error && transactions.length > 0 && (
              <TransactionTable transactions={transactions} />
            )}
          </div>
        </Layout>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;