import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ThemeSwitcher, NeuralNetworkBackground } from '../components/shared';
import { portfolioData } from '../data/portfolioData';
import type { ContactFormData } from '../types';
import './ConnectPage.css';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

function ConnectPage() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting');
    
    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setSubmissionStatus('success');
      reset();
      
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmissionStatus('error');
      
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Theme Switcher Sidebar */}
      <ThemeSwitcher />

      <main id="main-content" role="main" className="connect-page">
        <div className="connect-container">
          {/* Header Section */}
          <motion.header
            className="connect-header"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.nav
              aria-label="Breadcrumb navigation"
              className="breadcrumb"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="breadcrumb-link"
                aria-label="Return to home page"
              >
                <svg
                  className="breadcrumb-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </motion.nav>

            <motion.h1 className="connect-title" variants={itemVariants}>
              Let's Connect
            </motion.h1>
            <motion.p className="connect-subtitle" variants={itemVariants}>
              Have a question or want to collaborate? I'd love to hear from you!
            </motion.p>
          </motion.header>

          <div className="connect-content">
            {/* Contact Form Section */}
            <motion.section
              className="contact-form-section"
              aria-labelledby="contact-form-heading"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2
                id="contact-form-heading"
                className="section-title"
                variants={itemVariants}
              >
                Send Me a Message
              </motion.h2>

              <motion.form
                className="contact-form"
                onSubmit={handleSubmit(onFormSubmit)}
                variants={itemVariants}
                noValidate
                aria-label="Contact form"
              >
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span aria-label="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Your name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-required="true"
                    {...register('name')}
                  />
                  {errors.name && (
                    <motion.span
                      id="name-error"
                      className="form-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {errors.name.message}
                    </motion.span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span aria-label="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-required="true"
                    {...register('email')}
                  />
                  {errors.email && (
                    <motion.span
                      id="email-error"
                      className="form-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {errors.email.message}
                    </motion.span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message <span aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Tell me about your project or inquiry..."
                    rows={6}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-required="true"
                    {...register('message')}
                  />
                  {errors.message && (
                    <motion.span
                      id="message-error"
                      className="form-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {errors.message.message}
                    </motion.span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="form-submit"
                  disabled={submissionStatus === 'submitting'}
                  aria-label={submissionStatus === 'submitting' ? 'Sending message' : 'Send message'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <svg
                        className="spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="send-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>

                {/* Submission Feedback */}
                {submissionStatus === 'success' && (
                  <motion.div
                    className="form-feedback success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                  >
                    <svg
                      className="feedback-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submissionStatus === 'error' && (
                  <motion.div
                    className="form-feedback error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="assertive"
                  >
                    <svg
                      className="feedback-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <span>Failed to send message. Please try again later.</span>
                  </motion.div>
                )}
              </motion.form>
            </motion.section>

            {/* Contact Methods Section */}
            <motion.aside
              className="contact-methods-section"
              aria-labelledby="contact-methods-heading"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2
                id="contact-methods-heading"
                className="section-title"
                variants={itemVariants}
              >
                Other Ways to Connect
              </motion.h2>

              {/* Email Contact */}
              <motion.div className="contact-method" variants={itemVariants}>
                <div className="method-icon-wrapper">
                  <svg
                    className="method-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="method-content">
                  <h3 className="method-title">Email</h3>
                  <a
                    href={`mailto:${portfolioData.social.email}`}
                    className="method-link"
                    aria-label={`Send email to ${portfolioData.social.email}`}
                  >
                    {portfolioData.social.email}
                  </a>
                  <p className="method-description">
                    Drop me an email for professional inquiries or collaborations.
                  </p>
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div className="social-section" variants={itemVariants}>
                <h3 className="social-title">Connect on Social Media</h3>
                <nav className="social-links" aria-label="Social media links">
                  {portfolioData.socialLinks.map((link) => (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target={link.platform !== 'Email' ? '_blank' : undefined}
                      rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="social-link"
                      aria-label={`Visit my ${link.platform} profile${
                        link.platform !== 'Email' ? ' (opens in new tab)' : ''
                      }`}
                      variants={socialIconVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span className="social-icon" aria-hidden="true">
                        {link.icon}
                      </span>
                      <span className="social-label">{link.platform}</span>
                    </motion.a>
                  ))}
                </nav>
              </motion.div>

              {/* Availability Note */}
              <motion.div className="availability-note" variants={itemVariants}>
                <svg
                  className="availability-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="availability-title">Response Time</h3>
                  <p className="availability-text">
                    I typically respond within 24-48 hours. Looking forward to connecting with you!
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default ConnectPage;
