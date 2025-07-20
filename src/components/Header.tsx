import React, { useState } from 'react';
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
  FloatButton
} from 'antd';
import type { MenuProps } from 'antd';
import { 
  SearchOutlined, 
  DownOutlined, 
  PlusOutlined,
  CalendarOutlined 
} from '@ant-design/icons';
import { HeaderProps } from '../types';
import { validateSearchQuery, validateDateRange, validateStatus } from '../utils/validation';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('transaction');

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'reimbursement',
      label: 'Request reimbursement',
      onClick: () => message.info('Request reimbursement clicked!'),
    },
    {
      key: 'export',
      label: 'Export data',
      onClick: () => message.info('Export data clicked!'),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => message.info('Settings clicked!'),
    },
  ];

  const handleSearch = (value: string) => {
    const validation = validateSearchQuery(value);
    if (!validation.isValid) {
      message.error(validation.error);
    } else {
      // Perform search
      console.log('Searching for:', value);
    }
  };

  const handleStatusChange = (value: string) => {
    const validation = validateStatus(value);
    if (!validation.isValid) {
      message.error(validation.error);
    } else {
      // Apply filter
      console.log('Status filter:', value);
    }
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const dateRange = `${dates[0].format('YYYY-MM-DD')} - ${dates[1].format('YYYY-MM-DD')}`;
      const validation = validateDateRange(dateRange);
      if (!validation.isValid) {
        message.error(validation.error);
      } else {
        // Apply date filter
        console.log('Date range:', dateRange);
      }
    }
  };

  return (
    <div className="bg-white lg:border-b lg:border-gray-200">
      <div className="lg:px-6 lg:py-4">
        {/* Title and Action Buttons - Hidden on mobile/tablet, shown on desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <Space size="middle">
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <Button>
                Other action <DownOutlined />
              </Button>
            </Dropdown>
            <Button type="primary" style={{ backgroundColor: '#14b8a6' }}>
              Create New
            </Button>
          </Space>
        </div>

        {/* Tabs Section */}
        <div className="mb-4 md:mb-6">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={[
              { key: 'transaction', label: 'Transaction' },
              { key: 'draft', label: 'Draft' },
            ]}
          />
        </div>

        {/* Search and Filters using Ant Design Form */}
        <Form form={form} layout="inline" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            {/* Search */}
            <Form.Item className="flex-1 sm:max-w-md mb-0">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                allowClear
                size="large"
              />
            </Form.Item>

            <Space wrap size="middle">
              {/* Status Filter */}
              <Form.Item className="mb-0">
                <Select
                  placeholder="Status"
                  style={{ width: 120 }}
                  onChange={handleStatusChange}
                  allowClear
                  size="large"
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'approved', label: 'Approved' },
                  ]}
                />
              </Form.Item>

              {/* Date Range Filter - Hidden on mobile, shown on tablet and up */}
              <Form.Item className="hidden sm:block mb-0">
                <RangePicker
                  size="large"
                  onChange={handleDateRangeChange}
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Space>
          </div>
        </Form>

        {/* Mobile/Tablet Floating Action Button using Ant Design */}
        <FloatButton
          className="lg:hidden"
          type="primary"
          style={{ backgroundColor: '#14b8a6', right: 24, bottom: 24 }}
          icon={<PlusOutlined />}
          onClick={() => message.info('Create new clicked!')}
        />
      </div>
    </div>
  );
};

export default Header;