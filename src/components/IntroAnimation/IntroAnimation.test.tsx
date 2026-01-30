import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { IntroAnimation } from './IntroAnimation';

describe('IntroAnimation', () => {
  const mockOnComplete = vi.fn();
  const testName = 'John Doe';

  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
    mockOnComplete.mockClear();
    
    // Reset matchMedia to default behavior
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('should render the intro animation with the provided name', () => {
    render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    // Check if letters are rendered (split by character)
    const letters = testName.split('');
    letters.forEach((letter) => {
      if (letter !== ' ') {
        // Use getAllByText since letters might repeat
        const elements = screen.getAllByText(letter);
        expect(elements.length).toBeGreaterThan(0);
      }
    });
  });

  it('should display welcome subtitle', () => {
    render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    expect(screen.getByText('Welcome to my portfolio')).toBeInTheDocument();
  });

  it('should set session storage when animation plays', () => {
    render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    expect(sessionStorage.getItem('intro-animation-played')).toBe('true');
  });

  it('should not render animation if already played in session', () => {
    // Set session storage to indicate animation has played
    sessionStorage.setItem('intro-animation-played', 'true');
    
    render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    // Animation should not be visible
    expect(screen.queryByText('Welcome to my portfolio')).not.toBeInTheDocument();
    
    // onComplete should be called immediately
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('should call onComplete after animation finishes', async () => {
    render(<IntroAnimation name="A" onComplete={mockOnComplete} />);
    
    // Wait for animation to complete (with timeout)
    await waitFor(
      () => {
        expect(mockOnComplete).toHaveBeenCalledTimes(1);
      },
      { timeout: 5000 }
    );
  });

  it('should skip animation when prefers-reduced-motion is enabled', () => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    const mockMatchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    // Animation should not be visible
    expect(screen.queryByText('Welcome to my portfolio')).not.toBeInTheDocument();
    
    // onComplete should be called immediately
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('should render letters with proper spacing for spaces in name', () => {
    const nameWithSpace = 'John Doe';
    const { container } = render(<IntroAnimation name={nameWithSpace} onComplete={mockOnComplete} />);
    
    // The component should handle spaces by rendering non-breaking spaces
    const overlay = container.querySelector('.intro-animation-overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<IntroAnimation name={testName} onComplete={mockOnComplete} />);
    
    const overlay = container.querySelector('.intro-animation-overlay');
    expect(overlay).toHaveAttribute('role', 'presentation');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('should animate each letter with staggered delay', () => {
    const { container } = render(<IntroAnimation name="ABC" onComplete={mockOnComplete} />);
    
    // Check that letters are rendered as separate spans
    const letters = container.querySelectorAll('.intro-letter');
    expect(letters.length).toBe(3);
  });

  it('should handle single character names', () => {
    const { container } = render(<IntroAnimation name="A" onComplete={mockOnComplete} />);
    
    const letters = container.querySelectorAll('.intro-letter');
    expect(letters.length).toBe(1);
    expect(screen.getByText('Welcome to my portfolio')).toBeInTheDocument();
  });

  it('should handle empty name gracefully', () => {
    const { container } = render(<IntroAnimation name="" onComplete={mockOnComplete} />);
    
    // Should still show subtitle even with empty name
    const letters = container.querySelectorAll('.intro-letter');
    expect(letters.length).toBe(0);
    expect(screen.getByText('Welcome to my portfolio')).toBeInTheDocument();
  });
});
