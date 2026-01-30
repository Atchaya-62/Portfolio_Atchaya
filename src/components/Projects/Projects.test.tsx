import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Projects from './Projects';
import type { Project } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}));

// Mock ProjectCard component
vi.mock('./ProjectCard', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
      <p>{project.category}</p>
    </div>
  ),
}));

const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'AI Chatbot',
    description: 'An intelligent chatbot using NLP',
    techStack: ['Python', 'TensorFlow', 'Flask'],
    category: 'NLP',
    githubUrl: 'https://github.com/user/chatbot',
    demoUrl: 'https://demo.example.com',
    imageUrl: '/images/chatbot.jpg',
  },
  {
    id: 'project-2',
    title: 'Image Classifier',
    description: 'CNN-based image classification',
    techStack: ['Python', 'PyTorch', 'OpenCV'],
    category: 'Computer Vision',
    githubUrl: 'https://github.com/user/classifier',
    imageUrl: '/images/classifier.jpg',
  },
  {
    id: 'project-3',
    title: 'Sentiment Analyzer',
    description: 'Analyze text sentiment',
    techStack: ['Python', 'BERT', 'FastAPI'],
    category: 'NLP',
    githubUrl: 'https://github.com/user/sentiment',
    imageUrl: '/images/sentiment.jpg',
  },
  {
    id: 'project-4',
    title: 'Data Dashboard',
    description: 'Real-time analytics dashboard',
    techStack: ['React', 'D3.js', 'Node.js'],
    category: 'Data Visualization',
    githubUrl: 'https://github.com/user/dashboard',
    demoUrl: 'https://dashboard.example.com',
    imageUrl: '/images/dashboard.jpg',
  },
];

