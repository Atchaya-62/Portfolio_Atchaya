# EmailJS Troubleshooting Guide

## Current Configuration
- **Public Key**: `CFHewXKD6JdM2tprR`
- **Service ID**: `service_3g29m3u`
- **Template ID**: `template_dzrrdea`

## Steps to Fix Email Issues

### 1. Verify EmailJS Dashboard Settings

Go to https://dashboard.emailjs.com/ and check:

#### A. Email Service
1. Click on "Email Services" in the left menu
2. Find your service `service_3g29m3u`
3. Make sure it's **connected** and **active**
4. Verify your email provider credentials are correct

#### B. Email Template
1. Click on "Email Templates" in the left menu
2. Find your template `template_dzrrdea`
3. Edit the template and use these variables:
   ```
   Subject: New Contact Form Message from {{user_name}}
   
   Body:
   You have received a new message from your portfolio website.
   
   Name: {{user_name}}
   Email: {{user_email}}
   
   Message:
   {{message}}
   ```
4. Click "Save"

#### C. Account Settings
1. Click on "Account" in the left menu
2. Find your Public Key: `CFHewXKD6JdM2tprR`
3. Verify it matches the one in the code

### 2. Check Browser Console

Open browser console (F12) and look for these logs when submitting the form:
- 🚀 Starting email submission...
- 📧 Form data: {...}
- 📤 Sending email with params: {...}
- ❌ Failed to send email (if error occurs)

**Common Error Messages:**
- **Status 400**: Template variables don't match
- **Status 401**: Wrong Public Key
- **Status 404**: Service or Template ID not found
- **Status 412**: Email service not connected

### 3. Test EmailJS Directly

Try sending a test email from the EmailJS dashboard:
1. Go to your template `template_dzrrdea`
2. Click "Test It" button
3. Fill in the test values
4. Check if email arrives

### 4. Verify Email Service Connection

Make sure your email service (Gmail, Outlook, etc.) is properly connected:
1. Go to "Email Services"
2. Click on your service
3. Click "Connect Account" if needed
4. Follow the authentication steps

### 5. Check Email Limits

Free EmailJS accounts have limits:
- 200 emails per month
- Check if you've exceeded the limit in your dashboard

## If Still Not Working

Please check the browser console and share:
1. The exact error message
2. The error status code
3. Any additional error details

This will help identify the specific issue.
