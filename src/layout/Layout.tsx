import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ErrorBoundary } from '../components/ErrorBoundary';

function Layout() {
  return (
    <ErrorBoundary>
      <>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-deep"
        >
          Skip to main content
        </a>

        <Navbar />

        {/* Il padding basso lascia spazio alla tab bar mobile */}
        <main id="main-content" className="pb-28 md:pb-0">
          <Outlet />
        </main>
      </>
    </ErrorBoundary>
  );
}

export default Layout;
