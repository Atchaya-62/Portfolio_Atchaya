# Email Setup Guide for Portfolio Website

Your contact form is currently set up but not actually sending emails. Here are your options to make it work:

## Option 1: EmailJS (Recommended - Easiest)
**Free tier**: 200 emails/month
**No backend needed**

### Steps:
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials:
   - Public Key
   - Service ID
   - Template ID

5. Install EmailJS:
```bash
npm install @emailjs/browser
```

6. Update `src/services/formHandler.ts` with the code below

### EmailJS Implementation:
```typescript
import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../types';

// Add these to your .env file (create it if it doesn't exist)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'atchayasaran626@gmail.com', // Your email
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send message');
  }
}
```

---

## Option 2: Formspree (Very Easy)
**Free tier**: 50 submissions/month
**No backend needed**

### Steps:
1. Go to [Formspree.io](https://formspree.io/) and create account
2. Create a new form and get your form endpoint
3. Update the Contact component to use Formspree

### Formspree Implementation:
```typescript
import type { ContactFormData } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send message');
  }
}
```

---

## Option 3: Web3Forms (Simple)
**Free tier**: Unlimited
**No backend needed**

### Steps:
1. Go to [Web3Forms.com](https://web3forms.com/) and get your access key
2. Update the form handler

### Web3Forms Implementation:
```typescript
import type { ContactFormData } from '../types';

const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY';

export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: data.name,
        email: data.email,
        message: data.message,
        to: 'atchayasaran626@gmail.com',
      }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send message');
  }
}
```

---

## Option 4: Mailto Link (Simplest - No Service Needed)
Opens user's email client

### Steps:
Update `src/components/Contact/Contact.tsx` to use mailto link instead of form submission.

This is the simplest but least professional option. The form will open the user's default email client.

---

## Recommended: EmailJS

I recommend **EmailJS** because:
- ✅ Free tier is generous (200 emails/month)
- ✅ Easy to set up
- ✅ No backend required
- ✅ Works with Gmail, Outlook, etc.
- ✅ Professional email templates
- ✅ Email delivery tracking

## Next Steps:

1. Choose one of the options above
2. Follow the setup steps
3. Update `src/services/formHandler.ts` with the implementation
4. Test the form

Let me know which option you'd like to use and I can help you implement it!
