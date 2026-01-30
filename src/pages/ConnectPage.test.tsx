import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ConnectPage from './ConnectPage';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    aside: ({ children, ...props }: any) => <aside {...props}>{children}</aside>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

const renderConnectPage = () => {
  return render(
    <BrowserRouter>
      <ConnectPage />
    </BrowserRouter>
  );
};

describe('ConnectPage', () => {
  describe('Page Structure', () => {
    it('should render the main heading', () => {
      renderConnectPage();
      expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      renderConnectPage();
      expect(
        screen.getByText(/have a question or want to collaborate/i)
      ).toBeInTheDocument();
    });

    it('should render navigation back to home', () => {
      renderConnectPage();
      const backLink = screen.getByRole('link', { name: /return to home page/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('should have skip to main content link', () => {
      renderConnectPage();
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });
  });

  describe('Contact Form', () => {
    it('should render all form fields', () => {
      renderConnectPage();
      
      expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      renderConnectPage();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should show validation error for empty name', async () => {
      const user = userEvent.setup();
      renderConnectPage();

      const nameInput = screen.getByLabelText(/^name/i);
      await user.type(nameInput, 'a'); // Type one character
      await user.clear(nameInput); // Clear it to trigger validation
      await user.tab(); // Move focus away to trigger validation

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email', async () => {
      const user = userEvent.setup();
      renderConnectPage();

      const emailInput = screen.getByLabelText(/^email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for short message', async () => {
      const user = userEvent.setup();
      renderConnectPage();

      const messageInput = screen.getByLabelText(/your message/i);
      await user.type(messageInput, 'Short');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      renderConnectPage();

      // Fill in the form
      await user.type(screen.getByLabelText(/^name/i), 'John Doe');
      await user.type(screen.getByLabelText(/^email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/your message/i),
        'This is a test message with enough characters.'
      );

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check for submitting state
      await waitFor(() => {
        expect(screen.getByText(/sending/i)).toBeInTheDocument();
      });

      // Check for success message
      await waitFor(
        () => {
          expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      renderConnectPage();

      const nameInput = screen.getByLabelText(/^name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/^email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/your message/i) as HTMLTextAreaElement;

      // Fill in the form
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message with enough characters.');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for success and form reset
      await waitFor(
        () => {
          expect(nameInput.value).toBe('');
          expect(emailInput.value).toBe('');
          expect(messageInput.value).toBe('');
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Contact Methods', () => {
    it('should render email contact method', () => {
      renderConnectPage();
      expect(screen.getByText(/other ways to connect/i)).toBeInTheDocument();
      expect(screen.getByText(/alex.johnson@example.com/i)).toBeInTheDocument();
    });

    it('should render email link with correct href', () => {
      renderConnectPage();
      const emailLink = screen.getByRole('link', {
        name: /send email to alex.johnson@example.com/i,
      });
      expect(emailLink).toHaveAttribute('href', 'mailto:alex.johnson@example.com');
    });
  });

  describe('Social Media Links', () => {
    it('should render all social media links', () => {
      renderConnectPage();
      
      expect(screen.getByRole('link', { name: /visit my linkedin profile/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /visit my github profile/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /visit my twitter profile/i })).toBeInTheDocument();
    });

    it('should open social links in new tab', () => {
      renderConnectPage();
      
      const linkedinLink = screen.getByRole('link', { name: /visit my linkedin profile/i });
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Availability Note', () => {
    it('should render availability information', () => {
      renderConnectPage();
      expect(screen.getByText(/response time/i)).toBeInTheDocument();
      expect(screen.getByText(/24-48 hours/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderConnectPage();
      
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
      expect(screen.getByRole('navigation', { name: /breadcrumb navigation/i })).toBeInTheDocument();
      expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
    });

    it('should mark required fields', () => {
      renderConnectPage();
      
      const nameInput = screen.getByLabelText(/^name/i);
      const emailInput = screen.getByLabelText(/^email/i);
      const messageInput = screen.getByLabelText(/your message/i);

      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(messageInput).toHaveAttribute('aria-required', 'true');
    });

    it('should have minimum touch target sizes', () => {
      renderConnectPage();
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      const styles = window.getComputedStyle(submitButton);
      
      // Check that min-height and min-width are set (actual computed values may vary)
      expect(submitButton).toHaveStyle({ minHeight: '44px' });
    });
  });

  describe('Responsive Layout', () => {
    it('should render properly on mobile viewport', () => {
      // Set mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;
      
      renderConnectPage();
      
      // Check that key elements are still rendered
      expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
      expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
    });
  });
});
