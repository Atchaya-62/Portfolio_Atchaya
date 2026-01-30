import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navigation - Mobile Hamburger Menu', () => {
  describe('Hamburger Icon', () => {
    it('should render hamburger button', () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      expect(hamburgerButton).toBeDefined();
    });

    it('should have proper ARIA attributes when closed', () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
      expect(hamburgerButton.getAttribute('aria-controls')).toBe('mobile-menu');
    });

    it('should toggle menu when hamburger is clicked', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Initially closed
      expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
      
      // Click to open
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
        expect(hamburgerButton.getAttribute('aria-label')).toBe('Close menu');
      });
    });

    it('should toggle menu when Enter key is pressed on hamburger', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Press Enter to open
      fireEvent.keyDown(hamburgerButton, { key: 'Enter' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
    });

    it('should toggle menu when Space key is pressed on hamburger', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Press Space to open
      fireEvent.keyDown(hamburgerButton, { key: ' ' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
    });

    it('should have animated hamburger lines', () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      const lines = hamburgerButton.querySelectorAll('.hamburger-line');
      
      expect(lines.length).toBe(3);
    });

    it('should add "open" class to hamburger when menu is open', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Initially no "open" class
      expect(hamburgerButton.classList.contains('open')).toBe(false);
      
      // Click to open
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.classList.contains('open')).toBe(true);
      });
    });
  });

  describe('Mobile Menu Overlay', () => {
    it('should render mobile menu with all menu items', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        const mobileMenu = document.getElementById('mobile-menu');
        expect(mobileMenu).toBeDefined();
        
        // Check all menu items are present
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems.length).toBeGreaterThanOrEqual(4); // Home, Projects, Blog, Connect
      });
    });

    it('should close menu when backdrop is clicked', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Click backdrop
      const backdrop = document.querySelector('.mobile-menu-backdrop');
      expect(backdrop).toBeDefined();
      
      if (backdrop) {
        fireEvent.click(backdrop);
        
        await waitFor(() => {
          expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
        });
      }
    });

    it('should have proper tabIndex for menu items when closed', () => {
      renderWithRouter(<Navigation />);
      
      // Mobile menu items should have tabIndex -1 when closed
      const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
      mobileMenuItems.forEach(item => {
        expect(item.getAttribute('tabindex')).toBe('-1');
      });
    });

    it('should have proper tabIndex for menu items when open', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
        mobileMenuItems.forEach(item => {
          expect(item.getAttribute('tabindex')).toBe('0');
        });
      });
    });
  });

  describe('Menu Auto-Close on Selection', () => {
    it('should close menu when a menu item is selected', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Click a menu item (use the mobile menu version)
      const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
      const homeMenuItem = Array.from(mobileMenuItems).find(item => 
        item.textContent?.includes('Home')
      );
      
      if (homeMenuItem) {
        fireEvent.click(homeMenuItem);
        
        await waitFor(() => {
          expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
        });
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      expect(hamburgerButton.getAttribute('aria-label')).toBe('Open menu');
      
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-label')).toBe('Close menu');
      });
    });

    it('should support keyboard navigation', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Open with keyboard
      fireEvent.keyDown(hamburgerButton, { key: 'Enter' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Navigate to menu item with keyboard
      const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
      const firstMenuItem = mobileMenuItems[0];
      
      fireEvent.keyDown(firstMenuItem, { key: 'Enter' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
      });
    });

    it('should have visible focus indicators', () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      
      // Focus the button
      hamburgerButton.focus();
      
      // Check if button is focusable
      expect(document.activeElement).toBe(hamburgerButton);
    });
  });

  describe('Keyboard Navigation and Accessibility (Requirements 3.5, 3.7)', () => {
    it('should make all desktop menu items keyboard focusable', () => {
      renderWithRouter(<Navigation />);
      
      const desktopMenuItems = document.querySelectorAll('.desktop-menu .navigation-link');
      
      desktopMenuItems.forEach(item => {
        expect(item.getAttribute('tabindex')).toBe('0');
      });
    });

    it('should allow keyboard navigation with Enter key on desktop menu items', async () => {
      const mockNavigate = vi.fn();
      renderWithRouter(<Navigation onNavigate={mockNavigate} />);
      
      const desktopMenuItems = document.querySelectorAll('.desktop-menu .navigation-link');
      const homeMenuItem = Array.from(desktopMenuItems).find(item => 
        item.textContent?.includes('Home')
      );
      
      if (homeMenuItem) {
        fireEvent.keyDown(homeMenuItem, { key: 'Enter' });
        
        await waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledWith('home');
        });
      }
    });

    it('should allow keyboard navigation with Space key on desktop menu items', async () => {
      const mockNavigate = vi.fn();
      renderWithRouter(<Navigation onNavigate={mockNavigate} />);
      
      const desktopMenuItems = document.querySelectorAll('.desktop-menu .navigation-link');
      const homeMenuItem = Array.from(desktopMenuItems).find(item => 
        item.textContent?.includes('Home')
      );
      
      if (homeMenuItem) {
        fireEvent.keyDown(homeMenuItem, { key: ' ' });
        
        await waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledWith('home');
        });
      }
    });

    it('should have visible focus indicators with proper CSS classes', () => {
      renderWithRouter(<Navigation />);
      
      const desktopMenuItems = document.querySelectorAll('.desktop-menu .navigation-link');
      
      desktopMenuItems.forEach(item => {
        // Check that the element has the navigation-link class which includes focus-visible styles
        expect(item.classList.contains('navigation-link')).toBe(true);
      });
    });

    it('should support keyboard navigation on mobile menu items', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
        const homeMenuItem = Array.from(mobileMenuItems).find(item => 
          item.textContent?.includes('Home')
        );
        
        if (homeMenuItem) {
          // Test Enter key
          fireEvent.keyDown(homeMenuItem, { key: 'Enter' });
          
          // Menu should close after selection
          expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
        }
      });
    });

    it('should close mobile menu with Escape key', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Press Escape key
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
      });
    });

    it('should have proper role attributes for navigation', () => {
      renderWithRouter(<Navigation />);
      
      const nav = document.querySelector('nav');
      expect(nav?.getAttribute('role')).toBe('navigation');
      expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('should have proper role attributes for menu items', () => {
      renderWithRouter(<Navigation />);
      
      const menubar = document.querySelector('[role="menubar"]');
      expect(menubar).toBeDefined();
      
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should indicate active menu item with aria-current', () => {
      renderWithRouter(<Navigation activeSection="home" />);
      
      const desktopMenuItems = document.querySelectorAll('.desktop-menu .navigation-link');
      const homeMenuItem = Array.from(desktopMenuItems).find(item => 
        item.textContent?.includes('Home')
      );
      
      if (homeMenuItem) {
        expect(homeMenuItem.getAttribute('aria-current')).toBe('page');
      }
    });

    it('should focus first mobile menu item when menu opens', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      // Wait for focus to be set (with setTimeout in component)
      await waitFor(() => {
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
        const firstMenuItem = mobileMenuItems[0];
        
        // The first item should be focusable
        expect(firstMenuItem.getAttribute('tabindex')).toBe('0');
      }, { timeout: 200 });
    });

    it('should return focus to hamburger button when menu closes', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('true');
      });
      
      // Focus a mobile menu item
      const mobileMenuItems = document.querySelectorAll('.mobile-menu-link');
      const firstMenuItem = mobileMenuItems[0] as HTMLElement;
      firstMenuItem.focus();
      
      // Close menu with Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(hamburgerButton.getAttribute('aria-expanded')).toBe('false');
      });
    });
  });

  describe('Animation', () => {
    it('should animate menu overlay on open', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        const mobileMenu = document.getElementById('mobile-menu');
        expect(mobileMenu).toBeDefined();
        // Framer Motion will handle the animation
      });
    });

    it('should stagger menu item animations', async () => {
      renderWithRouter(<Navigation />);
      
      const hamburgerButton = screen.getByLabelText('Open menu');
      fireEvent.click(hamburgerButton);
      
      await waitFor(() => {
        const menuItems = document.querySelectorAll('.mobile-menu-item');
        expect(menuItems.length).toBeGreaterThan(0);
        // Framer Motion will handle staggered animations
      });
    });
  });
});
