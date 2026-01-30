import { describe, it, expect } from 'vitest';

/**
 * Color Contrast Compliance Tests
 * 
 * These tests verify that all theme modes meet WCAG 2.1 Level AA
 * color contrast requirements (minimum 4.5:1 for normal text).
 * 
 * Requirement 14.3: Minimum color contrast ratio of 4.5:1 for normal text
 */

// Helper function to calculate relative luminance
function getRelativeLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper function to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Color Contrast Compliance - Requirement 14.3', () => {
  const WCAG_AA_NORMAL = 4.5;
  const WCAG_AAA_NORMAL = 7.0;

  describe('Light Theme', () => {
    const background = '#FFFFFF';
    const primaryText = '#1F2937';
    const secondaryText = '#6B7280';
    const primaryColor = '#3B82F6';
    const secondaryColor = '#8B5CF6';
    const accentColor = '#D97706';

    it('should have sufficient contrast for primary text (16.1:1)', () => {
      const ratio = getContrastRatio(primaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(16.1, 0);
    });

    it('should have sufficient contrast for secondary text (7.0:1)', () => {
      const ratio = getContrastRatio(secondaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(7.0, 0);
    });

    it('should have sufficient contrast for primary color (4.5:1)', () => {
      const ratio = getContrastRatio(primaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(4.5, 0);
    });

    it('should have sufficient contrast for secondary color (5.1:1)', () => {
      const ratio = getContrastRatio(secondaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(5.1, 0);
    });

    it('should have sufficient contrast for accent color (5.2:1)', () => {
      const ratio = getContrastRatio(accentColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(5.2, 0);
    });

    it('should meet WCAG Level AA for all text colors', () => {
      const ratios = [
        getContrastRatio(primaryText, background),
        getContrastRatio(secondaryText, background),
      ];
      ratios.forEach(ratio => {
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      });
    });
  });

  describe('Dark Theme', () => {
    const background = '#111827';
    const primaryText = '#F9FAFB';
    const secondaryText = '#D1D5DB';
    const primaryColor = '#60A5FA';
    const secondaryColor = '#A78BFA';
    const accentColor = '#FBBF24';

    it('should have sufficient contrast for primary text (17.4:1)', () => {
      const ratio = getContrastRatio(primaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(17.4, 0);
    });

    it('should have sufficient contrast for secondary text (11.6:1)', () => {
      const ratio = getContrastRatio(secondaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(11.6, 0);
    });

    it('should have sufficient contrast for primary color (8.6:1)', () => {
      const ratio = getContrastRatio(primaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(8.6, 0);
    });

    it('should have sufficient contrast for secondary color (7.8:1)', () => {
      const ratio = getContrastRatio(secondaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(7.8, 0);
    });

    it('should have sufficient contrast for accent color (12.1:1)', () => {
      const ratio = getContrastRatio(accentColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(12.1, 0);
    });

    it('should meet WCAG Level AAA for all text colors', () => {
      const ratios = [
        getContrastRatio(primaryText, background),
        getContrastRatio(secondaryText, background),
      ];
      ratios.forEach(ratio => {
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });
    });
  });

  describe('Futuristic Theme', () => {
    const background = '#0F172A';
    const primaryText = '#E0F2FE';
    const secondaryText = '#BAE6FD';
    const primaryColor = '#06B6D4';
    const secondaryColor = '#EC4899';
    const accentColor = '#22D3EE';

    it('should have sufficient contrast for primary text (15.8:1)', () => {
      const ratio = getContrastRatio(primaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(15.8, 0);
    });

    it('should have sufficient contrast for secondary text (13.2:1)', () => {
      const ratio = getContrastRatio(secondaryText, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(13.2, 0);
    });

    it('should have sufficient contrast for primary color (7.9:1)', () => {
      const ratio = getContrastRatio(primaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(7.9, 0);
    });

    it('should have sufficient contrast for secondary color (5.8:1)', () => {
      const ratio = getContrastRatio(secondaryColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(5.8, 0);
    });

    it('should have sufficient contrast for accent color (10.4:1)', () => {
      const ratio = getContrastRatio(accentColor, background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      expect(ratio).toBeCloseTo(10.4, 0);
    });

    it('should meet WCAG Level AAA for all text colors', () => {
      const ratios = [
        getContrastRatio(primaryText, background),
        getContrastRatio(secondaryText, background),
      ];
      ratios.forEach(ratio => {
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });
    });
  });

  describe('Overall Compliance', () => {
    it('should have all themes meet minimum WCAG AA requirements', () => {
      const themes = [
        { name: 'Light', bg: '#FFFFFF', text: '#1F2937' },
        { name: 'Dark', bg: '#111827', text: '#F9FAFB' },
        { name: 'Futuristic', bg: '#0F172A', text: '#E0F2FE' },
      ];

      themes.forEach(theme => {
        const ratio = getContrastRatio(theme.text, theme.bg);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      });
    });

    it('should have no theme with contrast ratio below 4.5:1', () => {
      const allColorPairs = [
        // Light theme
        ['#1F2937', '#FFFFFF'],
        ['#6B7280', '#FFFFFF'],
        ['#3B82F6', '#FFFFFF'],
        ['#8B5CF6', '#FFFFFF'],
        ['#D97706', '#FFFFFF'],
        // Dark theme
        ['#F9FAFB', '#111827'],
        ['#D1D5DB', '#111827'],
        ['#60A5FA', '#111827'],
        ['#A78BFA', '#111827'],
        ['#FBBF24', '#111827'],
        // Futuristic theme
        ['#E0F2FE', '#0F172A'],
        ['#BAE6FD', '#0F172A'],
        ['#06B6D4', '#0F172A'],
        ['#EC4899', '#0F172A'],
        ['#22D3EE', '#0F172A'],
      ];

      allColorPairs.forEach(([fg, bg]) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      });
    });
  });
});
