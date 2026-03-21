# Firebase Setup Guide — Sabari Auto Workshop

## Error: "Missing or insufficient permissions"

Your Firebase project is connected but Firestore rules are blocking writes.
Fix it in 2 minutes:

---

## Step 1 — Fix Firestore Rules (REQUIRED)

1. Go to: https://console.firebase.google.com/project/sabari-f8bcc/firestore/rules
2. Replace ALL existing rules with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**
4. Wait 30 seconds, then try booking again ✅

> ⚠️ The above rule allows all reads/writes (good for testing).
> Use the `firestore.rules` file in this project for production security.

---

## Step 2 — Enable Firestore Database (if not done)

1. Go to: https://console.firebase.google.com/project/sabari-f8bcc/firestore
2. Click **Create database**
3. Choose **Start in test mode**
4. Select region: **asia-south1 (Mumbai)**
5. Click **Enable**

---

## Step 3 — Enable Authentication (for login/signup)

1. Go to: https://console.firebase.google.com/project/sabari-f8bcc/authentication
2. Click **Get started**
3. Under **Sign-in method**, enable:
   - ✅ **Email/Password**
4. Click **Save**

---

## Step 4 — Fix EmailJS 400 Error (optional)

The EmailJS error happens because `.env` has placeholder values.
Either:

**Option A — Skip email (WhatsApp still works):**
Leave `.env` as-is. Bookings save to Firebase. Owner gets WhatsApp alert.

**Option B — Set up EmailJS:**
1. Go to https://www.emailjs.com and create a free account
2. Add Gmail service → copy **Service ID**
3. Create email template → copy **Template ID**
4. Go to Account → copy **Public Key**
5. Paste all 4 values into `.env`:

```
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

6. Restart dev server: `npm start`

---

## Firestore Collections Created Automatically

| Collection    | Created when...              |
|---------------|------------------------------|
| `bookings`    | Customer submits booking form |
| `users`       | Customer signs up            |
| `reviews`     | Customer submits a review    |
| `coupons`     | Admin adds a coupon          |
| `chatHistory` | Customer uses AI chatbot     |

---

## Quick Test

After fixing rules, submit the booking form.
You should see in browser console:
```
[Firebase] Booking saved to Firestore: <document-id>
```

And in Firebase Console → Firestore → bookings collection, a new document appears.
