import React from 'react';
import Contact from './Contact';
import type { ContactFormData, SocialLink } from '../../types';

/**
 * Example usage of the Contact component
 */

// Example social links
const exampleSocialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/alexjohnson',
    icon: '💼',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/alexjohnson',
    icon: '🐙',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/alexjohnson',
    icon: '🐦',
  },
  {
    platform: 'Email',
    url: 'mailto:alex.johnson@example.com',
    icon: '📧',
  },
];

// Example submit handler
const handleSubmit = async (data: ContactFormData): Promise<void> => {
  // Simulate API call
  console.log('Submitting form data:', data);
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simulate random success/failure for demo
  if (Math.random() > 0.2) {
    console.log('Form submitted successfully!');
    // In a real app, you would send data to your backend:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  } else {
    throw new Error('Simulated submission error');
  }
};

// Basic example
export const BasicContactExample: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={handleSubmit} socialLinks={exampleSocialLinks} />
    </div>
  );
};

// Example with custom submit handler
export const CustomSubmitExample: React.FC = () => {
  const customSubmit = async (data: ContactFormData) => {
    console.log('Custom submit handler:', data);
    
    // Example: Send to email service
    const response = await fetch('https://api.emailservice.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify({
        to: 'your-email@example.com',
        subject: `Contact form submission from ${data.name}`,
        text: data.message,
        replyTo: data.email,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={customSubmit} socialLinks={exampleSocialLinks} />
    </div>
  );
};

// Example with minimal social links
export const MinimalSocialExample: React.FC = () => {
  const minimalLinks: SocialLink[] = [
    {
      platform: 'Email',
      url: 'mailto:contact@example.com',
      icon: '📧',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={handleSubmit} socialLinks={minimalLinks} />
    </div>
  );
};

// Example with many social links
export const ExtendedSocialExample: React.FC = () => {
  const extendedLinks: SocialLink[] = [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/user', icon: '💼' },
    { platform: 'GitHub', url: 'https://github.com/user', icon: '🐙' },
    { platform: 'Twitter', url: 'https://twitter.com/user', icon: '🐦' },
    { platform: 'Instagram', url: 'https://instagram.com/user', icon: '📷' },
    { platform: 'YouTube', url: 'https://youtube.com/@user', icon: '🎥' },
    { platform: 'Medium', url: 'https://medium.com/@user', icon: '📝' },
    { platform: 'Email', url: 'mailto:user@example.com', icon: '📧' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={handleSubmit} socialLinks={extendedLinks} />
    </div>
  );
};

// Example with error handling
export const ErrorHandlingExample: React.FC = () => {
  const errorProneSubmit = async (data: ContactFormData) => {
    console.log('Attempting to submit:', data);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Always throw error for demonstration
    throw new Error('Network error: Unable to reach server');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={errorProneSubmit} socialLinks={exampleSocialLinks} />
    </div>
  );
};

// Example with successful submission
export const SuccessExample: React.FC = () => {
  const successfulSubmit = async (data: ContactFormData) => {
    console.log('Submitting:', data);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Always succeed
    console.log('Success!');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <Contact onSubmit={successfulSubmit} socialLinks={exampleSocialLinks} />
    </div>
  );
};

export default BasicContactExample;
