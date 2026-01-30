# About Component

## Overview

The About component displays a professional introduction with text highlights and an interactive timeline/carousel for education and milestones. It features scroll-triggered entrance animations and smooth transitions.

## Features

- **Professional Bio**: Displays full biography with automatic keyword highlighting
- **Interactive Timeline**: Carousel-style navigation through education and milestone events
- **Scroll Animations**: Content animates into view when scrolling
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Reduced Motion Support**: Respects user's motion preferences

## Props

```typescript
interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'milestone';
}

interface AboutProps {
  fullBio: string;
  timeline: TimelineItem[];
}
```

### `fullBio`
- Type: `string`
- Description: Full biography text. Can include newlines for paragraph breaks.
- Keywords automatically highlighted: AI, Data Science, machine learning, deep learning, data-driven, technology

### `timeline`
- Type: `TimelineItem[]`
- Description: Array of timeline items representing education and milestones
- Each item includes year, title, institution, description, and type

## Usage Example

```tsx
import About from './components/About/About';

const timeline = [
  {
    id: 'university',
    year: '2021 - Present',
    title: 'B.S. in AI & Data Science',
    institution: 'University Name',
    description: 'Focusing on machine learning, deep learning, and data analytics.',
    type: 'education',
  },
  {
    id: 'first-project',
    year: '2022',
    title: 'First ML Project',
    institution: 'Personal Project',
    description: 'Built my first machine learning model for sentiment analysis.',
    type: 'milestone',
  },
];

<About
  fullBio="I'm a 3rd-year AI & Data Science student..."
  timeline={timeline}
/>
```

## Styling

The component uses CSS custom properties for theming:
- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary brand color
- `--color-background`: Background color
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--color-accent`: Accent color for focus states
- `--card-background`: Card background (optional)

## Animations

- **Entrance Animation**: Staggered fade-in with upward motion
- **Carousel Transition**: Smooth slide animation when changing timeline items
- **Hover Effects**: Scale and color transitions on interactive elements
- **Float Animation**: Subtle floating effect on timeline badges

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Focus indicators on all focusable elements
- Minimum touch target size of 44x44px
- Respects `prefers-reduced-motion` setting

## Requirements Satisfied

- **6.1**: Professional introduction with animated text highlights
- **6.2**: Timeline/carousel for education and milestones
- **6.3**: Scroll-triggered entrance animations
- **6.4**: Smooth navigation controls for timeline

## Browser Support

- Modern browsers with ES6+ support
- Requires Framer Motion and react-intersection-observer
