import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Responsive Design Implementation Tests
 * 
 * These tests validate that the responsive design requirements are met
 * by checking the CSS files for proper breakpoints, touch target sizes,
 * and font sizes.
 * 
 * Requirements validated:
 * - 12.1: Responsive layouts for mobile, tablet, and desktop
 * - 12.3: Touch-optimized interactions
 * - 12.4: Minimum font size (16px) on mobile
 * - 12.5: Minimum touch target size (44x44px)
 */

describe('Responsive Design - CSS Implementation', () => {
  const globalsCSS = readFileSync(resolve(__dirname, '../styles/globals.css'), 'utf-8');
  
  describe('Requirement 12.1: Responsive Breakpoints', () => {
    it('should define mobile breakpoint (max-width: 640px)', () => {
      expect(globalsCSS).toContain('@media (max-width: 640px)');
    });

    it('should define tablet breakpoint (min-width: 641px) and (max-width: 1024px)', () => {
      expect(globalsCSS).toMatch(/@media \(min-width: 641px\) and \(max-width: 1024px\)/);
    });

    it('should define desktop breakpoint (min-width: 1025px)', () => {
      expect(globalsCSS).toContain('@media (min-width: 1025px)');
    });

    it('should have responsive container utilities', () => {
      expect(globalsCSS).toContain('.container-responsive');
    });

    it('should have responsive grid utilities', () => {
      expect(globalsCSS).toContain('.grid-responsive');
    });

    it('should have responsive spacing utilities', () => {
      expect(globalsCSS).toContain('.section-padding');
    });
  });

  describe('Requirement 12.4: Minimum Font Size (16px)', () => {
    it('should set base font size to 16px on html', () => {
      expect(globalsCSS).toMatch(/html\s*{[^}]*font-size:\s*16px/);
    });

    it('should set base font size to 16px on body', () => {
      expect(globalsCSS).toMatch(/body\s*{[^}]*font-size:\s*16px/);
    });

    it('should ensure form inputs have 16px font size on mobile', () => {
      // Check that the mobile media query contains input with font-size: 16px
      const mobileSection = globalsCSS.match(/@media \(max-width: 768px\)\s*{[^@]*}/s);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('input');
      expect(mobileSection![0]).toContain('font-size: 16px');
    });

    it('should have mobile typography with minimum 16px base', () => {
      const mobileTypography = globalsCSS.match(/@media \(max-width: 640px\)\s*{[^}]*body\s*{[^}]*font-size:\s*16px/s);
      expect(mobileTypography).toBeTruthy();
    });
  });

  describe('Requirement 12.5: Minimum Touch Target Size (44x44px)', () => {
    it('should ensure buttons have minimum 44x44px on mobile', () => {
      const buttonTouchTarget = globalsCSS.match(/@media \(max-width: 768px\)[^}]*button[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
      expect(buttonTouchTarget).toBeTruthy();
    });

    it('should ensure links have minimum 44x44px on mobile', () => {
      const linkTouchTarget = globalsCSS.match(/@media \(max-width: 768px\)[^}]*\ba\b[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
      expect(linkTouchTarget).toBeTruthy();
    });

    it('should ensure form inputs have minimum 44px height on mobile', () => {
      const inputTouchTarget = globalsCSS.match(/@media \(max-width: 768px\)[^}]*input[^}]*min-height:\s*44px/s);
      expect(inputTouchTarget).toBeTruthy();
    });
  });

  describe('Requirement 12.3: Touch-Optimized Interactions', () => {
    it('should have touch device media query', () => {
      expect(globalsCSS).toContain('@media (hover: none) and (pointer: coarse)');
    });

    it('should set touch-action: manipulation on mobile', () => {
      expect(globalsCSS).toContain('touch-action: manipulation');
    });

    it('should have webkit-overflow-scrolling for smooth scrolling', () => {
      expect(globalsCSS).toContain('-webkit-overflow-scrolling: touch');
    });

    it('should have custom tap highlight color', () => {
      expect(globalsCSS).toContain('-webkit-tap-highlight-color');
    });

    it('should prevent text size adjustment on mobile', () => {
      expect(globalsCSS).toContain('-webkit-text-size-adjust: 100%');
      expect(globalsCSS).toContain('text-size-adjust: 100%');
    });
  });

  describe('Component-Specific Responsive Design', () => {
    const heroCSS = readFileSync(resolve(__dirname, '../components/Hero/Hero.css'), 'utf-8');
    const aboutCSS = readFileSync(resolve(__dirname, '../components/About/About.css'), 'utf-8');
    const skillsCSS = readFileSync(resolve(__dirname, '../components/Skills/Skills.css'), 'utf-8');
    const projectsCSS = readFileSync(resolve(__dirname, '../components/Projects/Projects.css'), 'utf-8');
    const contactCSS = readFileSync(resolve(__dirname, '../components/Contact/Contact.css'), 'utf-8');

    it('Hero section should have mobile responsive styles', () => {
      expect(heroCSS).toContain('@media (max-width: 768px)');
      expect(heroCSS).toMatch(/\.cta-button\s*{[^}]*min-height:\s*44px/);
    });

    it('Hero social icons should have minimum 44x44px', () => {
      expect(heroCSS).toMatch(/\.social-icon\s*{[^}]*width:\s*44px[^}]*height:\s*44px/s);
    });

    it('About section should have mobile responsive styles', () => {
      expect(aboutCSS).toContain('@media (max-width: 768px)');
      expect(aboutCSS).toMatch(/\.carousel-button\s*{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
    });

    it('Skills section should have mobile responsive styles', () => {
      expect(skillsCSS).toContain('@media (max-width: 768px)');
      expect(skillsCSS).toMatch(/\.filter-button\s*{[^}]*min-height:\s*44px/s);
    });

    it('Projects section should have mobile responsive styles', () => {
      expect(projectsCSS).toContain('@media (max-width: 768px)');
      expect(projectsCSS).toMatch(/\.filter-button\s*{[^}]*min-height:\s*44px/s);
    });

    it('Contact section should have mobile responsive styles', () => {
      expect(contactCSS).toContain('@media (max-width: 768px)');
      expect(contactCSS).toMatch(/\.form-input\s*{[^}]*min-height:\s*44px/s);
      expect(contactCSS).toMatch(/\.form-submit\s*{[^}]*min-height:\s*44px/s);
    });
  });

  describe('Accessibility and Reduced Motion', () => {
    it('should have prefers-reduced-motion support', () => {
      expect(globalsCSS).toContain('@media (prefers-reduced-motion: reduce)');
    });

    it('should have focus-visible styles', () => {
      expect(globalsCSS).toContain(':focus-visible');
    });

    it('should have keyboard focus indicators', () => {
      expect(globalsCSS).toMatch(/button:focus-visible[^}]*outline/);
    });
  });

  describe('Responsive Layout Utilities', () => {
    it('should have mobile-only visibility helpers', () => {
      expect(globalsCSS).toContain('.hide-mobile');
      expect(globalsCSS).toContain('.show-mobile-only');
    });

    it('should have tablet visibility helpers', () => {
      expect(globalsCSS).toContain('.hide-tablet');
    });

    it('should have desktop visibility helpers', () => {
      expect(globalsCSS).toContain('.hide-desktop');
    });
  });
});

