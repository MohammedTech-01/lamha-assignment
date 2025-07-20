import React, { useState, useEffect } from 'react';
import { Menu, Drawer, Avatar, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { 
  Home, 
  TrendingUp, 
  PieChart, 
  Receipt, 
  CreditCard, 
  FileText, 
  Settings,
  Users,
  DollarSign,
  X
} from 'lucide-react';
import { SidebarItem, SidebarProps } from '../types';

const { Text } = Typography;

const Sidebar: React.FC<SidebarProps> = ({ 
  className = '', 
  isMobileOpen = false, 
  onMobileClose 
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('transaction');
  const [openKeys, setOpenKeys] = useState<string[]>(['tax-report']);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Convert to Ant Design menu items
  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <Home className="w-4 h-4" />,
      label: 'Home',
    },
    {
      key: 'cash-flow',
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'Cash Flow',
    },
    {
      key: 'budget',
      icon: <PieChart className="w-4 h-4" />,
      label: 'Budget',
    },
    {
      key: 'transaction',
      icon: <Receipt className="w-4 h-4" />,
      label: 'Transaction',
    },
    {
      key: 'invoice',
      icon: <FileText className="w-4 h-4" />,
      label: 'Invoice',
    },
    {
      key: 'bill-pay',
      icon: <CreditCard className="w-4 h-4" />,
      label: 'Bill Pay',
    },
    {
      key: 'tax-report',
      icon: <DollarSign className="w-4 h-4" />,
      label: 'Tax Report',
      children: [
        {
          key: 'vat',
          label: 'VAT',
        },
        {
          key: 'withholding',
          label: 'Withholding',
        },
      ],
    },
    {
      key: 'card',
      icon: <CreditCard className="w-4 h-4" />,
      label: 'Card',
    },
    {
      key: 'team',
      icon: <Users className="w-4 h-4" />,
      label: 'Team',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
  };

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lamha.webp"
            alt="Logo" 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-12 h-10 bg-teal-500 rounded-lg hidden items-center justify-center">
            <span className="text-white font-bold text-sm">Lamha</span>
          </div>
        </div>
        {/* Close button for mobile/tablet */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation Menu using Ant Design */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
          items={menuItems}
          className="border-r-0"
          style={{ 
            borderRight: 'none',
            background: 'transparent'
          }}
        />
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <Space size="middle" className="w-full">
          <Avatar 
            size={32} 
            style={{ backgroundColor: '#14b8a6' }}
          >
            AA
          </Avatar>
          <div className="flex-1">
            <Text strong className="block text-sm">Ahmed Abbas</Text>
            <Text type="secondary" className="text-xs">Admin</Text>
          </div>
          <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </Space>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Only visible on large screens */}
      <div className={`hidden lg:block w-64 h-screen ${className}`}>
        {sidebarContent}
      </div>

      {/* Mobile/Tablet Sidebar using Ant Design Drawer */}
      <Drawer
        placement="left"
        open={isMobileOpen}
        onClose={onMobileClose}
        width={256}
        closable={false}
        bodyStyle={{ padding: 0 }}
        className="lg:hidden"
        style={{ padding: 0 }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;