# Hero Component

## Overview
The Hero component is the main landing section of the portfolio website, featuring an animated background, personal information, call-to-action buttons, and social media links.

## Features Implemented

### ✅ Task 5.1: Component Structure
- **Animated particle background** using tsParticles with customizable colors
- **Owner photo** with hover animation effects
- **Headline and subtitle** with gradient text styling
- **About Me summary** (2-3 lines)
- **Two CTA buttons**: "View Projects" and "Contact" with smooth scroll functionality
- **Social media icons**: LinkedIn and GitHub with micro-interactions
- **Accessibility**: ARIA labels, alt text, and keyboard navigation support

### ✅ Task 5.2: Animations
- **Entrance animations** for all text elements using Framer Motion
  - Headline: fade in + slide up (delay: 0.3s)
  - Subtitle: fade in + slide up (delay: 0.5s)
  - About summary: fade in + slide up (delay: 0.7s)
  - CTA buttons: fade in + slide up (delay: 0.9s)
  - Social icons: fade in (delay: 1.1s)
- **Photo animation**: fade in + scale (delay: 0.2s)
- **Hover animations**:
  - Photo: scale + rotate effect
  - Social icons: translate + rotate + color change
  - CTA buttons: translate + shadow enhancement
- **Smooth scroll** to sections when CTA buttons are clicked

### ✅ Task 5.3: Responsive Design
- **Desktop layout** (>768px): Side-by-side photo and text
- **Tablet layout** (768px): Adjusted spacing and sizing
- **Mobile layout** (<768px): Stacked vertical layout with centered content
- **Touch targets**: Minimum 44x44px for all interactive elements
- **Responsive typography**: Scales appropriately for each breakpoint
- **Reduced motion support**: Respects `prefers-reduced-motion` setting

## Component Props

```typescript
interface HeroProps {
  name: string;           // Owner's name (used for photo alt text)
  headline: string;       // Main headline text
  subtitle: string;       // Subtitle text
  aboutSummary: string;   // Short about me summary (2-3 lines)
  photoUrl: string;       // Path to owner's photo
  socialLinks: {
    linkedin: string;     // LinkedIn profile URL
    github: string;       // GitHub profile URL
  };
}
```

## Usage

```tsx
import Hero from './components/Hero';
import { portfolioData } from './data/portfolioData';

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
```

## Tests

### Unit Tests (Hero.test.tsx)
- ✅ Renders hero section with correct structure
- ✅ Displays headline, subtitle, and about summary
- ✅ Shows owner photo with correct alt text
- ✅ Renders CTA buttons with proper labels
- ✅ Social links open in new tab with correct attributes
- ✅ Minimum touch target sizes for buttons and icons
- ✅ Scroll functionality for CTA buttons

### Animation Tests (Hero.animations.test.tsx)
- ✅ Entrance animations on all text elements
- ✅ Photo entrance animation with scale effect
- ✅ CTA buttons entrance animation
- ✅ Social icons entrance animation
- ✅ Hover animation classes applied correctly

### Responsive Tests (Hero.responsive.test.tsx)
- ✅ Renders correctly on desktop (1024px)
- ✅ Renders correctly on tablet (768px)
- ✅ Renders correctly on mobile (375px)
- ✅ Maintains minimum touch target sizes on mobile
- ✅ All content elements visible on all breakpoints
- ✅ Proper responsive structure

**Total: 29 tests passing**

## Requirements Validated

This component validates the following requirements from the spec:

- **5.1**: Headline "AI & Data Science Explorer" ✅
- **5.2**: Subtitle and two CTA buttons ✅
- **5.3**: Animated particle background ✅
- **5.4**: Animated headline and subtitle on load ✅
- **5.5**: Smooth scroll on CTA button click ✅
- **5.6**: Owner's photo in corner ✅
- **5.7**: Hover animation on photo ✅
- **5.8**: Short "About Me" summary ✅
- **5.9**: LinkedIn and GitHub icons with animations ✅
- **5.10**: Micro-animations on social icon hover/focus ✅
- **5.11**: Social links open in new tab ✅
- **5.12**: Responsive layout across breakpoints ✅
- **12.1**: Responsive design for mobile, tablet, desktop ✅

## Files

- `Hero.tsx` - Main component implementation
- `Hero.css` - Component styles with responsive breakpoints
- `Hero.test.tsx` - Unit tests
- `Hero.animations.test.tsx` - Animation tests
- `Hero.responsive.test.tsx` - Responsive design tests
- `index.ts` - Export file

## Dependencies

- `react` - Component framework
- `framer-motion` - Animation library
- `react-tsparticles` - Particle background
- `tsparticles-slim` - Lightweight particles engine
- `tsparticles-engine` - Particles engine types

## Accessibility Features

- ✅ Semantic HTML with proper section and heading structure
- ✅ ARIA labels on all interactive elements
- ✅ Alt text on images
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Minimum touch target sizes (44x44px)
- ✅ Reduced motion support via CSS media query
- ✅ Color contrast compliance with theme system

## Performance Considerations

- Particle animation optimized with 60 FPS limit
- GPU-accelerated CSS transforms for animations
- Lazy loading ready for images
- Minimal re-renders with React optimization
