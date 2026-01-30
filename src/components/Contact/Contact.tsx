import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ContactFormData, SocialLink } from '../../types';
import './Contact.css';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export interface ContactProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  socialLinks: SocialLink[];
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC<ContactProps> = ({ onSubmit, socialLinks }) => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange', // Instant feedback
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting');
    try {
      await onSubmit(data);
      setSubmissionStatus('success');
      reset(); // Clear form on success
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmissionStatus('error');
      
      // Reset error message after 5 seconds
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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
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
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
      ref={ref}
    >
      <div className="contact-container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.h2 id="contact-heading" className="contact-title" variants={itemVariants}>
            Get In Touch
          </motion.h2>

          <motion.p className="contact-subtitle" variants={itemVariants}>
            Have a question or want to work together? I'd love to hear from you!
          </motion.p>

          {/* Contact Form */}
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
                placeholder="Your message..."
                rows={5}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
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

          {/* Social Media Links */}
          <motion.div className="contact-social" variants={itemVariants}>
            <h3 id="social-heading" className="social-title">Connect With Me</h3>
            <nav className="social-links" aria-labelledby="social-heading">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Visit my ${link.platform} profile (opens in new tab)`}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="social-icon" aria-hidden="true">
                    <img 
                      src={link.icon} 
                      alt="" 
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    />
                  </span>
                  <span className="social-label">{link.platform}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
