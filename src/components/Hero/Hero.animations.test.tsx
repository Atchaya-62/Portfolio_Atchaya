import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component - Animations', () => {
  const mockProps = {
    name: 'John Doe',
    headline: 'AI & Data Science Explorer',
    subtitle: 'Building intelligent solutions with data',
    aboutSummary: 'Passionate about AI and machine learning.',
    photoUrl: '/images/profile.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  };

  it('should have entrance animation properties on headline', () => {
    render(<Hero {...mockProps} />);
    const headline = screen.getByText(mockProps.headline);
    
    // Framer Motion applies inline styles for animations
    expect(headline).toHaveStyle({ opacity: '0' });
    const transform = headline.style.transform;
    expect(transform).toContain('translateY');
  });

  it('should have entrance animation properties on subtitle', () => {
    render(<Hero {...mockProps} />);
    const subtitle = screen.getByText(mockProps.subtitle);
    
    expect(subtitle).toHaveStyle({ opacity: '0' });
    const transform = subtitle.style.transform;
    expect(transform).toContain('translateY');
  });

  it('should have entrance animation properties on about summary', () => {
    render(<Hero {...mockProps} />);
    const about = screen.getByText(mockProps.aboutSummary);
    
    expect(about).toHaveStyle({ opacity: '0' });
    const transform = about.style.transform;
    expect(transform).toContain('translateY');
  });

  it('should have entrance animation properties on photo', () => {
    render(<Hero {...mockProps} />);
    const photo = screen.getByAltText(`${mockProps.name}'s photo`);
    const photoContainer = photo.parentElement?.parentElement;
    
    expect(photoContainer).toHaveStyle({ opacity: '0' });
    const transform = (photoContainer as HTMLElement).style.transform;
    expect(transform).toContain('scale');
  });

  it('should have entrance animation properties on CTA buttons', () => {
    render(<Hero {...mockProps} />);
    const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i });
    const ctaContainer = viewProjectsBtn.parentElement;
    
    expect(ctaContainer).toHaveStyle({ opacity: '0' });
    const transform = (ctaContainer as HTMLElement).style.transform;
    expect(transform).toContain('translateY');
  });

  it('should have entrance animation properties on social links', () => {
    render(<Hero {...mockProps} />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin profile/i });
    const socialContainer = linkedinLink.parentElement;
    
    expect(socialContainer).toHaveStyle({ opacity: '0' });
  });

  it('should have hover animation class on photo', () => {
    render(<Hero {...mockProps} />);
    const photo = screen.getByAltText(`${mockProps.name}'s photo`);
    const photoDiv = photo.parentElement;
    
    expect(photoDiv).toHaveClass('hero-photo');
  });

  it('should have hover animation class on social icons', () => {
    render(<Hero {...mockProps} />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin profile/i });
    const githubLink = screen.getByRole('link', { name: /github profile/i });
    
    expect(linkedinLink).toHaveClass('social-icon');
    expect(githubLink).toHaveClass('social-icon');
  });

  it('should have transition classes on CTA buttons', () => {
    render(<Hero {...mockProps} />);
    const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i });
    const contactBtn = screen.getByRole('button', { name: /contact/i });
    
    expect(viewProjectsBtn).toHaveClass('cta-button');
    expect(contactBtn).toHaveClass('cta-button');
  });
});
