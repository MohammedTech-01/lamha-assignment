import React, { useState } from 'react';
import { Layout as AntLayout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Header from './Header';
import { LayoutProps } from '../types';

const { Content } = AntLayout;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile/Tablet Header - Shows hamburger menu */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileSidebar}
              aria-label="Toggle menu"
            />
            <h1 className="text-lg font-semibold text-gray-900">Transaction</h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Desktop Header - Only on large screens */}
        <div className="hidden lg:block">
          <Header title="Transaction" />
        </div>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Tablet shows full Header content with filters */}
          <div className="lg:hidden">
            <div className="bg-white px-4 py-3 border-b border-gray-200">
              <Header title="Transaction" />
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;