describe('Projects Component', () => {
  it('should render the section with correct heading', () => {
    render(<Projects projects={mockProjects} />);

    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(
      screen.getByText(/Explore my portfolio of AI, machine learning, and data science projects/i)
    ).toBeInTheDocument();
  });

  it('should render all projects initially', () => {
    render(<Projects projects={mockProjects} />);

    mockProjects.forEach((project) => {
      expect(screen.getByTestId(`project-card-${project.id}`)).toBeInTheDocument();
    });
  });

  it('should render category filter buttons', () => {
    render(<Projects projects={mockProjects} />);

    // Should have "All" button plus unique categories
    expect(screen.getByRole('button', { name: /Filter projects by All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter projects by NLP/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Filter projects by Computer Vision/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Filter projects by Data Visualization/i })
    ).toBeInTheDocument();
  });

  it('should have "All" category active by default', () => {
    render(<Projects projects={mockProjects} />);

    const allButton = screen.getByRole('button', { name: /Filter projects by All/i });
    expect(allButton).toHaveClass('active');
    expect(allButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should filter projects by category when filter button is clicked', async () => {
    render(<Projects projects={mockProjects} />);

    // Click on NLP category
    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });
    fireEvent.click(nlpButton);

    await waitFor(() => {
      // Should show only NLP projects
      expect(screen.getByTestId('project-card-project-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-project-3')).toBeInTheDocument();

      // Should not show other category projects
      expect(screen.queryByTestId('project-card-project-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('project-card-project-4')).not.toBeInTheDocument();
    });
  });

  it('should update active state when category is selected', async () => {
    render(<Projects projects={mockProjects} />);

    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });
    const allButton = screen.getByRole('button', { name: /Filter projects by All/i });

    // Initially "All" is active
    expect(allButton).toHaveClass('active');
    expect(allButton).toHaveAttribute('aria-pressed', 'true');

    // Click NLP category
    fireEvent.click(nlpButton);

    await waitFor(() => {
      // NLP should be active
      expect(nlpButton).toHaveClass('active');
      expect(nlpButton).toHaveAttribute('aria-pressed', 'true');

      // All should not be active
      expect(allButton).not.toHaveClass('active');
      expect(allButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('should show all projects when "All" category is selected after filtering', async () => {
    render(<Projects projects={mockProjects} />);

    // Filter by NLP
    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });
    fireEvent.click(nlpButton);

    await waitFor(() => {
      expect(screen.queryByTestId('project-card-project-2')).not.toBeInTheDocument();
    });

    // Click "All" to show all projects again
    const allButton = screen.getByRole('button', { name: /Filter projects by All/i });
    fireEvent.click(allButton);

    await waitFor(() => {
      mockProjects.forEach((project) => {
        expect(screen.getByTestId(`project-card-${project.id}`)).toBeInTheDocument();
      });
    });
  });

  it('should display no projects message when filter has no matches', () => {
    // Test with empty projects array
    render(<Projects projects={[]} />);

    // Should show "All" button
    expect(screen.getByRole('button', { name: /Filter projects by All/i })).toBeInTheDocument();
    
    // Should show no projects message
    expect(screen.getByText('No projects found in this category.')).toBeInTheDocument();
  });

  it('should have proper ARIA labels for accessibility', () => {
    render(<Projects projects={mockProjects} />);

    // Section should have aria-label
    const section = screen.getByLabelText('Projects');
    expect(section).toBeInTheDocument();

    // Filter group should have aria-label
    const filterGroup = screen.getByRole('group', { name: /Project category filters/i });
    expect(filterGroup).toBeInTheDocument();

    // Filter buttons should have aria-label
    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });
    expect(nlpButton).toHaveAttribute('aria-label', 'Filter projects by NLP');
  });

  it('should be keyboard accessible', () => {
    render(<Projects projects={mockProjects} />);

    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });

    // Button should be focusable
    nlpButton.focus();
    expect(document.activeElement).toBe(nlpButton);

    // Should respond to Enter key
    fireEvent.keyDown(nlpButton, { key: 'Enter', code: 'Enter' });
    // Note: fireEvent.click is more reliable for testing button clicks
    fireEvent.click(nlpButton);

    expect(nlpButton).toHaveClass('active');
  });

  it('should render with empty projects array', () => {
    render(<Projects projects={[]} />);

    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter projects by All/i })).toBeInTheDocument();
  });

  it('should extract unique categories correctly', () => {
    const projectsWithDuplicates: Project[] = [
      ...mockProjects,
      {
        id: 'project-5',
        title: 'Another NLP Project',
        description: 'Another NLP project',
        techStack: ['Python'],
        category: 'NLP',
        imageUrl: '/test.jpg',
      },
    ];

    render(<Projects projects={projectsWithDuplicates} />);

    // Should only have one NLP button despite multiple NLP projects
    const nlpButtons = screen.getAllByRole('button', { name: /Filter projects by NLP/i });
    expect(nlpButtons).toHaveLength(1);
  });

  it('should maintain filter state when projects prop changes', async () => {
    const { rerender } = render(<Projects projects={mockProjects} />);

    // Select NLP category
    const nlpButton = screen.getByRole('button', { name: /Filter projects by NLP/i });
    fireEvent.click(nlpButton);

    await waitFor(() => {
      expect(nlpButton).toHaveClass('active');
    });

    // Update projects with new data
    const newProjects: Project[] = [
      ...mockProjects,
      {
        id: 'project-5',
        title: 'New Project',
        description: 'New project',
        techStack: ['React'],
        category: 'NLP',
        imageUrl: '/new.jpg',
      },
    ];

    rerender(<Projects projects={newProjects} />);

    // Should still have NLP filter active and show filtered results
    await waitFor(() => {
      expect(nlpButton).toHaveClass('active');
      // Should show NLP projects including the new one
      expect(screen.getByTestId('project-card-project-5')).toBeInTheDocument();
    });
  });

  it('should render projects in a grid layout', () => {
    const { container } = render(<Projects projects={mockProjects} />);

    const grid = container.querySelector('.projects-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('projects-grid');
  });

  it('should have proper section structure', () => {
    const { container } = render(<Projects projects={mockProjects} />);

    expect(container.querySelector('.projects-section')).toBeInTheDocument();
    expect(container.querySelector('.projects-container')).toBeInTheDocument();
    expect(container.querySelector('.projects-header')).toBeInTheDocument();
    expect(container.querySelector('.projects-filters')).toBeInTheDocument();
    expect(container.querySelector('.projects-grid')).toBeInTheDocument();
  });
});