describe('Responsive Design - Navigation Component', () => {
  const navCSS = readFileSync(resolve(__dirname, '../components/Navigation/Navigation.css'), 'utf-8');

  it('should have hamburger menu styles', () => {
    expect(navCSS).toContain('.hamburger-button');
  });

  it('should have mobile menu overlay styles', () => {
    expect(navCSS).toContain('.mobile-menu-overlay');
  });

  it('should show hamburger on mobile (max-width: 640px)', () => {
    expect(navCSS).toMatch(/@media \(max-width: 640px\)[^}]*\.hamburger-button\s*{[^}]*display:\s*flex/s);
  });

  it('should have mobile menu responsive styles', () => {
    expect(navCSS).toContain('@media (max-width: 768px)');
  });
});

describe('Responsive Design - Documentation', () => {
  it('should have responsive implementation documentation', () => {
    const docExists = require('fs').existsSync(resolve(__dirname, '../../docs/RESPONSIVE_IMPLEMENTATION.md'));
    expect(docExists).toBe(true);
  });

  it('documentation should cover all requirements', () => {
    const doc = readFileSync(resolve(__dirname, '../../docs/RESPONSIVE_IMPLEMENTATION.md'), 'utf-8');
    
    expect(doc).toContain('Requirement 12.1');
    expect(doc).toContain('Requirement 12.3');
    expect(doc).toContain('Requirement 12.4');
    expect(doc).toContain('Requirement 12.5');
  });

  it('documentation should define breakpoints', () => {
    const doc = readFileSync(resolve(__dirname, '../../docs/RESPONSIVE_IMPLEMENTATION.md'), 'utf-8');
    
    expect(doc).toContain('Mobile');
    expect(doc).toContain('Tablet');
    expect(doc).toContain('Desktop');
    expect(doc).toContain('640px');
    expect(doc).toContain('1024px');
  });

  it('documentation should cover touch target sizing', () => {
    const doc = readFileSync(resolve(__dirname, '../../docs/RESPONSIVE_IMPLEMENTATION.md'), 'utf-8');
    
    expect(doc).toContain('44x44');
    expect(doc).toContain('touch target');
  });

  it('documentation should cover minimum font size', () => {
    const doc = readFileSync(resolve(__dirname, '../../docs/RESPONSIVE_IMPLEMENTATION.md'), 'utf-8');
    
    expect(doc).toContain('16px');
    expect(doc).toContain('font size');
  });
});
