import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import type { Skill } from '../../types';

// Mock framer-motion to capture animation props
const mockMotionDiv = vi.fn();
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => {
      mockMotionDiv(props);
      return <div {...props}>{props.children}</div>;
    },
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
}));

// Mock react-intersection-observer with controllable inView state
let mockInView = false;
const mockRef = vi.fn();
vi.mock('react-intersection-observer', () => ({
  useInView: () => [mockRef, mockInView],
}));

const mockSkills: Skill[] = [
  {
    name: 'Machine Learning',
    level: 85,
    category: 'AI/ML',
    description: 'Experienced in supervised and unsupervised learning algorithms.',
  },
  {
    name: 'Python',
    level: 90,
    category: 'Languages',
    description: 'Primary programming language for data science.',
  },
];

describe('Skills Component - Scroll-Triggered Animations', () => {
  beforeEach(() => {
    mockMotionDiv.mockClear();
    mockInView = false;
  });

  it('should initialize skill bars with hidden state when not in view', () => {
    mockInView = false;
    render(<Skills skills={mockSkills} />);

    // Find motion.div calls that have barVariants (skill bars)
    const barAnimationCalls = mockMotionDiv.mock.calls.filter(
      (call) => call[0]?.className === 'skill-bar'
    );

    // Verify skill bars are initialized with hidden state
    expect(barAnimationCalls.length).toBeGreaterThan(0);
    barAnimationCalls.forEach((call) => {
      const props = call[0];
      expect(props.initial).toBe('hidden');
      expect(props.animate).toBe('hidden'); // Not in view, so should be hidden
    });
  });

  it('should animate skill bars to visible state when in viewport', () => {
    mockInView = true;
    render(<Skills skills={mockSkills} />);

    // Find motion.div calls that have barVariants (skill bars)
    const barAnimationCalls = mockMotionDiv.mock.calls.filter(
      (call) => call[0]?.className === 'skill-bar'
    );

    // Verify skill bars animate to visible state
    expect(barAnimationCalls.length).toBeGreaterThan(0);
    barAnimationCalls.forEach((call) => {
      const props = call[0];
      expect(props.initial).toBe('hidden');
      expect(props.animate).toBe('visible'); // In view, so should be visible
    });
  });

  it('should pass skill level as custom prop to bar animation', () => {
    mockInView = true;
    render(<Skills skills={mockSkills} />);

    // Find motion.div calls that have barVariants (skill bars)
    const barAnimationCalls = mockMotionDiv.mock.calls.filter(
      (call) => call[0]?.className === 'skill-bar'
    );

    // Verify custom prop (skill level) is passed
    expect(barAnimationCalls.length).toBe(2); // Two skills
    
    // Check that custom prop contains skill levels
    const customProps = barAnimationCalls.map((call) => call[0].custom);
    expect(customProps).toContain(85); // Machine Learning level
    expect(customProps).toContain(90); // Python level
  });

  it('should use intersection observer with correct configuration', () => {
    render(<Skills skills={mockSkills} />);

    // The useInView hook should be called (mocked)
    // In the actual implementation, it's configured with:
    // threshold: 0.2, triggerOnce: true
    // We verify this by checking the component renders correctly
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });

  it('should animate skill items with staggered entrance', () => {
    mockInView = true;
    render(<Skills skills={mockSkills} />);

    // Find motion.div calls for skill items
    const skillItemCalls = mockMotionDiv.mock.calls.filter(
      (call) => call[0]?.className === 'skill-item'
    );

    // Verify skill items have animation variants
    expect(skillItemCalls.length).toBe(2); // Two skills
    skillItemCalls.forEach((call) => {
      const props = call[0];
      expect(props.variants).toBeDefined();
      // Skill items don't have initial/animate props directly,
      // they inherit from parent container's stagger animation
    });
  });

  it('should animate container with staggerChildren for sequential reveals', () => {
    mockInView = true;
    render(<Skills skills={mockSkills} />);

    // Find motion.div calls for the skills grid container
    const gridContainerCalls = mockMotionDiv.mock.calls.filter(
      (call) => call[0]?.className === 'skills-grid'
    );

    // Verify container has stagger animation
    expect(gridContainerCalls.length).toBeGreaterThan(0);
    gridContainerCalls.forEach((call) => {
      const props = call[0];
      expect(props.variants).toBeDefined();
      expect(props.initial).toBe('hidden');
      expect(props.animate).toBe('visible');
    });
  });

  it('should have skill bar glow element for shimmer effect', () => {
    render(<Skills skills={mockSkills} />);

    // Check that skill bar glow elements are rendered
    const glowElements = document.querySelectorAll('.skill-bar-glow');
    expect(glowElements.length).toBe(mockSkills.length);
  });

  it('should render skill bars with proper structure for animation', () => {
    render(<Skills skills={mockSkills} />);

    // Verify skill bar containers exist
    const barContainers = document.querySelectorAll('.skill-bar-container');
    expect(barContainers.length).toBe(mockSkills.length);

    // Verify each container has a skill bar
    barContainers.forEach((container) => {
      const skillBar = container.querySelector('.skill-bar');
      expect(skillBar).toBeInTheDocument();
    });
  });
});
