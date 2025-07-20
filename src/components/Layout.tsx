import React, { useState } from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Header from './Header';
import { LayoutProps } from '../types';

/**
 * Layout Component
 * 
 * Main application layout wrapper that provides the overall structure:
 * - Sidebar navigation (responsive)
 * - Header with title and filters
 * - Main content area
 * 
 * Responsive behavior:
 * - Desktop (lg+): Fixed sidebar on left, header at top of content area
 * - Tablet/Mobile (<lg): Collapsible sidebar drawer, simplified mobile header
 * 
 * @param {LayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Page content to render in the main area
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  /**
   * State to control mobile sidebar visibility
   * Only relevant on screens smaller than lg breakpoint
   */
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  /**
   * Toggle mobile sidebar open/closed
   * Called when user taps the hamburger menu button
   */
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  /**
   * Close mobile sidebar
   * Called when user:
   * - Taps the X button in the sidebar
   * - Taps outside the sidebar (backdrop)
   * - Selects a navigation item (future enhancement)
   */
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    // Root container - full height flex container with gray background
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component
          - On desktop: Always visible fixed sidebar
          - On mobile/tablet: Drawer that slides in/out
      */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      
      {/* Main Content Area - Takes remaining space after sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile/Tablet Header Bar
            - lg:hidden: Only visible on screens smaller than lg
            - Contains hamburger menu, page title, and spacer for centering
            - This is a simplified header for mobile devices
        */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger menu button to toggle sidebar */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileSidebar}
              aria-label="Toggle menu" // Accessibility label
            />
            
            {/* Page title - centered in mobile header */}
            <h1 className="text-lg font-semibold text-gray-900">Transaction</h1>
            
            {/* Empty spacer to balance the layout and center the title */}
            <div className="w-9"></div>
          </div>
        </div>

        {/* Desktop Header
            - hidden lg:block: Only visible on lg screens and larger
            - Shows full header with filters and actions
            - Note: This header is outside the scrollable area on desktop
        */}
        <div className="hidden lg:block">
          <Header title="Transaction" />
        </div>
        
        {/* Main Content Container */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Tablet-specific Header
              - This creates a unique tablet experience where the full Header
                component (with filters) is shown within the scrollable area
              - lg:hidden: Hidden on desktop where Header is fixed at top
              - This allows tablets to have mobile-style navigation but 
                desktop-style filtering capabilities
          */}
          <div className="lg:hidden">
            <div className="bg-white px-4 py-3 border-b border-gray-200">
              <Header title="Transaction" />
            </div>
          </div>
          
          {/* Page Content
              - This is where the actual page components are rendered
              - Could be transaction tables, forms, dashboards, etc.
              - Content is scrollable when it exceeds viewport height
          */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;