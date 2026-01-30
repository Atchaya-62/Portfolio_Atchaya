import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

describe('ProjectCard Animations', () => {
  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    techStack: ['React', 'TypeScript'],
    category: 'Web Development',
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
    imageUrl: '/images/test.jpg',
  };

  it('should have flip animation class when hovered', async () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    
    expect(card).not.toHaveClass('flipped');
    
    if (cardWrapper) {
      fireEvent.mouseEnter(cardWrapper);
      
      await waitFor(() => {
        expect(card).toHaveClass('flipped');
      });
    }
  });

  it('should remove flip animation class when mouse leaves', async () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    
    if (cardWrapper) {
      fireEvent.mouseEnter(cardWrapper);
      
      await waitFor(() => {
        expect(card).toHaveClass('flipped');
      });
      
      fireEvent.mouseLeave(cardWrapper);
      
      await waitFor(() => {
        expect(card).not.toHaveClass('flipped');
      });
    }
  });

  it('should have proper CSS classes for animation', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    const front = cardWrapper?.querySelector('.project-card-front');
    const back = cardWrapper?.querySelector('.project-card-back');
    
    expect(cardWrapper).toHaveClass('project-card-wrapper');
    expect(card).toHaveClass('project-card');
    expect(front).toHaveClass('project-card-front');
    expect(back).toHaveClass('project-card-back');
  });

  it('should render both front and back of card for flip animation', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const front = cardWrapper?.querySelector('.project-card-front');
    const back = cardWrapper?.querySelector('.project-card-back');
    
    expect(front).toBeInTheDocument();
    expect(back).toBeInTheDocument();
  });

  it('should have tech tags with hover animation capability', () => {
    render(<ProjectCard project={mockProject} />);
    const techTags = screen.getAllByText('React');
    
    techTags.forEach(tag => {
      expect(tag).toHaveClass('tech-tag');
    });
  });

  it('should have link buttons with hover animation capability', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    const demoLink = screen.getByLabelText('View Test Project live demo');
    
    expect(githubLink).toHaveClass('project-link');
    expect(githubLink).toHaveClass('github-link');
    expect(demoLink).toHaveClass('project-link');
    expect(demoLink).toHaveClass('demo-link');
  });
});
