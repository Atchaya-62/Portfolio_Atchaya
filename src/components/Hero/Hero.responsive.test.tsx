import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component - Responsive Design', () => {
  const mockProps = {
    name: 'John Doe',
    headline: 'AI & Data Science Explorer',
    subtitle: 'Building intelligent solutions with data',
    aboutSummary: 'Passionate about AI and machine learning.',
    photoUrl: '/images/profile.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  };

  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    // Restore original window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should render hero section on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<Hero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
  });

  it('should render hero section on tablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<Hero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
  });

  it('should render hero section on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Hero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
  });

  it('should have responsive classes applied', () => {
    render(<Hero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toHaveClass('hero-section');
  });

  it('should maintain minimum touch target size for buttons on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Hero {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button);
      const minHeight = parseInt(styles.minHeight);
      expect(minHeight).toBeGreaterThanOrEqual(44);
    });
  });

  it('should maintain minimum touch target size for social icons on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Hero {...mockProps} />);
    const socialLinks = [
      screen.getByRole('link', { name: /linkedin profile/i }),
      screen.getByRole('link', { name: /github profile/i }),
    ];
    
    socialLinks.forEach(link => {
      const styles = window.getComputedStyle(link);
      const width = parseInt(styles.width);
      const height = parseInt(styles.height);
      expect(width).toBeGreaterThanOrEqual(44);
      expect(height).toBeGreaterThanOrEqual(44);
    });
  });

  it('should render all content elements on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Hero {...mockProps} />);
    
    expect(screen.getByText(mockProps.headline)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(mockProps.aboutSummary)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockProps.name}'s photo`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view projects/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });

  it('should render all content elements on tablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<Hero {...mockProps} />);
    
    expect(screen.getByText(mockProps.headline)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(mockProps.aboutSummary)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockProps.name}'s photo`)).toBeInTheDocument();
  });

  it('should render all content elements on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(<Hero {...mockProps} />);
    
    expect(screen.getByText(mockProps.headline)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(mockProps.aboutSummary)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockProps.name}'s photo`)).toBeInTheDocument();
  });

  it('should have proper structure for responsive layout', () => {
    render(<Hero {...mockProps} />);
    
    const section = screen.getByRole('region', { name: /hero section/i });
    const content = section.querySelector('.hero-content');
    const main = section.querySelector('.hero-main');
    
    expect(content).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
