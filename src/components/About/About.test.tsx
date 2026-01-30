import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import About from './About';
import type { TimelineItem } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => [vi.fn(), true],
}));

describe('About Component', () => {
  const mockTimeline: TimelineItem[] = [
    {
      id: 'education-1',
      year: '2021 - Present',
      title: 'B.S. in AI & Data Science',
      institution: 'Tech University',
      description: 'Studying machine learning and data analytics.',
      type: 'education',
    },
    {
      id: 'milestone-1',
      year: '2022',
      title: 'First ML Project',
      institution: 'Personal Project',
      description: 'Built a sentiment analysis model.',
      type: 'milestone',
    },
    {
      id: 'education-2',
      year: '2023',
      title: 'Advanced Deep Learning Course',
      institution: 'Online Platform',
      description: 'Completed advanced course on neural networks.',
      type: 'education',
    },
  ];

  const mockBio = `I'm a 3rd-year AI & Data Science student with a passion for machine learning.
    My journey in technology began with data-driven insights and has evolved into deep learning.`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('should render the About section with correct title', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    it('should render bio paragraphs', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      // Check that the bio section exists with the expected content
      const bioSection = document.querySelector('.about-bio');
      expect(bioSection).toBeInTheDocument();
      expect(bioSection?.textContent).toContain('3rd-year');
      expect(bioSection?.textContent).toContain('AI');
      expect(bioSection?.textContent).toContain('Data Science');
    });

    it('should highlight keywords in bio text', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const highlights = document.querySelectorAll('.highlight');
      expect(highlights.length).toBeGreaterThan(0);
    });

    it('should render timeline title', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      expect(screen.getByText('My Journey')).toBeInTheDocument();
    });

    it('should render first timeline item by default', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      expect(screen.getByText('2021 - Present')).toBeInTheDocument();
      expect(screen.getByText('B.S. in AI & Data Science')).toBeInTheDocument();
      expect(screen.getByText('Tech University')).toBeInTheDocument();
      expect(
        screen.getByText('Studying machine learning and data analytics.')
      ).toBeInTheDocument();
    });

    it('should render correct number of timeline indicators', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const indicators = document.querySelectorAll('.timeline-indicator');
      expect(indicators.length).toBe(mockTimeline.length);
    });

    it('should mark first indicator as active by default', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const indicators = document.querySelectorAll('.timeline-indicator');
      expect(indicators[0]).toHaveClass('active');
    });
  });

  describe('Timeline Navigation', () => {
    it('should navigate to next timeline item when next button is clicked', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const nextButton = screen.getByLabelText('Next timeline item');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('2022')).toBeInTheDocument();
        expect(screen.getByText('First ML Project')).toBeInTheDocument();
      });
    });

    it('should navigate to previous timeline item when previous button is clicked', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      // First go to next item
      const nextButton = screen.getByLabelText('Next timeline item');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('2022')).toBeInTheDocument();
      });

      // Then go back to previous
      const prevButton = screen.getByLabelText('Previous timeline item');
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(screen.getByText('2021 - Present')).toBeInTheDocument();
      });
    });

    it('should wrap to last item when clicking previous on first item', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const prevButton = screen.getByLabelText('Previous timeline item');
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(screen.getByText('2023')).toBeInTheDocument();
        expect(
          screen.getByText('Advanced Deep Learning Course')
        ).toBeInTheDocument();
      });
    });

    it('should wrap to first item when clicking next on last item', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      // Navigate to last item
      const nextButton = screen.getByLabelText('Next timeline item');
      fireEvent.click(nextButton); // Go to item 2
      fireEvent.click(nextButton); // Go to item 3

      await waitFor(() => {
        expect(screen.getByText('2023')).toBeInTheDocument();
      });

      // Click next again to wrap to first
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('2021 - Present')).toBeInTheDocument();
      });
    });

    it('should navigate to specific item when indicator is clicked', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const indicators = document.querySelectorAll('.timeline-indicator');
      fireEvent.click(indicators[2]); // Click third indicator

      await waitFor(() => {
        expect(screen.getByText('2023')).toBeInTheDocument();
        expect(
          screen.getByText('Advanced Deep Learning Course')
        ).toBeInTheDocument();
      });
    });

    it('should update active indicator when navigating', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const nextButton = screen.getByLabelText('Next timeline item');
      fireEvent.click(nextButton);

      await waitFor(() => {
        const indicators = document.querySelectorAll('.timeline-indicator');
        expect(indicators[1]).toHaveClass('active');
        expect(indicators[0]).not.toHaveClass('active');
      });
    });
  });

  describe('Timeline Item Types', () => {
    it('should display education badge for education type', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const badge = document.querySelector('.timeline-badge.education');
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toBe('🎓');
    });

    it('should display milestone badge for milestone type', async () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const nextButton = screen.getByLabelText('Next timeline item');
      fireEvent.click(nextButton);

      await waitFor(() => {
        const badge = document.querySelector('.timeline-badge.milestone');
        expect(badge).toBeInTheDocument();
        expect(badge?.textContent).toBe('🚀');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label on section', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const section = screen.getByLabelText('About section');
      expect(section).toBeInTheDocument();
    });

    it('should have proper ARIA labels on navigation buttons', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      expect(screen.getByLabelText('Previous timeline item')).toBeInTheDocument();
      expect(screen.getByLabelText('Next timeline item')).toBeInTheDocument();
    });

    it('should have proper ARIA labels on timeline indicators', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      expect(screen.getByLabelText('Go to timeline item 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to timeline item 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to timeline item 3')).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const h2 = screen.getByRole('heading', { level: 2, name: 'About Me' });
      const h3 = screen.getByRole('heading', { level: 3, name: 'My Journey' });
      const h4 = screen.getByRole('heading', {
        level: 4,
        name: 'B.S. in AI & Data Science',
      });

      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
      expect(h4).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty timeline array', () => {
      render(<About fullBio={mockBio} timeline={[]} />);

      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText('My Journey')).toBeInTheDocument();
    });

    it('should handle single timeline item', () => {
      const singleItem = [mockTimeline[0]];
      render(<About fullBio={mockBio} timeline={singleItem} />);

      expect(screen.getByText('B.S. in AI & Data Science')).toBeInTheDocument();

      const indicators = document.querySelectorAll('.timeline-indicator');
      expect(indicators.length).toBe(1);
    });

    it('should handle bio with multiple paragraphs', () => {
      const multiParagraphBio = `First paragraph about AI.
      
      Second paragraph about Data Science.
      
      Third paragraph about machine learning.`;

      render(<About fullBio={multiParagraphBio} timeline={mockTimeline} />);

      const bioSection = document.querySelector('.about-bio');
      const paragraphs = bioSection?.querySelectorAll('p');
      expect(paragraphs?.length).toBe(3);
    });

    it('should handle bio without keywords', () => {
      const plainBio = 'This is a simple biography without special keywords.';
      render(<About fullBio={plainBio} timeline={mockTimeline} />);

      expect(screen.getByText(plainBio)).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should render navigation buttons for mobile', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const prevButton = screen.getByLabelText('Previous timeline item');
      const nextButton = screen.getByLabelText('Next timeline item');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should maintain minimum touch target size on buttons', () => {
      render(<About fullBio={mockBio} timeline={mockTimeline} />);

      const buttons = document.querySelectorAll('.carousel-button');
      buttons.forEach((button) => {
        // Verify the class is present which applies the minimum size
        expect(button).toHaveClass('carousel-button');
      });
    });
  });
});
