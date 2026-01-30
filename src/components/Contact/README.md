# Contact Component

The Contact component provides a fully-featured contact form with validation, instant feedback, and social media links.

## Features

- **Form Validation**: Uses React Hook Form with Zod schema validation
- **Instant Feedback**: Real-time validation errors as users type
- **Submission Feedback**: Success/error messages after form submission
- **Social Media Links**: Animated social media icons with micro-interactions
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Animations**: Smooth entrance animations and micro-interactions

## Usage

```tsx
import Contact from './components/Contact';
import type { SocialLink } from './types';

const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: '💼' },
  { platform: 'GitHub', url: 'https://github.com/username', icon: '🐙' },
  { platform: 'Twitter', url: 'https://twitter.com/username', icon: '🐦' },
];

const handleSubmit = async (data: ContactFormData) => {
  // Handle form submission (e.g., send to API)
  console.log('Form data:', data);
};

<Contact onSubmit={handleSubmit} socialLinks={socialLinks} />
```

## Props

### `ContactProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(data: ContactFormData) => Promise<void>` | Yes | Async function to handle form submission |
| `socialLinks` | `SocialLink[]` | Yes | Array of social media links to display |

### `ContactFormData`

```typescript
interface ContactFormData {
  name: string;      // Minimum 2 characters
  email: string;     // Valid email format
  message: string;   // Minimum 10 characters
}
```

### `SocialLink`

```typescript
interface SocialLink {
  platform: string;  // Platform name (e.g., 'LinkedIn')
  url: string;       // Full URL to profile
  icon: string;      // Emoji or icon character
}
```

## Validation Rules

The form uses Zod schema validation with the following rules:

- **Name**: Minimum 2 characters
- **Email**: Must be a valid email address format
- **Message**: Minimum 10 characters

Validation errors are displayed instantly as users type, providing immediate feedback.

## Form Submission Flow

1. User fills out the form
2. Validation runs on each field change (instant feedback)
3. User clicks "Send Message"
4. Submit button is disabled and shows "Sending..."
5. `onSubmit` function is called with form data
6. On success:
   - Success message is displayed
   - Form is cleared
   - Success message auto-hides after 5 seconds
7. On error:
   - Error message is displayed
   - Form data is preserved
   - Error message auto-hides after 5 seconds

## Accessibility Features

- **Keyboard Navigation**: All form fields and social links are keyboard accessible
- **ARIA Labels**: Proper labels and descriptions for screen readers
- **Error Association**: Error messages are associated with their inputs via `aria-describedby`
- **Focus Indicators**: Visible focus states for all interactive elements
- **Status Messages**: Success/error messages use `role="status"` and `role="alert"`
- **Semantic HTML**: Uses proper form elements and labels

## Animations

### Entrance Animations
- Section content fades in and slides up when scrolling into view
- Staggered animation for title, subtitle, form, and social links

### Micro-Interactions
- Social media icons scale and rotate on hover
- Submit button scales on hover and tap
- Error messages fade in smoothly
- Success/error feedback slides in from top

### Reduced Motion
The component respects the `prefers-reduced-motion` media query and disables animations for users who prefer reduced motion.

## Styling

The component uses CSS custom properties for theming:

- `--background`: Section background color
- `--text`: Text color
- `--primary`: Primary accent color
- `--secondary`: Secondary accent color
- `--card-background`: Form background color

Theme-specific styles are applied via `[data-theme]` attributes.

## Testing

The component includes comprehensive unit tests covering:

- Form rendering
- Validation logic
- Form submission (success and error cases)
- Accessibility features
- Social media links
- Instant feedback behavior

Run tests with:
```bash
npm test Contact.test.tsx
```

## Requirements Validation

This component validates the following requirements:

- **11.1**: Provides input fields for name, email, and message
- **11.2**: Validates all required fields before submission
- **11.3**: Displays specific error messages for each invalid field
- **11.4**: Provides instant visual feedback on submission success/failure
- **11.5**: Displays social media icons with micro-animations on hover

## Browser Support

- Modern browsers with ES6+ support
- React 18+
- Requires Framer Motion for animations
- Requires React Hook Form and Zod for validation

## Dependencies

- `react`: ^18.2.0
- `framer-motion`: ^10.16.0
- `react-hook-form`: ^7.48.0
- `@hookform/resolvers`: ^3.3.0
- `zod`: ^3.22.0
- `react-intersection-observer`: ^10.0.2
