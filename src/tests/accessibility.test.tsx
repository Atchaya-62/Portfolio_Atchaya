import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Achievements from '../components/Achievements/Achievements';
import Contact from '../components/Contact/Contact';
import { Navigation } from '../components/Navigation/Navigation';
import { ThemeSwitcher } from '../components/shared/ThemeSwitcher';
import { portfolioData } from '../data/portfolioData';

/**
 * Accessibility Tests
 * 
 * These tests verify that all components meet accessibility requirements:
 * - Semantic HTML5 elements
 * - ARIA labels and roles
 * - Alt text for images
 * - Keyboard navigation support
 * - Focus indicators
 * 
 * Requirements: 14.1, 14.2, 14.4, 14.5
 */

describe('Accessibility - ARIA Labels and Semantic HTML', () => {
  describe('Navigation Component', () => {
    it('should have proper navigation role and aria-label', () => {
      render(
        <BrowserRouter>
          <Navigation activeSection="home" />
        </BrowserRouter>
      );

      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('should have menubar role for menu items', () => {
      render(
        <BrowserRouter>
          <Navigation activeSection="home" />
        </BrowserRouter>
      );

      const menubar = screen.getByRole('menubar');
      expect(menubar).toBeInTheDocument();
    });

    it('should have aria-label for hamburger button', () => {
      render(
        <BrowserRouter>
          <Navigation activeSection="home" />
        </BrowserRouter>
      );

      const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveAttribute('aria-expanded');
    });
  });

  describe('Hero Component', () => {
    const heroProps = {
      name: portfolioData.owner.name,
      headline: portfolioData.owner.headline,
      subtitle: portfolioData.owner.subtitle,
      aboutSummary: portfolioData.owner.aboutSummary,
      photoUrl: portfolioData.owner.photoUrl,
      socialLinks: {
        linkedin: portfolioData.social.linkedin,
        github: portfolioData.social.github,
      },
    };

    it('should have semantic section with aria-labelledby', () => {
      render(<Hero {...heroProps} />);

      const section = screen.getByRole('region', { name: /ai & data science explorer/i });
      expect(section).toBeInTheDocument();
    });

    it('should have alt text for profile image', () => {
      render(<Hero {...heroProps} />);

      const img = screen.getByAltText(/alex johnson, ai & data science student/i);
      expect(img).toBeInTheDocument();
    });

    it('should have aria-labels for CTA buttons', () => {
      render(<Hero {...heroProps} />);

      const viewProjectsBtn = screen.getByRole('button', { name: /view my projects/i });
      const contactBtn = screen.getByRole('button', { name: /contact me/i });

      expect(viewProjectsBtn).toBeInTheDocument();
      expect(contactBtn).toBeInTheDocument();
    });

    it('should have navigation role for social links', () => {
      render(<Hero {...heroProps} />);

      const socialNav = screen.getByRole('navigation', { name: /social media links/i });
      expect(socialNav).toBeInTheDocument();
    });

    it('should have descriptive aria-labels for social links', () => {
      render(<Hero {...heroProps} />);

      const linkedinLink = screen.getByRole('link', { name: /visit.*linkedin profile/i });
      const githubLink = screen.getByRole('link', { name: /visit.*github profile/i });

      expect(linkedinLink).toBeInTheDocument();
      expect(githubLink).toBeInTheDocument();
    });
  });

  describe('About Component', () => {
    it('should have semantic section with aria-labelledby', () => {
      render(
        <About
          fullBio={portfolioData.owner.fullBio}
          timeline={portfolioData.timeline}
        />
      );

      const section = screen.getByRole('region', { name: /about me/i });
      expect(section).toBeInTheDocument();
    });

    it('should have navigation role for timeline carousel', () => {
      render(
        <About
          fullBio={portfolioData.owner.fullBio}
          timeline={portfolioData.timeline}
        />
      );

      const timelineNav = screen.getByRole('navigation', { name: /timeline/i });
      expect(timelineNav).toBeInTheDocument();
    });

    it('should have aria-labels for carousel navigation buttons', () => {
      render(
        <About
          fullBio={portfolioData.owner.fullBio}
          timeline={portfolioData.timeline}
        />
      );

      const prevButton = screen.getByRole('button', { name: /view previous timeline item/i });
      const nextButton = screen.getByRole('button', { name: /view next timeline item/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('should have aria-live region for timeline display', () => {
      render(
        <About
          fullBio={portfolioData.owner.fullBio}
          timeline={portfolioData.timeline}
        />
      );

      const liveRegion = screen.getByRole('region', { name: /timeline item/i });
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Skills Component', () => {
    it('should have semantic section with aria-labelledby', () => {
      render(<Skills skills={portfolioData.skills} />);

      const section = screen.getByRole('region', { name: /skills & expertise/i });
      expect(section).toBeInTheDocument();
    });

    it('should have navigation role for category filters', () => {
      render(<Skills skills={portfolioData.skills} />);

      const filtersNav = screen.getByRole('navigation', { name: /skills category filters/i });
      expect(filtersNav).toBeInTheDocument();
    });

    it('should have aria-pressed for filter buttons', () => {
      render(<Skills skills={portfolioData.skills} />);

      const allButton = screen.getByRole('button', { name: /filter skills by all/i });
      expect(allButton).toHaveAttribute('aria-pressed');
    });

    it('should have progressbar role for skill bars', () => {
      render(<Skills skills={portfolioData.skills} />);

      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars.length).toBeGreaterThan(0);

      // Check that each progressbar has proper ARIA attributes
      progressBars.forEach((bar) => {
        expect(bar).toHaveAttribute('aria-valuenow');
        expect(bar).toHaveAttribute('aria-valuemin', '0');
        expect(bar).toHaveAttribute('aria-valuemax', '100');
      });
    });

    it('should have list role for skills grid', () => {
      render(<Skills skills={portfolioData.skills} />);

      const skillsList = screen.getByRole('list', { name: /skills list/i });
      expect(skillsList).toBeInTheDocument();
    });
  });

  describe('Projects Component', () => {
    it('should have semantic section with aria-labelledby', () => {
      render(<Projects projects={portfolioData.projects} />);

      const section = screen.getByRole('region', { name: /featured projects/i });
      expect(section).toBeInTheDocument();
    });

    it('should have navigation role for category filters', () => {
      render(<Projects projects={portfolioData.projects} />);

      const filtersNav = screen.getByRole('navigation', { name: /project category filters/i });
      expect(filtersNav).toBeInTheDocument();
    });

    it('should have list role for projects grid', () => {
      render(<Projects projects={portfolioData.projects} />);

      const projectsList = screen.getByRole('list', { name: /projects list/i });
      expect(projectsList).toBeInTheDocument();
    });
  });

  describe('Experience Component', () => {
    it('should have semantic section with aria-labelledby', () => {
      render(
        <Experience
          experience={portfolioData.experience}
          certifications={portfolioData.certifications}
        />
      );

      const section = screen.getByRole('region', { name: /experience & certifications/i });
      expect(section).toBeInTheDocument();
    });

    it('should have list roles for experience and certifications', () => {
      render(
        <Experience
          experience={portfolioData.experience}
          certifications={portfolioData.certifications}
        />
      );

      const experienceList = screen.getByRole('list', { name: /professional experience list/i });
      const certificationsList = screen.getByRole('list', { name: /certifications list/i });

      expect(experienceList).toBeInTheDocument();
      expect(certificationsList).toBeInTheDocument();
    });

    it('should have time elements for dates', () => {
      const { container } = render(
        <Experience
          experience={portfolioData.experience}
          certifications={portfolioData.certifications}
        />
      );

      const timeElements = container.querySelectorAll('time');
      expect(timeElements.length).toBeGreaterThan(0);
    });
  });

  describe('Achievements Component', () => {
    it('should have semantic section with aria-labelledby', () => {
      render(<Achievements achievements={portfolioData.achievements} />);

      const section = screen.getByRole('region', { name: /achievements/i });
      expect(section).toBeInTheDocument();
    });

    it('should have list role for badges grid', () => {
      render(<Achievements achievements={portfolioData.achievements} />);

      const badgesList = screen.getByRole('list', { name: /achievements list/i });
      expect(badgesList).toBeInTheDocument();
    });

    it('should have descriptive aria-labels for achievement badges', () => {
      render(<Achievements achievements={portfolioData.achievements} />);

      const badges = screen.getAllByRole('listitem');
      expect(badges.length).toBeGreaterThan(0);

      // Check that each badge has an aria-label
      badges.forEach((badge) => {
        expect(badge).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Contact Component', () => {
    const mockSubmit = async () => {};
    const socialLinks = [
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com', icon: '🐙' },
    ];

    it('should have semantic section with aria-labelledby', () => {
      render(<Contact onSubmit={mockSubmit} socialLinks={socialLinks} />);

      const section = screen.getByRole('region', { name: /get in touch/i });
      expect(section).toBeInTheDocument();
    });

    it('should have form with aria-label', () => {
      render(<Contact onSubmit={mockSubmit} socialLinks={socialLinks} />);

      const form = screen.getByRole('form', { name: /contact form/i });
      expect(form).toBeInTheDocument();
    });

    it('should have proper labels for form fields', () => {
      render(<Contact onSubmit={mockSubmit} socialLinks={socialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
    });

    it('should have aria-required for required fields', () => {
      render(<Contact onSubmit={mockSubmit} socialLinks={socialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(messageInput).toHaveAttribute('aria-required', 'true');
    });

    it('should have navigation role for social links', () => {
      render(<Contact onSubmit={mockSubmit} socialLinks={socialLinks} />);

      const socialNav = screen.getByRole('navigation', { name: /connect with me/i });
      expect(socialNav).toBeInTheDocument();
    });
  });

  describe('ThemeSwitcher Component', () => {
    it('should have group role with aria-label', () => {
      render(<ThemeSwitcher />);

      const group = screen.getByRole('group', { name: /theme selection/i });
      expect(group).toBeInTheDocument();
    });

    it('should have aria-pressed for theme buttons', () => {
      render(<ThemeSwitcher />);

      const lightButton = screen.getByRole('button', { name: /switch to light theme/i });
      expect(lightButton).toHaveAttribute('aria-pressed');
    });
  });
});

describe('Accessibility - Keyboard Navigation', () => {
  it('should have tabindex for interactive project cards', () => {
    render(<Projects projects={portfolioData.projects} />);

    const cards = screen.getAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);

    // Check that cards are keyboard focusable
    cards.forEach((card) => {
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  it('should have tabindex for interactive achievement badges', () => {
    render(<Achievements achievements={portfolioData.achievements} />);

    const badges = screen.getAllByRole('listitem');
    expect(badges.length).toBeGreaterThan(0);

    // Check that badges are keyboard focusable
    badges.forEach((badge) => {
      expect(badge).toHaveAttribute('tabindex', '0');
    });
  });

  it('should have tabindex for interactive skill items', () => {
    render(<Skills skills={portfolioData.skills} />);

    const skillItems = screen.getAllByRole('listitem');
    expect(skillItems.length).toBeGreaterThan(0);

    // Check that skill items are keyboard focusable
    skillItems.forEach((item) => {
      expect(item).toHaveAttribute('tabindex', '0');
    });
  });
});

describe('Accessibility - Alt Text for Images', () => {
  it('should have alt text for hero profile image', () => {
    const heroProps = {
      name: portfolioData.owner.name,
      headline: portfolioData.owner.headline,
      subtitle: portfolioData.owner.subtitle,
      aboutSummary: portfolioData.owner.aboutSummary,
      photoUrl: portfolioData.owner.photoUrl,
      socialLinks: {
        linkedin: portfolioData.social.linkedin,
        github: portfolioData.social.github,
      },
    };

    render(<Hero {...heroProps} />);

    const img = screen.getByAltText(/alex johnson, ai & data science student/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt');
  });

  it('should have role="img" and aria-label for project images', () => {
    const { container } = render(<Projects projects={portfolioData.projects} />);

    const projectImages = container.querySelectorAll('[role="img"]');
    expect(projectImages.length).toBeGreaterThan(0);

    projectImages.forEach((img) => {
      expect(img).toHaveAttribute('aria-label');
    });
  });
});

describe('Accessibility - Semantic HTML5 Elements', () => {
  it('should use semantic section elements', () => {
    const { container } = render(
      <div>
        <Hero
          name={portfolioData.owner.name}
          headline={portfolioData.owner.headline}
          subtitle={portfolioData.owner.subtitle}
          aboutSummary={portfolioData.owner.aboutSummary}
          photoUrl={portfolioData.owner.photoUrl}
          socialLinks={{
            linkedin: portfolioData.social.linkedin,
            github: portfolioData.social.github,
          }}
        />
        <About
          fullBio={portfolioData.owner.fullBio}
          timeline={portfolioData.timeline}
        />
        <Skills skills={portfolioData.skills} />
      </div>
    );

    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should use semantic nav elements', () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation activeSection="home" />
      </BrowserRouter>
    );

    const navElements = container.querySelectorAll('nav');
    expect(navElements.length).toBeGreaterThan(0);
  });

  it('should use semantic article elements for content cards', () => {
    const { container } = render(
      <Experience
        experience={portfolioData.experience}
        certifications={portfolioData.certifications}
      />
    );

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('should use semantic figure element for hero photo', () => {
    const { container } = render(
      <Hero
        name={portfolioData.owner.name}
        headline={portfolioData.owner.headline}
        subtitle={portfolioData.owner.subtitle}
        aboutSummary={portfolioData.owner.aboutSummary}
        photoUrl={portfolioData.owner.photoUrl}
        socialLinks={{
          linkedin: portfolioData.social.linkedin,
          github: portfolioData.social.github,
        }}
      />
    );

    const figure = container.querySelector('figure');
    expect(figure).toBeInTheDocument();
  });

  it('should use semantic time elements for dates', () => {
    const { container } = render(
      <Experience
        experience={portfolioData.experience}
        certifications={portfolioData.certifications}
      />
    );

    const timeElements = container.querySelectorAll('time');
    expect(timeElements.length).toBeGreaterThan(0);
  });
});
