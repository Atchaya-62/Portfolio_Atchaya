# Design Document: Interactive Portfolio Website

## Overview

This design document outlines the technical architecture and implementation approach for an interactive portfolio website for a 3rd-year AI & Data Science student. The system will be built as a modern single-page application (SPA) with additional dedicated pages for Blog and Connect sections.

The portfolio will feature:
- Three distinct visual themes with smooth transitions
- Rich animations and micro-interactions throughout
- Responsive design for mobile, tablet, and desktop
- Performance-optimized asset loading and rendering
- Full accessibility compliance
- SEO optimization for discoverability

The architecture follows a component-based approach with clear separation of concerns between presentation, animation logic, theme management, and data handling.

## Architecture

### Technology Stack

**Frontend Framework:** React 18+ with TypeScript
- Component-based architecture for modularity
- TypeScript for type safety and better developer experience
- React hooks for state management and side effects

**Styling:** CSS Modules + Tailwind CSS
- CSS Modules for component-scoped styles
- Tailwind for utility-first responsive design
- CSS custom properties for theme variables

**Animation Libraries:**
- Framer Motion for declarative animations and transitions
- React Intersection Observer for scroll-triggered animations
- Particles.js or tsParticles for hero background effects

**Build Tool:** Vite
- Fast development server with HMR
- Optimized production builds
- Built-in code splitting

**Additional Libraries:**
- React Router for navigation between pages
- React Hook Form for contact form management
- Zod for form validation


### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Application Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Main Page   │  │  Blog Page   │  │ Connect Page │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                     Component Layer                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Navigation│ │   Hero   │ │ Projects │ │  Skills  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  About   │ │Experience│ │Achievements│ │ Contact │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└────────────────��────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Theme Manager │  │Animation Ctrl│  │ Form Handler │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                       Storage Layer                          │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ LocalStorage │  │Session Storage│                        │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
portfolio-website/
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Projects/
│   │   ├── Experience/
│   │   ├── Achievements/
│   │   ├── Contact/
│   │   └── shared/
│   ├── pages/
│   │   ├── MainPage.tsx
│   │   ├── BlogPage.tsx
│   │   └── ConnectPage.tsx
│   ├── services/
│   │   ├── themeManager.ts
│   │   ├── animationController.ts
│   │   └── formHandler.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useIntersectionObserver.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── themes.css
│   │   └── globals.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```


## Components and Interfaces

### Theme Manager

The Theme Manager handles theme switching and persistence.

```typescript
// Theme types
type ThemeMode = 'light' | 'dark' | 'futuristic';

interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  animations: {
    transitionDuration: number;
  };
}

// Theme Manager Service
class ThemeManager {
  private currentTheme: ThemeMode;
  
  constructor() {
    this.currentTheme = this.loadThemeFromStorage() || 'light';
  }
  
  setTheme(theme: ThemeMode): void;
  getTheme(): ThemeMode;
  private loadThemeFromStorage(): ThemeMode | null;
  private saveThemeToStorage(theme: ThemeMode): void;
  private applyThemeToDOM(theme: ThemeMode): void;
}
```

### Animation Controller

Manages animation states and coordinates complex animations.

```typescript
interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

interface ScrollAnimationConfig extends AnimationConfig {
  threshold: number;
  triggerOnce: boolean;
}

class AnimationController {
  registerScrollAnimation(
    element: HTMLElement,
    config: ScrollAnimationConfig
  ): void;
  
  triggerMicroAnimation(
    element: HTMLElement,
    type: 'hover' | 'focus' | 'click'
  ): void;
  
  playIntroAnimation(): Promise<void>;
  
  private setupIntersectionObserver(): IntersectionObserver;
}
```


### Navigation Component

```typescript
interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  type: 'scroll' | 'route';
  target: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  // Renders navigation bar with menu items
  // Handles mobile hamburger menu
  // Applies active state animations
  // Manages keyboard navigation
};
```

### Hero Component

```typescript
interface HeroProps {
  name: string;
  headline: string;
  subtitle: string;
  aboutSummary: string;
  photoUrl: string;
  socialLinks: {
    linkedin: string;
    github: string;
  };
}

const Hero: React.FC<HeroProps> = (props) => {
  // Renders hero section with animated background
  // Displays owner photo with hover animation
  // Shows headline, subtitle, and about summary
  // Renders CTA buttons and social icons
  // Manages particle animation
};
```

### Skills Component

```typescript
interface Skill {
  name: string;
  level: number; // 0-100
  category: 'AI/ML' | 'Data' | 'Tools' | 'Languages';
  description: string;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Renders skill visualizations (bars or rings)
  // Implements category filtering
  // Shows tooltips on hover
  // Animates skill bars on scroll into view
};
```

### Projects Component

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

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // Renders project card with flip animation
  // Applies parallax tilt on hover
  // Shows tech stack and links
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // Renders grid of project cards
  // Implements category filtering
  // Manages card animations
};
```


