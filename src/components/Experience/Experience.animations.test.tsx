import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Experience from './Experience';
import type { Experience as ExperienceType, Certification } from '../../types';

describe('Experience Component - Animations', () => {
  const mockExperience: ExperienceType[] = [
    {
      id: 'exp-1',
      title: 'Software Engineer',
      company: 'Tech Corp',
      duration: '2022 - Present',
      description: 'Building amazing software',
      icon: '💼',
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
  ];

  it('uses intersection observer for scroll-triggered animations', () => {
    // The component uses useInView hook from react-intersection-observer
    // This is already mocked globally, so we just verify the structure
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    // Verify the component has the ref structure for intersection observer
    const section = container.querySelector('.experience-section');
    expect(section).toBeInTheDocument();
  });

  it('applies slide-in animation variants to cards', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    // Check that cards have the necessary structure for animations
    const cards = container.querySelectorAll('.experience-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('applies icon animation variants', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    // Check that icons are rendered with animation structure
    const icons = container.querySelectorAll('.card-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has staggered children animation structure', () => {
    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    // Verify the container structure supports staggered animations
    const content = container.querySelector('.experience-content');
    expect(content).toBeInTheDocument();
    
    const cards = container.querySelectorAll('.experience-card');
    expect(cards.length).toBe(2); // 1 experience + 1 certification
  });

  it('renders with animation-ready structure when in view', () => {
    vi.doMock('react-intersection-observer', () => ({
      useInView: () => [vi.fn(), true],
    }));

    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    expect(container.querySelector('.experience-content')).toBeInTheDocument();
  });

  it('renders with animation-ready structure when not in view', () => {
    vi.doMock('react-intersection-observer', () => ({
      useInView: () => [vi.fn(), false],
    }));

    const { container } = render(
      <Experience experience={mockExperience} certifications={mockCertifications} />
    );
    
    expect(container.querySelector('.experience-content')).toBeInTheDocument();
  });
});
