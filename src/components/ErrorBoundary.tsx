import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Props interface for ErrorBoundary component
 */
interface Props {
  children: ReactNode; // The components to wrap and protect from errors
  fallback?: ReactNode; // Optional custom error UI to display when error occurs
}

/**
 * State interface for ErrorBoundary component
 */
interface State {
  hasError: boolean; // Flag indicating if an error has been caught
  error: Error | null; // The actual error object (if any)
}

/**
 * ErrorBoundary Component
 * 
 * A React error boundary that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI instead of
 * crashing the entire application.
 * 
 * Error boundaries are React's way of handling errors gracefully in production.
 * They work like a JavaScript catch {} block, but for components.
 * 
 * Use cases:
 * - Wrap around feature components that might fail
 * - Wrap around third-party components
 * - Use at app level to prevent white screen of death
 * 
 * Note: Error boundaries do NOT catch errors in:
 * - Event handlers (use try/catch)
 * - Asynchronous code (e.g., setTimeout, promises)
 * - Server-side rendering
 * - Errors thrown in the error boundary itself
 * 
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * @example with custom fallback
 * <ErrorBoundary fallback={<CustomErrorPage />}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  /**
   * Initialize component state
   * By default, no error has occurred
   */
  public state: State = {
    hasError: false,
    error: null
  };

  /**
   * Static lifecycle method called when an error is thrown
   * This method is called during the "render" phase, so side effects are not allowed
   * 
   * @param {Error} error - The error that was thrown
   * @returns {State} - New state indicating an error has occurred
   */
  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error has been thrown
   * This method is called during the "commit" phase, so side effects ARE allowed
   * Use this for error logging services
   * 
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Object with componentStack key containing info about which component threw the error
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console for development
    console.error('Uncaught error:', error, errorInfo);
    
    // TODO: In production, send error details to error reporting service
    // Example services: Sentry, LogRocket, Bugsnag
    // if (process.env.NODE_ENV === 'production') {
    //   errorReportingService.logError(error, errorInfo);
    // }
  }

  /**
   * Reset error state to try rendering children again
   * This allows users to recover from errors without refreshing the page
   */
  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Note: This will attempt to render the children again
    // If the error condition still exists, it will error again
  };

  /**
   * Render method
   * Shows either the children (normal case) or error UI (error case)
   */
  public render() {
    // Check if an error has been caught
    if (this.state.hasError) {
      // If custom fallback UI was provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        // Full screen centered container with gray background
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          {/* Error card container with shadow for depth */}
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            {/* Error header with icon */}
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Something went wrong</h2>
            </div>
            
            {/* Error message */}
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            {/* Action buttons */}
            <div className="flex space-x-3">
              {/* Try Again button - attempts to reset error state */}
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Try Again
              </button>
              
              {/* Refresh button - hard refresh of the page */}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Refresh Page
              </button>
            </div>
            
            {/* Development-only error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-4 bg-gray-100 rounded text-xs">
                <summary className="cursor-pointer font-semibold">Error Details (Dev Only)</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error occurred, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;