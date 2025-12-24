# FormSpree Contact Form Setup Guide

## Overview
Your portfolio contact form is now integrated with **FormSpree** - a production-ready email service that requires no backend code.

## Setup Instructions (5 minutes)

### Step 1: Create FormSpree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Click **"Sign Up"** (it's FREE - 500 submissions/month)
3. Sign up with your email or GitHub account

### Step 2: Create a New Form
1. After logging in, click **"+ New Form"**
2. **Form Name**: "Portfolio Contact Form"
3. **Email**: Enter the email where you want to receive messages (e.g., `sdusane1@asu.edu`)
4. Click **"Create Form"**

### Step 3: Get Your Form ID
1. After creating the form, you'll see your **Form Endpoint**
2. It looks like: `https://formspree.io/f/YOUR_FORM_ID`
3. Copy the **`YOUR_FORM_ID`** part (e.g., `mwpebraz`, `xyzabc123`)

### Step 4: Update Your Portfolio Code
1. Open `pages/3_Contact.py`
2. Find line 264: `FORMSPREE_FORM_ID = "YOUR_FORMSPREE_ID"`
3. Replace `"YOUR_FORMSPREE_ID"` with your actual Form ID:
   ```python
   FORMSPREE_FORM_ID = "mwpebraz"  # Replace with your actual ID
   ```
4. Save the file

### Step 5: Test Your Contact Form
1. Restart your Streamlit app: `streamlit run Home.py`
2. Go to the Contact page
3. Fill out the form with test data
4. Click **"Send Message"**
5. Check your email - you should receive the test message!

## Features Included

✅ **Email Validation** - Ensures valid email format  
✅ **Required Fields** - All fields marked with * are required  
✅ **Spam Protection** - FormSpree includes built-in spam filtering  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Shows "Sending..." while processing  
✅ **Success/Failure Feedback** - Clear confirmation messages  
✅ **Fallback Contact** - Shows your email if form fails

## FormSpree Dashboard Features

After setup, you can:
- **View all submissions** in your FormSpree dashboard
- **Export submissions** to CSV
- **Set up email notifications**
- **Add custom confirmation messages**
- **Configure spam protection**
- **Add webhooks** for advanced integrations

## Troubleshooting

### Form says "not configured yet"
- Make sure you replaced `"YOUR_FORMSPREE_ID"` with your actual Form ID
- Restart the Streamlit app after making changes

### "Failed to send message" error
- Check your internet connection
- Verify the Form ID is correct
- Check FormSpree dashboard for submission limits (500/month on free tier)

### Not receiving emails
- Check spam/junk folder
- Verify the email address in FormSpree dashboard settings
- Test with a different email address

## Upgrading to FormSpree Pro (Optional)

If you need more submissions or features:
- **Free**: 500 submissions/month
- **Gold ($10/month)**: Unlimited submissions, custom confirmation pages, integrations
- **Platinum ($40/month)**: White-label, priority support, advanced features

## Alternative Services (If Needed)

If you prefer other services:
1. **EmailJS** - Similar to FormSpree, free tier available
2. **Netlify Forms** - If hosting on Netlify (100 submissions/month free)
3. **AWS SES + Lambda** - For custom backend (requires AWS account)

## Security & Privacy

✅ FormSpree is SOC 2 Type II certified  
✅ GDPR compliant  
✅ No data stored permanently (only in transit)  
✅ Encrypted connections (HTTPS)  

## Support

- **FormSpree Docs**: https://help.formspree.io/
- **FormSpree Support**: support@formspree.io
- **Portfolio Issues**: Check your code in `pages/3_Contact.py`

---

**That's it!** Your contact form is now production-ready and will send emails directly to your inbox. 🎉
