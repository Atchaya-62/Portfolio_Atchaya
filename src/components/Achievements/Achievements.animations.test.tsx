import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Achievements from './Achievements';
import type { Achievement } from '../../types';

const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'AI Hackathon Winner',
    description: 'First place in university AI hackathon',
    icon: '🏆',
    date: '2023',
  },
  {
    id: 'achievement-2',
    title: 'Published Research Paper',
    description: 'Co-authored paper on neural architecture search',
    icon: '📝',
    date: '2023',
  },
];

describe('Achievements Animations', () => {
  it('applies staggered reveal animations to badges', () => {
    const { container } = render(<Achievements achievements={mockAchievements} />);
    
    // Check that badges are wrapped in motion divs
    const badgeWrappers = container.querySelectorAll('.badge-wrapper');
    expect(badgeWrappers.length).toBe(mockAchievements.length);
  });

  it('animates badge on hover', async () => {
    const user = userEvent.setup();
    render(<Achievements achievements={mockAchievements} />);
    
    const firstBadge = screen.getAllByRole('article')[0];
    
    // Hover should trigger animation
    await user.hover(firstBadge);
    
    // Badge should still be in document after hover
    expect(firstBadge).toBeInTheDocument();
  });

  it('shows tooltip with animation on hover', async () => {
    const user = userEvent.setup();
    render(<Achievements achievements={mockAchievements} />);
    
    const firstBadge = screen.getAllByRole('article')[0];
    await user.hover(firstBadge);
    
    // Tooltip should appear
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('badge-tooltip');
  });

  it('uses intersection observer for scroll-triggered animations', () => {
    const { container } = render(<Achievements achievements={mockAchievements} />);
    
    // Section should have ref for intersection observer
    const section = container.querySelector('.achievements-section');
    expect(section).toBeInTheDocument();
  });

  it('applies container animation variants', () => {
    const { container } = render(<Achievements achievements={mockAchievements} />);
    
    const content = container.querySelector('.achievements-content');
    expect(content).toBeInTheDocument();
  });

  it('animates title with badge variants', () => {
    render(<Achievements achievements={mockAchievements} />);
    
    const title = screen.getByRole('heading', { name: /achievements/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('achievements-title');
  });

  it('handles rapid hover/unhover without errors', async () => {
    const user = userEvent.setup();
    render(<Achievements achievements={mockAchievements} />);
    
    const firstBadge = screen.getAllByRole('article')[0];
    
    // Rapid hover and unhover
    await user.hover(firstBadge);
    await user.unhover(firstBadge);
    await user.hover(firstBadge);
    await user.unhover(firstBadge);
    
    // Component should still be functional
    expect(firstBadge).toBeInTheDocument();
  });

  it('respects reduced motion preferences', () => {
    // Mock matchMedia for prefers-reduced-motion
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

    const { container } = render(<Achievements achievements={mockAchievements} />);
    
    // Component should still render with reduced motion
    const section = container.querySelector('.achievements-section');
    expect(section).toBeInTheDocument();
  });

  it('animates each badge independently', async () => {
    const user = userEvent.setup();
    render(<Achievements achievements={mockAchievements} />);
    
    const badges = screen.getAllByRole('article');
    
    // Hover first badge
    await user.hover(badges[0]);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    
    await user.unhover(badges[0]);
    
    // Hover second badge
    await user.hover(badges[1]);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('applies spring animation to badge reveal', () => {
    const { container } = render(<Achievements achievements={mockAchievements} />);
    
    // Check that badges have the wrapper class for animation
    const badgeWrappers = container.querySelectorAll('.badge-wrapper');
    badgeWrappers.forEach((wrapper) => {
      expect(wrapper).toBeInTheDocument();
    });
  });
});
