import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Experience from './Experience';
import type { Experience as ExperienceType, Certification } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => [vi.fn(), true],
}));

describe('Experience Component', () => {
  const mockExperience: ExperienceType[] = [
    {
      id: 'exp-1',
      title: 'Software Engineer',
      company: 'Tech Corp',
      duration: '2022 - Present',
      description: 'Building amazing software',
      icon: '💼',
    },
    {
      id: 'exp-2',
      title: 'Junior Developer',
      company: 'StartUp Inc',
      duration: '2020 - 2022',
      description: 'Learning and growing',
      icon: '🚀',
    },
  ];

  const mockCertifications: Certification[] = [
    {
      id: 'cert-1',
      name: 'AWS Certified',
      issuer: 'Amazon',
      date: '2023',
      icon: '☁️',
    },
    {
      id: 'cert-2',
      name: 'React Developer',
      issuer: 'Meta',
      date: '2022',
      icon: '⚛️',
    },
  ];

  it('renders the section title', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    expect(screen.getByText('Experience & Certifications')).toBeInTheDocument();
  });

  it('renders subsection titles', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
  });

  it('renders all experience cards', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2022 - Present')).toBeInTheDocument();
    expect(screen.getByText('Building amazing software')).toBeInTheDocument();
    
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
    expect(screen.getByText('StartUp Inc')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2022')).toBeInTheDocument();
    expect(screen.getByText('Learning and growing')).toBeInTheDocument();
  });

  it('renders all certification cards', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    
    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    
    expect(screen.getByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('Meta')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('renders icons for each entry', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    
    // Check that icons are rendered
    expect(screen.getByText('💼')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('☁️')).toBeInTheDocument();
    expect(screen.getByText('⚛️')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Experience experience={mockExperience} certifications={mockCertifications} />);
    
    const section = screen.getByLabelText('Experience and certifications section');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    
    const experienceCard = screen.getByLabelText('Software Engineer at Tech Corp');
    expect(experienceCard).toBeInTheDocument();
    expect(experienceCard.tagName).toBe('ARTICLE');
    
    const certCard = screen.getByLabelText('AWS Certified certification from Amazon');
    expect(certCard).toBeInTheDocument();
    expect(certCard.tagName).toBe('ARTICLE');
  });

  it('renders with empty arrays', () => {
    render(<Experience experience={[]} certifications={[]} />);
    
    expect(screen.getByText('Experience & Certifications')).toBeInTheDocument();
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    expect(container.querySelector('.experience-section')).toBeInTheDocument();
    expect(container.querySelector('.experience-container')).toBeInTheDocument();
    expect(container.querySelector('.experience-content')).toBeInTheDocument();
    expect(container.querySelector('.cards-grid')).toBeInTheDocument();
    expect(container.querySelector('.experience-card')).toBeInTheDocument();
    expect(container.querySelector('.card-icon')).toBeInTheDocument();
    expect(container.querySelector('.card-content')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    const cards = container.querySelectorAll('.experience-card');
    expect(cards).toHaveLength(4); // 2 experience + 2 certifications
  });

  it('distinguishes between experience and certification cards', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    const certificationCards = container.querySelectorAll('.certification-card');
    expect(certificationCards).toHaveLength(2);
  });
});
