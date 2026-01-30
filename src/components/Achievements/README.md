# Achievements Component

## Overview

The Achievements component displays notable accomplishments as interactive badge icons with tooltips. It features staggered reveal animations when scrolling into view and hover interactions.

## Features

- **Badge Icon Layout**: Displays achievements as circular badge icons in a responsive grid
- **Tooltip Display**: Shows achievement title and description on hover
- **Staggered Animations**: Badges reveal with staggered timing for visual appeal
- **Hover Effects**: Badges scale and rotate slightly on hover
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Accessibility**: Includes ARIA labels and respects reduced motion preferences

## Props

```typescript
interface AchievementsProps {
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}
```

## Usage

```tsx
import Achievements from './components/Achievements/Achievements';
import { portfolioData } from './data/portfolioData';

function App() {
  return (
    <Achievements achievements={portfolioData.achievements} />
  );
}
```

## Requirements Satisfied

- **10.1**: Display achievements as interactive badge icons
- **10.2**: Animate badges on hover
- **10.3**: Display description tooltip on hover
- **10.4**: Reveal badges with staggered animations on viewport entry

## Animation Details

- **Container Animation**: Staggered children with 0.1s delay between each badge
- **Badge Reveal**: Spring animation with scale and rotation
- **Hover Effect**: Scale to 1.15 and rotate 5 degrees
- **Tooltip**: Fade in with slight upward motion

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard accessible (hover states work with focus)
- Respects `prefers-reduced-motion` setting
- Tooltips have `role="tooltip"` attribute
