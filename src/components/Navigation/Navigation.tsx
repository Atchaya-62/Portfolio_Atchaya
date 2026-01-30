import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import { ThemeSwitcher } from '../shared';
import './Navigation.css';

interface NavigationProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', type: 'scroll', target: 'hero' },
  { id: 'projects', label: 'Projects', type: 'scroll', target: 'projects' },
  { id: 'connect', label: 'Connect', type: 'route', target: '/connect' },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  activeSection = 'home',
  onNavigate 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentActive, setCurrentActive] = useState(activeSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstMobileMenuItemRef = useRef<HTMLButtonElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCurrentActive(activeSection);
  }, [activeSection]);

  // Determine active state based on current route
  useEffect(() => {
    if (location.pathname === '/connect') {
      setCurrentActive('connect');
    } else if (location.pathname === '/') {
      // On main page, if no specific section is active or we're at the top, default to 'home'
      if (!activeSection || activeSection === 'home') {
        setCurrentActive('home');
      } else {
        setCurrentActive(activeSection);
      }
    }
  }, [location.pathname, activeSection]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first menu item when mobile menu opens
      setTimeout(() => {
        firstMobileMenuItemRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      // Return focus to hamburger button when menu closes
      if (document.activeElement?.closest('.mobile-menu-overlay')) {
        hamburgerButtonRef.current?.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMenuClick = (item: MenuItem) => {
    // Close mobile menu when an item is selected
    setIsMobileMenuOpen(false);
    
    if (item.type === 'scroll') {
      // Scroll to section on the main page
      if (location.pathname !== '/') {
        // Navigate to main page first, then scroll
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.target);
        }, 100);
      } else {
        scrollToSection(item.target);
      }
      
      if (onNavigate) {
        onNavigate(item.id);
      }
    } else if (item.type === 'route') {
      // Navigate to a different page
      navigate(item.target);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHamburgerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: MenuItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMenuClick(item);
    }
  };

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation-container">
        <div className="navigation-brand">
          <motion.a
            href="/"
            className="brand-logo-link"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Home"
          >
            <img src="/logo.svg" alt="AS Logo" className="brand-logo" />
          </motion.a>
        </div>

        {/* Desktop Menu */}
        <ul className="navigation-menu desktop-menu" role="menubar">
          {menuItems.map((item, index) => {
            const isActive = currentActive === item.id;
            
            return (
              <motion.li
                key={item.id}
                className="navigation-item"
                role="none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className={`navigation-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                >
                  <span className="link-text">{item.label}</span>
                  
                  {isActive && (
                    <motion.span
                      className="active-indicator"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>

        {/* Hamburger Menu Button */}
        <div className="navigation-actions">
          <a
            href="https://drive.google.com/file/d/10XjLXwuhQ3g2ySVD2i2beFbVcFSoCFA6/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="action-button cv-button"
            aria-label="View CV (opens in new tab)"
          >
            <svg
              className="button-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="button-text">View CV</span>
          </a>
          <a
            href="mailto:atchayasaran626@gmail.com"
            className="action-button hire-button"
            aria-label="Hire me - Send email"
          >
            <svg
              className="button-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="button-text">Hire Me</span>
          </a>
          <ThemeSwitcher />
          <button
            ref={hamburgerButtonRef}
            className={`hamburger-button ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            onKeyDown={handleHamburgerKeyDown}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            tabIndex={0}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="mobile-menu-overlay"
        id="mobile-menu"
        initial={false}
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: '100%' }
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      >
        <ul className="mobile-menu-list" role="menubar">
          {menuItems.map((item, index) => {
            const isActive = currentActive === item.id;
            const isFirstItem = index === 0;
            
            return (
              <motion.li
                key={item.id}
                className="mobile-menu-item"
                role="none"
                initial={false}
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 20 
                  }
                }}
              >
                <button
                  ref={isFirstItem ? firstMobileMenuItemRef : undefined}
                  className={`mobile-menu-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <span className="link-text">{item.label}</span>
                  
                  {isActive && (
                    <motion.span
                      className="mobile-active-indicator"
                      layoutId="mobileActiveIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navigation;
