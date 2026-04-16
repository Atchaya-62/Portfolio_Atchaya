import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { PageTransition } from './components/shared';

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
  return (
    <Router>
      <div className="app-container">
        <PageTransition />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
