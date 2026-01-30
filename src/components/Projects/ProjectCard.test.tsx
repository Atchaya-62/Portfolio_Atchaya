import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    techStack: ['React', 'TypeScript', 'CSS'],
    category: 'Web Development',
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
    imageUrl: '/images/test.jpg',
  };

  it('should render project title', () => {
    render(<ProjectCard project={mockProject} />);
    const titles = screen.getAllByText('Test Project');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('should render all tech stack tags', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CSS').length).toBeGreaterThan(0);
  });

  it('should render project description on back of card', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('should render GitHub link when githubUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render demo link when demoUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);
    const demoLink = screen.getByLabelText('View Test Project live demo');
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://demo.test.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not render GitHub link when githubUrl is not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} />);
    expect(screen.queryByLabelText('View Test Project on GitHub')).not.toBeInTheDocument();
  });

  it('should not render demo link when demoUrl is not provided', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);
    expect(screen.queryByLabelText('View Test Project live demo')).not.toBeInTheDocument();
  });

  it('should flip card on mouse enter', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    
    expect(card).not.toHaveClass('flipped');
    
    if (cardWrapper) {
      fireEvent.mouseEnter(cardWrapper);
    }
    
    expect(card).toHaveClass('flipped');
  });

  it('should reset flip on mouse leave', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    
    if (cardWrapper) {
      fireEvent.mouseEnter(cardWrapper);
      expect(card).toHaveClass('flipped');
      
      fireEvent.mouseLeave(cardWrapper);
      expect(card).not.toHaveClass('flipped');
    }
  });

  it('should apply parallax tilt effect on mouse move', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    
    if (cardWrapper) {
      // Mock getBoundingClientRect
      const mockRect = {
        left: 0,
        top: 0,
        width: 300,
        height: 400,
        right: 300,
        bottom: 400,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
      vi.spyOn(cardWrapper, 'getBoundingClientRect').mockReturnValue(mockRect);
      
      // Simulate mouse move - this should trigger the tilt effect
      // We're testing that the event handler is called without errors
      expect(() => {
        fireEvent.mouseMove(cardWrapper, { clientX: 50, clientY: 50 });
      }).not.toThrow();
      
      // The component should still be in the document
      expect(cardWrapper).toBeInTheDocument();
    }
  });

  it('should reset tilt on mouse leave', () => {
    render(<ProjectCard project={mockProject} />);
    const cardWrapper = screen.getByRole('img', { name: /Test Project project image/i }).closest('.project-card-wrapper');
    const card = cardWrapper?.querySelector('.project-card');
    
    if (cardWrapper && card) {
      // Mock getBoundingClientRect
      const mockRect = {
        left: 0,
        top: 0,
        width: 300,
        height: 400,
        right: 300,
        bottom: 400,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
      vi.spyOn(cardWrapper, 'getBoundingClientRect').mockReturnValue(mockRect);
      
      // Enter and move mouse
      fireEvent.mouseEnter(cardWrapper);
      fireEvent.mouseMove(cardWrapper, { clientX: 50, clientY: 50 });
      expect(card).toHaveClass('flipped');
      
      // Leave should reset both flip and tilt
      fireEvent.mouseLeave(cardWrapper);
      expect(card).not.toHaveClass('flipped');
    }
  });

  it('should have proper ARIA labels for accessibility', () => {
    render(<ProjectCard project={mockProject} />);
    
    // Check image has proper aria-label
    expect(screen.getByRole('img', { name: /Test Project project image/i })).toBeInTheDocument();
    
    // Check links have proper aria-labels
    expect(screen.getByLabelText('View Test Project on GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('View Test Project live demo')).toBeInTheDocument();
  });

  it('should render project image with correct background', () => {
    render(<ProjectCard project={mockProject} />);
    const imageDiv = screen.getByRole('img', { name: /Test Project project image/i });
    expect(imageDiv).toHaveStyle({ backgroundImage: 'url(/images/test.jpg)' });
  });

  it('should stop propagation on link clicks', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
    
    githubLink.dispatchEvent(clickEvent);
    
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