### Contact Component

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

const Contact: React.FC<ContactProps> = ({ onSubmit, socialLinks }) => {
  // Renders contact form with validation
  // Displays instant feedback on submission
  // Shows social media icons with animations
  // Handles form state and errors
};
```

### Intro Animation Component

```typescript
interface IntroAnimationProps {
  name: string;
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ name, onComplete }) => {
  // Renders full-screen intro animation
  // Animates name with letter reveal effect
  // Checks session storage to play once
  // Respects prefers-reduced-motion
  // Calls onComplete when animation finishes
};
```

## Data Models

### Portfolio Data Structure

```typescript
interface PortfolioData {
  owner: {
    name: string;
    headline: string;
    subtitle: string;
    aboutSummary: string;
    photoUrl: string;
    fullBio: string;
  };
  
  social: {
    linkedin: string;
    github: string;
    twitter?: string;
    email: string;
  };
  
  skills: Skill[];
  
  projects: Project[];
  
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
    icon: string;
  }>;
  
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    icon: string;
  }>;
  
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
  }>;
}
```

### Theme Configuration

```typescript
const themeConfigs: Record<ThemeMode, ThemeConfig> = {
  light: {
    mode: 'light',
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#F59E0B',
    },
    animations: {
      transitionDuration: 500,
    },
  },
  dark: {
    mode: 'dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      background: '#111827',
      text: '#F9FAFB',
      accent: '#FBBF24',
    },
    animations: {
      transitionDuration: 500,
    },
  },
  futuristic: {
    mode: 'futuristic',
    colors: {
      primary: '#06B6D4',
      secondary: '#EC4899',
      background: '#0F172A',
      text: '#E0F2FE',
      accent: '#22D3EE',
    },
    animations: {
      transitionDuration: 500,
    },
  },
};
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Theme Persistence Round-Trip
*For any* theme selection (light, dark, or futuristic), when a visitor selects the theme, it should be persisted to browser storage, and when the application loads, the stored theme should be applied automatically.

**Validates: Requirements 1.4, 1.5**

### Property 2: Scroll Animation Triggers
*For any* element with scroll-triggered animation, when that element enters the viewport, the animation should be applied to the element.

**Validates: Requirements 2.3**

### Property 3: Hover Tilt Effect Application
*For any* project card, when a visitor hovers over it, a 3D tilt transform should be applied to the card element.

**Validates: Requirements 2.4**

### Property 4: Scroll Navigation Behavior
*For any* navigation menu item with scroll-type behavior (Home, Projects), clicking the item should result in smooth scrolling to the corresponding section on the page.

**Validates: Requirements 3.2, 5.5**

### Property 5: Active Menu State Indication
*For any* navigation menu item, when the viewport is displaying the section corresponding to that menu item, the menu item should display an active state indicator.

**Validates: Requirements 3.6**

### Property 6: Keyboard Navigation Accessibility
*For any* interactive element (menu items, buttons, form fields, links), it should be keyboard focusable and display a visible focus indicator when focused via keyboard navigation.

**Validates: Requirements 3.7, 14.1, 14.4**

### Property 7: Mobile Menu Toggle
*For any* state of the mobile hamburger menu (open or closed), clicking the hamburger icon should toggle the menu to the opposite state.

**Validates: Requirements 3.9**

### Property 8: Mobile Menu Auto-Close
*For any* menu item selection when the mobile menu is open, selecting the item should close the mobile menu and navigate to the destination.

**Validates: Requirements 3.10**

### Property 9: Intro Animation Session Persistence
*For any* browser session, after the intro animation plays once, it should not play again within the same session (verified via session storage).

**Validates: Requirements 4.3**

### Property 10: Reduced Motion Preference Respect
*For any* visitor with prefers-reduced-motion setting enabled, animations (including intro animation) should be skipped or significantly simplified.

**Validates: Requirements 4.5, 14.6**

### Property 11: Social Links Open in New Tab
*For any* social media icon or link (LinkedIn, GitHub, etc.), clicking the link should open the corresponding profile in a new browser tab (target="_blank").

**Validates: Requirements 5.11, 11.6**

### Property 12: Skill Tooltip Display
*For any* skill element, when a visitor hovers over it, a tooltip containing the skill description should be displayed.

**Validates: Requirements 7.3**

### Property 13: Skills Category Filtering
*For any* category filter selection (AI/ML, Data, Tools, Languages), only skills belonging to that category should be displayed in the skills section.

**Validates: Requirements 7.4**

### Property 14: Project Card Required Content
*For any* project in the portfolio, its project card should display the title, tech stack, brief description, and include clickable buttons for GitHub and demo links (when available).

