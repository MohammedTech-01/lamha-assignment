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
import lamhaLogo from '../assets/lamha.webp';

const { Text } = Typography;

/**
 * Sidebar Component
 * 
 * A responsive navigation sidebar that adapts to different screen sizes:
 * - Desktop (lg and up): Fixed sidebar on the left side
 * - Mobile/Tablet (below lg): Drawer that slides in from the left
 * 
 * Features:
 * - Company logo/branding at the top
 * - Hierarchical navigation menu with icons
 * - User profile section at the bottom
 * - Collapsible submenu for Tax Report section
 * 
 * @param {SidebarProps} props - Component props
 * @param {string} props.className - Optional CSS classes to apply to desktop sidebar
 * @param {boolean} props.isMobileOpen - Controls mobile drawer visibility
 * @param {Function} props.onMobileClose - Callback when mobile drawer should close
 */
const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  isMobileOpen = false,
  onMobileClose
}) => {
  // Track which menu item is currently selected (default: transaction)
  const [selectedKey, setSelectedKey] = useState<string>('transaction');
  
  // Track which submenus are expanded (default: tax-report is open)
  const [openKeys, setOpenKeys] = useState<string[]>(['tax-report']);

  /**
   * Effect to prevent body scrolling when mobile sidebar is open
   * This improves mobile UX by preventing background content from scrolling
   * while the drawer is open
   */
  useEffect(() => {
    if (isMobileOpen) {
      // Disable body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when drawer is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  /**
   * Menu items configuration
   * Each item represents a navigation option in the sidebar
   * Icons are from lucide-react for consistency
   */
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
      label: 'Transaction', // This is selected by default
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
      // Submenu items for tax-related features
      children: [
        {
          key: 'vat',
          label: 'VAT', // Value Added Tax
        },
        {
          key: 'withholding',
          label: 'Withholding', // Withholding tax
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

  /**
   * Handle menu item click
   * Updates the selected menu item when user clicks
   * 
   * @param {MenuInfo} e - Click event info from Ant Design Menu
   */
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key);
    // Note: In a real app, you'd typically also handle navigation here
    // e.g., navigate(`/${e.key}`);
  };

  /**
   * Handle submenu expand/collapse
   * Controls which submenus are open (currently only Tax Report has children)
   * 
   * @param {string[]} keys - Array of open submenu keys
   */
  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  /**
   * Sidebar content component
   * Extracted as a separate variable to reuse in both desktop and mobile views
   */
  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header Section: Logo/Brand and mobile close button */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Company logo with error handling */}
          <img
            src={lamhaLogo}
            alt="Logo"
            className="w-8 h-8 object-contain"
            onError={(e) => {
              // If logo fails to load, hide it and show fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback logo display (hidden by default) */}
          <div className="w-12 h-10 bg-teal-500 rounded-lg hidden items-center justify-center">
            <span className="text-white font-bold text-sm">Lamha</span>
          </div>
        </div>
        
        {/* Close button - only visible on mobile/tablet (hidden on lg screens) */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline" // Vertical menu layout
          selectedKeys={[selectedKey]} // Currently selected item
          openKeys={openKeys} // Currently expanded submenus
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
          items={menuItems}
          className="border-r-0"
          style={{
            borderRight: 'none', // Remove default Ant Design border
            background: 'transparent'
          }}
        />
      </div>

      {/* Footer Section: User Profile */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <Space size="middle" className="w-full">
          {/* User avatar with initials */}
          <Avatar
            size={32}
            style={{ backgroundColor: '#14b8a6' }} // Teal color matching the brand
          >
            AA {/* User initials - should be dynamic in real app */}
          </Avatar>
          
          {/* User info */}
          <div className="flex-1">
            <Text strong className="block text-sm">Ahmed Abbas</Text>
            <Text type="secondary" className="text-xs">Admin</Text>
          </div>
          
          {/* Settings icon - clickable but action not implemented */}
          <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </Space>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar 
          - hidden lg:block: Hidden on mobile/tablet, visible on large screens
          - Fixed width of 256px (w-64)
          - Full height of viewport (h-screen)
      */}
      <div className={`hidden lg:block w-64 h-screen ${className}`}>
        {sidebarContent}
      </div>

      {/* Mobile/Tablet Sidebar 
          - Uses Ant Design Drawer component for slide-in effect
          - Only rendered on screens smaller than lg breakpoint
          - Controlled by isMobileOpen prop from parent component
      */}
      <Drawer
        placement="left" // Slides in from the left side
        open={isMobileOpen} // Visibility controlled by parent
        onClose={onMobileClose} // Callback when user tries to close
        width={256} // Same width as desktop sidebar
        closable={false} // We use custom close button, not Drawer's default
        bodyStyle={{ padding: 0 }} // Remove default padding
        className="lg:hidden" // Only visible on mobile/tablet
        style={{ padding: 0 }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;