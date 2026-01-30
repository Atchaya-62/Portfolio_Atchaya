# ProjectCard Component

An interactive card component for displaying project information with flip animation and parallax tilt effects.

## Features

- **Card Layout**: Displays project title, tech stack, and description
- **Flip Animation**: Card flips on hover to reveal detailed information
- **Parallax Tilt Effect**: 3D tilt effect that follows mouse movement
- **Link Buttons**: GitHub and demo link buttons (conditionally rendered)
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Theme Support**: Works with light, dark, and futuristic themes
- **Accessibility**: Full keyboard navigation and ARIA labels

## Usage

```tsx
import { ProjectCard } from './components/Projects';
import type { Project } from './types';

const project: Project = {
  id: 'my-project',
  title: 'My Awesome Project',
  description: 'A detailed description of the project',
  techStack: ['React', 'TypeScript', 'CSS'],
  category: 'Web Development',
  githubUrl: 'https://github.com/user/project',
  demoUrl: 'https://demo.example.com',
  imageUrl: '/images/project.jpg',
};

function App() {
  return <ProjectCard project={project} />;
}
```

## Props

### ProjectCardProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| project | Project | Yes | Project data object containing all project information |

### Project Interface

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
}
```

## Animations

### Flip Animation
- Triggered on mouse enter
- Card rotates 180 degrees on Y-axis
- Smooth transition over 0.6 seconds
- Reveals back of card with description and links

### Parallax Tilt Effect
- Activated on mouse move over the card
- Calculates rotation based on cursor position
- Maximum rotation: ±10 degrees on X and Y axes
- Includes slight scale effect (1.05x) on hover
- Resets smoothly on mouse leave

### Entrance Animation
- Fades in with upward motion
- Uses Framer Motion for smooth animation
- Duration: 0.5 seconds

## Styling

The component uses CSS custom properties for theming:

```css
--card-background: Background color of the card
--card-border: Border color
--text-primary: Primary text color
--text-secondary: Secondary text color
--accent-color: Accent color for tech tags
--github-bg: GitHub button background
--github-hover: GitHub button hover state
--demo-bg: Demo button background
--demo-hover: Demo button hover state
```

## Accessibility

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Card can be focused and navigated with keyboard
- **Screen Reader Support**: Image roles and alt text provided
- **Focus Indicators**: Visible outline on focus
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Responsive Behavior

### Desktop (> 768px)
- Card height: 400px
- Full-size images and text
- Side-by-side link buttons

### Mobile (≤ 768px)
- Card height: 350px
- Reduced padding and font sizes
- Stacked link buttons
- Touch-optimized interactions

## Theme Support

The component automatically adapts to three theme modes:

1. **Light Mode**: Clean, bright appearance
2. **Dark Mode**: Dark background with light text
3. **Futuristic Mode**: Neon accents and glowing effects

## Requirements Validation

This component satisfies the following requirements:

- **Requirement 8.1**: Displays project title, tech stack, and description
- **Requirement 8.2**: Implements flip animation on hover
- **Requirement 8.3**: Applies parallax tilt effect
- **Requirement 8.4**: Includes GitHub and demo link buttons

## Testing

The component includes comprehensive unit tests covering:

- Rendering of all project information
- Conditional rendering of links
- Flip animation behavior
- Parallax tilt effect
- Accessibility features
- Event handling

Run tests with:

```bash
npm test ProjectCard.test.tsx
```

## Browser Support

- Modern browsers with CSS transform support
- Fallback for browsers without 3D transform support
- Graceful degradation for reduced motion preferences
