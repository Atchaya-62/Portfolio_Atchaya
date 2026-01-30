import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import type { SocialLink } from '../../types';

describe('Contact Component', () => {
  const mockOnSubmit = vi.fn();
  const mockSocialLinks: SocialLink[] = [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/test', icon: '💼' },
    { platform: 'GitHub', url: 'https://github.com/test', icon: '🐙' },
    { platform: 'Twitter', url: 'https://twitter.com/test', icon: '🐦' },
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Rendering', () => {
    it('should render the contact form with all fields', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should render section title and subtitle', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
      expect(screen.getByText(/have a question or want to work together/i)).toBeInTheDocument();
    });

    it('should render social media links', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByLabelText(/visit my linkedin profile/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/visit my github profile/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/visit my twitter profile/i)).toBeInTheDocument();
    });

    it('should render social links with correct attributes', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const linkedinLink = screen.getByLabelText(/visit my linkedin profile/i);
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Form Validation', () => {
    it('should show error when name is too short', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab(); // Trigger blur

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should show error for invalid email', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should show error when message is too short', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Short');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('should not show errors for valid inputs', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a valid message');

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when valid', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);

      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test message',
        });
      });
    });

    it('should not submit form with invalid data', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'A');
      await user.type(screen.getByLabelText(/email/i), 'invalid');
      await user.type(screen.getByLabelText(/message/i), 'Short');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show success message on successful submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);

      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      });
    });

    it('should show error message on failed submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockRejectedValue(new Error('Network error'));

      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
      });
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue(undefined);

      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('should disable submit button while submitting', async () => {
      const user = userEvent.setup();
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sending/i)).toBeInTheDocument();

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByRole('region', { name: /contact section/i })).toBeInTheDocument();
    });

    it('should associate error messages with inputs', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
      });
    });

    it('should have proper form labels', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(messageInput).toHaveAttribute('id', 'message');
    });

    it('should have keyboard accessible social links', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Social Media Icons', () => {
    it('should render all provided social links', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
    });

    it('should render social icons', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      expect(screen.getByText('💼')).toBeInTheDocument();
      expect(screen.getByText('🐙')).toBeInTheDocument();
      expect(screen.getByText('🐦')).toBeInTheDocument();
    });

    it('should handle empty social links array', () => {
      render(<Contact onSubmit={mockOnSubmit} socialLinks={[]} />);

      expect(screen.getByText(/connect with me/i)).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('Instant Feedback', () => {
    it('should show validation errors immediately on change', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid');

      // Error should appear without needing to blur
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should clear validation errors when input becomes valid', async () => {
      const user = userEvent.setup();
      render(<Contact onSubmit={mockOnSubmit} socialLinks={mockSocialLinks} />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });

      await user.type(nameInput, 'lex');

      await waitFor(() => {
        expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
      });
    });
  });
});