**Validates: Requirements 8.1, 8.4**

### Property 15: Projects Category Filtering
*For any* project category filter selection, only projects matching that category should be displayed in the projects section.

**Validates: Requirements 8.6**

### Property 16: Experience and Certification Icons
*For any* experience or certification entry, it should be displayed with an associated icon.

**Validates: Requirements 9.3**

### Property 17: Achievement Tooltip Display
*For any* achievement badge, when a visitor hovers over it, a tooltip containing the achievement description should be displayed.

**Validates: Requirements 10.3**

### Property 18: Contact Form Validation
*For any* form submission attempt with invalid or missing required fields (name, email, message), the form should prevent submission and display specific error messages for each invalid field.

**Validates: Requirements 11.2, 11.3**

### Property 19: Form Submission Feedback
*For any* form submission (success or failure), the contact form should provide instant visual feedback to the visitor indicating the submission status.

**Validates: Requirements 11.4**

### Property 20: Mobile Touch Target Sizing
*For any* interactive element when viewed on mobile devices, the element should have a minimum touch target size of 44x44 pixels.

**Validates: Requirements 12.5**

### Property 21: ARIA Attributes Presence
*For any* semantic section or interactive component, it should include appropriate ARIA labels and roles for accessibility.

**Validates: Requirements 14.2**

### Property 22: Color Contrast Compliance
*For any* theme mode (light, dark, futuristic), normal text should maintain a minimum color contrast ratio of 4.5:1 against its background.

**Validates: Requirements 14.3**

### Property 23: Image Alternative Text
*For any* image or icon element, it should include alternative text (alt attribute or aria-label) for screen readers.

**Validates: Requirements 14.5**


## Error Handling

### Form Validation Errors

The contact form will implement comprehensive validation:

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

Error states will be displayed inline with clear, actionable messages. The form will prevent submission until all validation passes.

### Theme Loading Errors

If theme data cannot be loaded from storage:
- Fall back to light theme as default
- Log error to console for debugging
- Continue application execution without blocking

### Animation Errors

If animation libraries fail to load:
- Gracefully degrade to static presentation
- Ensure all content remains accessible
- Log error for monitoring

### Image Loading Errors

For images that fail to load:
- Display placeholder with appropriate alt text
- Provide fallback background color
- Maintain layout integrity

### Navigation Errors

If scroll targets don't exist:
- Log warning to console
- Prevent scroll action
- Maintain current viewport position

### Browser Storage Errors

If localStorage or sessionStorage is unavailable:
- Continue with in-memory state only
- Log warning about persistence limitations
- Ensure core functionality remains operational

## Testing Strategy

### Dual Testing Approach

The portfolio will use both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** will verify:
- Specific examples and edge cases
- Component rendering with specific props
- Error conditions and boundary cases
- Integration between components

**Property-Based Tests** will verify:
- Universal properties across all inputs
- Correctness properties from the design document
- Behavior consistency across random inputs

### Testing Tools

**Unit Testing:**
- Vitest as the test runner
- React Testing Library for component testing
- jsdom for DOM simulation

**Property-Based Testing:**
- fast-check library for property-based testing
- Minimum 100 iterations per property test
- Each property test tagged with design property reference

**Accessibility Testing:**
- axe-core for automated accessibility checks
- Manual keyboard navigation testing
- Screen reader compatibility testing

**Visual Regression Testing:**
- Playwright for end-to-end testing
- Screenshot comparison for visual consistency

### Property Test Configuration

Each property-based test will:
- Run minimum 100 iterations with randomized inputs
- Reference its corresponding design property
- Use tag format: **Feature: portfolio-website, Property {number}: {property_text}**

Example property test structure:

```typescript
import fc from 'fast-check';

// Feature: portfolio-website, Property 1: Theme Persistence Round-Trip
describe('Theme Persistence', () => {
  it('should persist and restore any selected theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark', 'futuristic'),
        (theme) => {
          // Set theme
          themeManager.setTheme(theme);
          
          // Verify persistence
          const stored = localStorage.getItem('theme');
          expect(stored).toBe(theme);
          
          // Simulate reload
          const newManager = new ThemeManager();
          expect(newManager.getTheme()).toBe(theme);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Coverage Goals

- Minimum 80% code coverage for core functionality
- 100% coverage of correctness properties
- All accessibility requirements validated
- All user interactions tested
- Responsive behavior verified at key breakpoints

### Testing Phases

1. **Component Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions and data flow
3. **Property-Based Tests**: Verify universal correctness properties
4. **Accessibility Tests**: Validate WCAG compliance
5. **Visual Regression Tests**: Ensure UI consistency
6. **Performance Tests**: Validate load times and animation performance
