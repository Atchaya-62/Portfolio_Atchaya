# Projects Component

A comprehensive section component for displaying a grid of project cards with category filtering and scroll-triggered animations.

## Features

- **Grid Layout**: Responsive grid that adapts to different screen sizes
- **Category Filtering**: Filter projects by category with smooth transitions
- **Scroll-Triggered Animations**: Elements animate into view when scrolling
- **Staggered Animations**: Project cards animate in sequence for visual appeal
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Theme Support**: Works with light, dark, and futuristic themes
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support

## Usage

```tsx
import { Projects } from './components/Projects';
import { portfolioData } from './data/portfolioData';

function App() {
  return <Projects projects={portfolioData.projects} />;
}
```

## Props

### ProjectsProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| projects | Project[] | Yes | Array of project objects to display |

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

## Features in Detail

### Category Filtering

The component automatically extracts unique categories from the projects array and creates filter buttons. The "All" category is always available to show all projects.

**Behavior:**
- Clicking a category button filters projects to show only matching items
- Active category button is highlighted
- Filtering happens within 300ms (satisfies Requirement 8.6)
- Empty state message shown when no projects match the filter

### Scroll-Triggered Animations

Uses React Intersection Observer to detect when the section enters the viewport:

**Animation Sequence:**
1. Section header fades in and slides down (0.6s)
2. Filter buttons fade in and slide down (0.6s, 0.2s delay)
3. Projects grid fades in (0.6s, 0.4s delay)
4. Individual project cards animate in with staggered delays (0.5s each, 0.1s stagger)

**Configuration:**
- Threshold: 0.1 (triggers when 10% visible)
- Trigger once: true (animation plays only once)

### Grid Layout

The projects grid uses CSS Grid with auto-fill:
- Desktop: Multiple columns (min 350px per card)
- Tablet: 2 columns
- Mobile: 1 column

## Styling

The component uses CSS custom properties for theming:

```css
--background: Section background color
--text-primary: Primary text color
--text-secondary: Secondary text color
--primary: Primary brand color
--secondary: Secondary brand color
--accent: Accent color
```

## Accessibility

- **ARIA Labels**: Section and filter group have descriptive labels
- **ARIA Pressed**: Filter buttons indicate their pressed state
- **Keyboard Navigation**: All filters are keyboard accessible
- **Focus Indicators**: Visible outline on focus (2px accent color)
- **Screen Reader Support**: Descriptive labels for all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Responsive Behavior

### Desktop (> 768px)
- Multi-column grid layout
- Full-size typography
- Horizontal filter button layout

### Tablet (768px - 480px)
- 2-column grid layout
- Slightly reduced typography
- Wrapped filter buttons

### Mobile (≤ 480px)
- Single column layout
- Compact typography
- Stacked filter buttons
- Reduced padding

## Theme Support

The component automatically adapts to three theme modes:

1. **Light Mode**: Clean, bright appearance with blue accents
2. **Dark Mode**: Dark background with light text and softer colors
3. **Futuristic Mode**: Dark background with cyan and pink neon accents

## Requirements Validation

This component satisfies the following requirements:

- **Requirement 8.5**: Displays projects in a grid layout
- **Requirement 8.6**: Implements category filtering with <300ms response time
- **Requirement 2.3**: Scroll-triggered animations when entering viewport
- **Requirement 12.1**: Responsive design for all screen sizes
- **Requirement 14.1**: Full keyboard navigation support
- **Requirement 14.2**: ARIA labels and roles for accessibility
- **Requirement 14.6**: Respects prefers-reduced-motion setting

## Animation Details

### Header Animation
- Initial: opacity 0, translateY -20px
- Final: opacity 1, translateY 0
- Duration: 0.6s

### Filter Animation
- Initial: opacity 0, translateY -10px
- Final: opacity 1, translateY 0
- Duration: 0.6s
- Delay: 0.2s

### Grid Animation
- Initial: opacity 0
- Final: opacity 1
- Duration: 0.6s
- Delay: 0.4s

### Card Stagger Animation
- Initial: opacity 0, translateY 30px
- Final: opacity 1, translateY 0
- Duration: 0.5s per card
- Stagger: 0.1s between cards

## Testing

The component includes comprehensive tests covering:

- Rendering with projects data
- Category filtering functionality
- Scroll-triggered animations
- Accessibility features
- Responsive behavior
- Empty state handling

Run tests with:

```bash
npm test Projects.test.tsx
```

## Browser Support

- Modern browsers with CSS Grid support
- Intersection Observer API support
- Fallback for browsers without animation support
- Graceful degradation for reduced motion preferences

## Performance Considerations

- Uses Intersection Observer for efficient scroll detection
- Animations triggered only when in viewport
- CSS transforms for GPU-accelerated animations
- Minimal re-renders with proper React hooks usage
- Efficient filtering with useMemo potential

## Integration Example

```tsx
import React from 'react';
import { Projects } from './components/Projects';
import { portfolioData } from './data/portfolioData';

function MainPage() {
  return (
    <main>
      {/* Other sections */}
      <Projects projects={portfolioData.projects} />
      {/* More sections */}
    </main>
  );
}

export default MainPage;
```
