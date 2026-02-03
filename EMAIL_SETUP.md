# Email Setup Guide

Your Valentine project is now set up to send Sparshi's selections to your email: **adityagururanii@gmail.com**

## What's Been Done

1. Created a Supabase Edge Function called `send-selections` that sends an email with all selections
2. Updated all pages to collect and store selections using localStorage
3. When Sparshi clicks "See the Final Message" on the activities page, an email is automatically sent
4. Updated the final page with your romantic quote: "With you, cutu, love feels effortless, smiles come naturally, and even the simplest moments become special."

## Important: Email Configuration Required

To enable email sending, you need to set up a **Resend API Key**:

### Step 1: Get Your Resend API Key
1. Go to [Resend.com](https://resend.com) and create a free account
2. Once logged in, navigate to API Keys
3. Create a new API key
4. Copy the API key

### Step 2: Add the API Key to Supabase
1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **Edge Functions** > **Secrets**
3. Add a new secret with:
   - Name: `RESEND_API_KEY`
   - Value: (paste your Resend API key)

### How It Works

When Sparshi completes the flow:
1. Date selection is stored when she picks a date
2. Food selections are stored when she picks food options
3. Dessert selections are stored when she picks desserts
4. Activity selections are stored when she picks activities
5. On clicking "See the Final Message", all selections are sent to your email
6. She is then redirected to the final romantic page with flowers

The email you receive will be beautifully formatted with all of her selections organized by category.

## Testing

To test the email functionality:
1. Make sure you've added the RESEND_API_KEY to Supabase
2. Go through the entire flow and make selections
3. Check your email at adityagururanii@gmail.com

Enjoy your romantic Valentine experience with Sparshi!
