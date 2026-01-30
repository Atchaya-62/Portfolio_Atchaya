# EmailJS Setup Instructions

EmailJS has been installed! Follow these steps to configure email sending:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Follow the connection steps to link your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up your template with these variables:

**Template Example:**
```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to **Account** > **General** (or API Keys)
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)
3. Copy it

## Step 5: Update Your Code
Open `src/services/formHandler.ts` and replace these three values:

```typescript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';  // Replace with your Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';  // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'; // Replace with your Template ID
```

## Step 6: Test It!
1. Run your development server: `npm run dev`
2. Go to the Contact section
3. Fill out the form and submit
4. Check your email inbox (atchayasaran626@gmail.com)

## Example Configuration
```typescript
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop';
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
```

## Troubleshooting

### Emails not sending?
- Check browser console for errors
- Verify all three credentials are correct
- Make sure your Gmail account is connected in EmailJS
- Check EmailJS dashboard for delivery status

### Getting "Email service not configured" error?
- You haven't replaced the placeholder values yet
- Update the three constants in `src/services/formHandler.ts`

### Emails going to spam?
- Add your domain to EmailJS allowed domains
- Use a professional email template
- Consider using a custom domain email

## Free Tier Limits
- 200 emails per month
- Perfect for a portfolio website!

## Need Help?
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

---

Once configured, your contact form will send emails directly to **atchayasaran626@gmail.com**!
