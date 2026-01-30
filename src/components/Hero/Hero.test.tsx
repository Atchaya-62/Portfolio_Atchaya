import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  const mockProps = {
    name: 'John Doe',
    headline: 'AI & Data Science Explorer',
    subtitle: 'Building intelligent solutions with data',
    aboutSummary: 'Passionate about AI and machine learning. Currently exploring deep learning and natural language processing.',
    photoUrl: '/images/profile.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  };

  it('should render the hero section', () => {
    render(<Hero {...mockProps} />);
    const section = screen.getByRole('region', { name: /hero section/i });
    expect(section).toBeInTheDocument();
  });

  it('should display the headline', () => {
    render(<Hero {...mockProps} />);
    const headline = screen.getByText(mockProps.headline);
    expect(headline).toBeInTheDocument();
    expect(headline.tagName).toBe('H1');
  });

  it('should display the subtitle', () => {
    render(<Hero {...mockProps} />);
    const subtitle = screen.getByText(mockProps.subtitle);
    expect(subtitle).toBeInTheDocument();
  });

  it('should display the about summary', () => {
    render(<Hero {...mockProps} />);
    const about = screen.getByText(mockProps.aboutSummary);
    expect(about).toBeInTheDocument();
  });

  it('should display the owner photo with correct alt text', () => {
    render(<Hero {...mockProps} />);
    const photo = screen.getByAltText(`${mockProps.name}'s photo`);
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', mockProps.photoUrl);
  });

  it('should render CTA buttons', () => {
    render(<Hero {...mockProps} />);
    const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i });
    const contactBtn = screen.getByRole('button', { name: /contact/i });
    
    expect(viewProjectsBtn).toBeInTheDocument();
    expect(contactBtn).toBeInTheDocument();
  });

  it('should render social links with correct attributes', () => {
    render(<Hero {...mockProps} />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin profile/i });
    const githubLink = screen.getByRole('link', { name: /github profile/i });
    
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', mockProps.socialLinks.linkedin);
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', mockProps.socialLinks.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have minimum touch target size for buttons', () => {
    render(<Hero {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button);
      const minHeight = parseInt(styles.minHeight);
      expect(minHeight).toBeGreaterThanOrEqual(44);
    });
  });

  it('should have minimum touch target size for social icons', () => {
    render(<Hero {...mockProps} />);
    const socialLinks = [
      screen.getByRole('link', { name: /linkedin profile/i }),
      screen.getByRole('link', { name: /github profile/i }),
    ];
    
    socialLinks.forEach(link => {
      const styles = window.getComputedStyle(link);
      const width = parseInt(styles.width);
      const height = parseInt(styles.height);
      expect(width).toBeGreaterThanOrEqual(44);
      expect(height).toBeGreaterThanOrEqual(44);
    });
  });

  it('should call scrollIntoView when CTA buttons are clicked', () => {
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn((id: string) => ({
      scrollIntoView: mockScrollIntoView,
    }));
    
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById as any);
    
    render(<Hero {...mockProps} />);
    
    const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i });
    viewProjectsBtn.click();
    
    expect(mockGetElementById).toHaveBeenCalledWith('projects');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    const contactBtn = screen.getByRole('button', { name: /contact/i });
    contactBtn.click();
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
    
    vi.restoreAllMocks();
  });
});
