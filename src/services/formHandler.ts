import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../types';

// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_PUBLIC_KEY = 'UuP4ghTl8_U6XW5oa';
const EMAILJS_SERVICE_ID = 'service_3g29m3u';
const EMAILJS_TEMPLATE_ID = 'template_dzrrdea';

// Initialize EmailJS with public key
emailjs.init(EMAILJS_PUBLIC_KEY);

export async function submitContactForm(data: ContactFormData): Promise<void> {
  console.log('🚀 Starting email submission...');
  console.log('📧 Form data:', data);
  console.log('🔑 Using Service ID:', EMAILJS_SERVICE_ID);
  console.log('📝 Using Template ID:', EMAILJS_TEMPLATE_ID);

  try {
    const templateParams = {
      user_name: data.name,
      user_email: data.email,
      message: data.message,
    };

    console.log('📤 Sending email with params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('✅ Email sent successfully!');
    console.log('📬 Response:', response);
    console.log('📊 Status:', response.status);
    console.log('� Text:', response.text);
  } catch (error: any) {
    console.error('❌ Failed to send email');
    console.error('Error details:', error);
    console.error('Error message:', error?.message);
    console.error('Error text:', error?.text);
    console.error('Error status:', error?.status);
    
    // Provide more specific error message
    if (error?.status === 400) {
      throw new Error('Invalid email configuration. Please check your EmailJS settings.');
    } else if (error?.status === 401) {
      throw new Error('EmailJS authentication failed. Please check your Public Key.');
    } else if (error?.status === 404) {
      throw new Error('EmailJS service or template not found. Please check your IDs.');
    } else {
      throw new Error(`Failed to send message: ${error?.text || error?.message || 'Unknown error'}`);
    }
  }
}
