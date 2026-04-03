import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ErrorBoundary } from '../components/ErrorBoundary';

function Layout() {
  return (
    <ErrorBoundary>
      <>
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-500 focus:text-white focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="min-h-screen pb-24 md:pb-0">
          <Outlet />
        </main>
      </>
    </ErrorBoundary>
  );
}

export default Layout;