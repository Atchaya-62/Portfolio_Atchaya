# Experience Component

The Experience component displays professional experience and certifications in an interactive card layout with slide-in animations.

## Features

- **Card Layout**: Displays experience and certifications as interactive cards
- **Icons**: Each entry includes an icon that animates on viewport entry
- **Slide-in Animations**: Cards slide in from the left when entering the viewport
- **Icon Animations**: Icons scale and rotate with spring animation
- **Hover Effects**: Cards scale slightly and show border highlight on hover
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Accessibility**: Proper ARIA labels and semantic HTML

## Props

```typescript
interface ExperienceProps {
  experience: Experience[];
  certifications: Certification[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  icon: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
}
```

## Usage

```tsx
import Experience from './components/Experience/Experience';
import { portfolioData } from './data/portfolioData';

function App() {
  return (
    <Experience
      experience={portfolioData.experience}
      certifications={portfolioData.certifications}
    />
  );
}
```

## Animations

- **Slide-in Effect**: Cards slide in from left with opacity fade (x: -50 to 0)
- **Icon Animation**: Icons scale from 0 to 1 with rotation (-180deg to 0deg)
- **Staggered Children**: Cards animate sequentially with 0.15s delay
- **Hover Scale**: Cards scale to 1.02 on hover
- **Intersection Observer**: Animations trigger when section enters viewport (20% threshold)

## Accessibility

- Semantic HTML with `<section>`, `<article>` elements
- ARIA labels for screen readers
- Keyboard accessible (cards are focusable)
- Icons marked as `aria-hidden="true"`
- Descriptive labels for each card

## Requirements Validated

- **9.1**: Display experience and certifications as interactive cards
- **9.2**: Animate cards with slide-in effect on viewport entry
- **9.3**: Display icons for each entry
- **9.4**: Animate icons when cards enter viewport
