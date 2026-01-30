import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Skills from './Skills';
import type { Skill } from '../../types';

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

const mockSkills: Skill[] = [
  {
    name: 'Machine Learning',
    level: 85,
    category: 'AI/ML',
    description: 'Experienced in supervised and unsupervised learning algorithms.',
  },
  {
    name: 'Data Analysis',
    level: 90,
    category: 'Data',
    description: 'Strong analytical skills with pandas and NumPy.',
  },
  {
    name: 'Python',
    level: 90,
    category: 'Languages',
    description: 'Primary programming language for data science.',
  },
  {
    name: 'TensorFlow',
    level: 80,
    category: 'Tools',
    description: 'Building and training deep learning models.',
  },
  {
    name: 'Deep Learning',
    level: 30,
    category: 'AI/ML',
    description: 'Proficient in neural networks and transformers.',
  },
];

describe('Skills Component', () => {
  it('renders the skills section with title', () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });

  it('renders all category filter buttons', () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('displays all skills by default', () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow')).toBeInTheDocument();
    expect(screen.getByText('Deep Learning')).toBeInTheDocument();
  });

  it('displays skill levels as percentages', () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getAllByText('90%')).toHaveLength(2); // Data Analysis and Python
    expect(screen.getAllByText('80%')).toHaveLength(2); // TensorFlow and Deep Learning
  });

  it('filters skills by AI/ML category', () => {
    render(<Skills skills={mockSkills} />);
    const aimlButton = screen.getByText('AI/ML');
    fireEvent.click(aimlButton);

    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Deep Learning')).toBeInTheDocument();
    expect(screen.queryByText('Data Analysis')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
    expect(screen.queryByText('TensorFlow')).not.toBeInTheDocument();
  });

  it('filters skills by Data category', () => {
    render(<Skills skills={mockSkills} />);
    const dataButton = screen.getByText('Data');
    fireEvent.click(dataButton);

    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.queryByText('Machine Learning')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
  });

  it('filters skills by Tools category', () => {
    render(<Skills skills={mockSkills} />);
    const toolsButton = screen.getByText('Tools');
    fireEvent.click(toolsButton);

    expect(screen.getByText('TensorFlow')).toBeInTheDocument();
    expect(screen.queryByText('Machine Learning')).not.toBeInTheDocument();
    expect(screen.queryByText('Data Analysis')).not.toBeInTheDocument();
  });

  it('filters skills by Languages category', () => {
    render(<Skills skills={mockSkills} />);
    const languagesButton = screen.getByText('Languages');
    fireEvent.click(languagesButton);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.queryByText('Machine Learning')).not.toBeInTheDocument();
    expect(screen.queryByText('TensorFlow')).not.toBeInTheDocument();
  });

  it('returns to all skills when All filter is clicked', () => {
    render(<Skills skills={mockSkills} />);
    
    // First filter by AI/ML
    fireEvent.click(screen.getByText('AI/ML'));
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
    
    // Then click All
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('applies active class to selected filter button', () => {
    render(<Skills skills={mockSkills} />);
    const allButton = screen.getByText('All');
    const aimlButton = screen.getByText('AI/ML');

    // All should be active by default
    expect(allButton).toHaveClass('active');
    expect(aimlButton).not.toHaveClass('active');

    // Click AI/ML
    fireEvent.click(aimlButton);
    expect(aimlButton).toHaveClass('active');
    expect(allButton).not.toHaveClass('active');
  });

  it('shows tooltip on hover', async () => {
    render(<Skills skills={mockSkills} />);
    const skillItem = screen.getByText('Machine Learning').closest('.skill-item');

    if (skillItem) {
      fireEvent.mouseEnter(skillItem);
      await waitFor(() => {
        expect(
          screen.getByText('Experienced in supervised and unsupervised learning algorithms.')
        ).toBeInTheDocument();
      });
    }
  });

  it('hides tooltip on mouse leave', async () => {
    render(<Skills skills={mockSkills} />);
    const skillItem = screen.getByText('Machine Learning').closest('.skill-item');

    if (skillItem) {
      fireEvent.mouseEnter(skillItem);
      await waitFor(() => {
        expect(
          screen.getByText('Experienced in supervised and unsupervised learning algorithms.')
        ).toBeInTheDocument();
      });

      fireEvent.mouseLeave(skillItem);
      await waitFor(() => {
        expect(
          screen.queryByText('Experienced in supervised and unsupervised learning algorithms.')
        ).not.toBeInTheDocument();
      });
    }
  });

  it('shows tooltip on focus (keyboard navigation)', async () => {
    render(<Skills skills={mockSkills} />);
    const skillItem = screen.getByText('Machine Learning').closest('.skill-item');

    if (skillItem) {
      fireEvent.focus(skillItem);
      await waitFor(() => {
        expect(
          screen.getByText('Experienced in supervised and unsupervised learning algorithms.')
        ).toBeInTheDocument();
      });
    }
  });

  it('hides tooltip on blur', async () => {
    render(<Skills skills={mockSkills} />);
    const skillItem = screen.getByText('Machine Learning').closest('.skill-item');

    if (skillItem) {
      fireEvent.focus(skillItem);
      await waitFor(() => {
        expect(
          screen.getByText('Experienced in supervised and unsupervised learning algorithms.')
        ).toBeInTheDocument();
      });

      fireEvent.blur(skillItem);
      await waitFor(() => {
        expect(
          screen.queryByText('Experienced in supervised and unsupervised learning algorithms.')
        ).not.toBeInTheDocument();
      });
    }
  });

  it('displays empty state when no skills match filter', () => {
    const emptySkills: Skill[] = [];
    render(<Skills skills={emptySkills} />);
    expect(screen.getByText('No skills found in this category.')).toBeInTheDocument();
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<Skills skills={mockSkills} />);
    
    // Section has aria-label
    const section = screen.getByLabelText('Skills section');
    expect(section).toBeInTheDocument();

    // Filter buttons have aria-label
    expect(screen.getByLabelText('Filter by All')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by AI/ML')).toBeInTheDocument();

    // Skill items have aria-label
    expect(screen.getByLabelText('Machine Learning: 85% proficiency')).toBeInTheDocument();
  });

  it('filter buttons have aria-pressed attribute', () => {
    render(<Skills skills={mockSkills} />);
    const allButton = screen.getByText('All');
    const aimlButton = screen.getByText('AI/ML');

    expect(allButton).toHaveAttribute('aria-pressed', 'true');
    expect(aimlButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(aimlButton);
    expect(aimlButton).toHaveAttribute('aria-pressed', 'true');
    expect(allButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('skill items are keyboard focusable', () => {
    render(<Skills skills={mockSkills} />);
    const skillItem = screen.getByText('Machine Learning').closest('.skill-item');
    expect(skillItem).toHaveAttribute('tabIndex', '0');
  });

  it('renders with empty skills array', () => {
    render(<Skills skills={[]} />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
    expect(screen.getByText('No skills found in this category.')).toBeInTheDocument();
  });
});
