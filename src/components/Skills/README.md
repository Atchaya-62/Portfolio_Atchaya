# Skills Component

The Skills component displays technical skills with dynamic progress bars, category filtering, and interactive tooltips.

## Features

- **Progress Bars**: Visual representation of skill proficiency levels (0-100%)
- **Category Filtering**: Filter skills by category (All, AI/ML, Data, Tools, Languages)
- **Interactive Tooltips**: Hover over skills to see detailed descriptions
- **Scroll Animations**: Skills animate into view when scrolling
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Accessibility**: Full keyboard navigation and ARIA labels

## Usage

```tsx
import Skills from './components/Skills';
import { portfolioData } from './data/portfolioData';

function App() {
  return <Skills skills={portfolioData.skills} />;
}
```

## Props

### SkillsProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| skills | Skill[] | Yes | Array of skill objects to display |

### Skill Interface

```typescript
interface Skill {
  name: string;
  level: number; // 0-100
  category: 'AI/ML' | 'Data' | 'Tools' | 'Languages';
  description: string;
}
```

## Styling

The component uses CSS custom properties for theming:
- `--background`: Section background color
- `--text`: Text color
- `--primary`: Primary accent color
- `--secondary`: Secondary accent color
- `--accent`: Focus indicator color

## Accessibility

- All filter buttons are keyboard accessible
- Skill items can be focused with keyboard
- ARIA labels and roles for screen readers
- Visible focus indicators
- Minimum touch target size of 44x44px on mobile

## Animation

### Scroll-Triggered Animations

The Skills component uses the Intersection Observer API to detect when the section enters the viewport and triggers animations:

**Configuration:**
```typescript
const [ref, inView] = useInView({
  threshold: 0.2,      // Trigger when 20% of section is visible
  triggerOnce: true,   // Animate only once
});
```

**Animation Sequence:**
1. Section enters viewport (20% visible)
2. Title fades in (500ms)
3. Filter buttons fade in (500ms, staggered)
4. Skill items appear (500ms each, 100ms stagger)
5. Progress bars expand from 0 to target level (1000ms, eased)
6. Shimmer effect loops continuously

**Animation Variants:**

- **Container**: Staggered children with 100ms delay
- **Items**: Fade in + slide up (opacity 0→1, y: 20→0)
- **Progress Bars**: Width expansion (0% → skill level %)
- **Tooltips**: Smooth fade-in on hover/focus

### Performance Optimizations

- GPU-accelerated properties (`transform`, `opacity`)
- Intersection Observer for efficient viewport detection
- Animations trigger only once per page load
- Lazy rendering of tooltips

## Requirements Satisfied

- **7.1**: Display skills using dynamic progress bars ✓
- **7.2**: Organize skills into filterable categories ✓
- **7.3**: Display explanation tooltip on hover ✓
- **7.4**: Category filtering with smooth transitions ✓
- **7.5**: Animate skill bars/rings on viewport entry ✓
