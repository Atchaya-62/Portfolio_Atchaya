import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoadingScreen from './components/LoadingScreen';

// Lazy load route components for code splitting
const ConnectPage = lazy(() => import('./pages/ConnectPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontSize: '1.5rem',
      color: 'var(--color-text)'
    }}
    role="status"
    aria-live="polite"
  >
    Loading...
  </div>
);

function App() {
  // Always show loading screen on mount (every page load/reload)
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Reset loading screen on route changes
  useEffect(() => {
    setShowLoading(true);
  }, []);

  return (
    <>
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <Router>
        <div className="app-container">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<MainPage isLoading={showLoading} />} />
              <Route path="/connect" element={<ConnectPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  );
}

export default App;
