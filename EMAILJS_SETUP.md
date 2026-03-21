# 📧 EmailJS Setup Guide — Sabari Auto Workshop

## Step 1 — Create EmailJS Account
1. Go to https://www.emailjs.com and sign up (free tier = 200 emails/month)
2. Click **Add New Service** → choose **Gmail**
3. Connect your Gmail account: `sabariauto009@gmail.com`
4. Copy the **Service ID** → paste into `.env` as `REACT_APP_EMAILJS_SERVICE_ID`

---

## Step 2 — Owner Notification Template

Create a new template named `owner_booking_alert`.

**Subject:**
```
🚗 New Booking – {{booking_id}} | {{customer_name}}
```

**Body (HTML):**
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
  <div style="background:#E53E3E;padding:24px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px">🚗 New Booking Received</h1>
    <p style="color:#fca5a5;margin:4px 0 0">Sabari Auto Workshop</p>
  </div>
  <div style="padding:28px;background:#fff">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 0;color:#888;width:40%">Booking ID</td><td style="font-weight:bold;color:#111">{{booking_id}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Customer Name</td><td style="font-weight:bold;color:#111">{{customer_name}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Phone</td><td style="font-weight:bold;color:#E53E3E">{{customer_phone}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Email</td><td style="font-weight:bold;color:#111">{{customer_email}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Car Brand</td><td style="font-weight:bold;color:#111">{{car_brand}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Service</td><td style="font-weight:bold;color:#111">{{service_type}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Date</td><td style="font-weight:bold;color:#111">{{booking_date}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Time</td><td style="font-weight:bold;color:#111">{{booking_time}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Pickup & Drop</td><td style="font-weight:bold;color:#111">{{pickup_drop}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Estimated Price</td><td style="font-weight:bold;color:#E53E3E;font-size:16px">{{estimated_price}}</td></tr>
    </table>
    <div style="margin-top:24px;padding:16px;background:#fff8e1;border-radius:8px;border-left:4px solid #F6C90E">
      <p style="margin:0;font-size:13px;color:#555">⚡ Call the customer to confirm the appointment.</p>
    </div>
  </div>
  <div style="background:#111;padding:16px;text-align:center">
    <p style="color:#666;font-size:12px;margin:0">Sabari Auto Workshop · Anna Nagar, Chennai · +91 94444 84399</p>
  </div>
</div>
```

**To Email:** `{{to_email}}`
Copy the **Template ID** → paste into `.env` as `REACT_APP_EMAILJS_OWNER_TEMPLATE_ID`

---

## Step 3 — Customer Confirmation Template

Create a new template named `customer_booking_confirm`.

**Subject:**
```
✅ Booking Confirmed – {{workshop_name}} | {{booking_id}}
```

**Body (HTML):**
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
  <div style="background:#111;padding:24px;text-align:center">
    <h1 style="color:#F6C90E;margin:0;font-size:22px">✅ Booking Confirmed!</h1>
    <p style="color:#888;margin:4px 0 0">{{workshop_name}}</p>
  </div>
  <div style="padding:28px;background:#fff">
    <p style="font-size:15px;color:#333">Hi <strong>{{customer_name}}</strong>,</p>
    <p style="font-size:14px;color:#555">Your car service booking has been confirmed. Here are your details:</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888;width:40%">Booking ID</td><td style="font-weight:bold;color:#E53E3E">{{booking_id}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Service</td><td style="font-weight:bold;color:#111">{{service_type}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Car</td><td style="font-weight:bold;color:#111">{{car_brand}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Date</td><td style="font-weight:bold;color:#111">{{booking_date}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Time</td><td style="font-weight:bold;color:#111">{{booking_time}}</td></tr>
      <tr><td style="padding:8px 0;color:#888">Pickup & Drop</td><td style="font-weight:bold;color:#111">{{pickup_drop}}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#888">Estimated Price</td><td style="font-weight:bold;color:#E53E3E;font-size:16px">{{estimated_price}}</td></tr>
    </table>
    <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e">
      <p style="margin:0;font-size:13px;color:#555">Our team will call you shortly to confirm your slot. For any queries, call us at <strong>+91 94444 84399</strong>.</p>
    </div>
  </div>
  <div style="background:#111;padding:16px;text-align:center">
    <p style="color:#666;font-size:12px;margin:0">Sabari Auto Workshop · Anna Nagar, Chennai</p>
  </div>
</div>
```

**To Email:** `{{to_email}}`
Copy the **Template ID** → paste into `.env` as `REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID`

---

## Step 4 — Get Public Key
1. In EmailJS dashboard → **Account** → **General**
2. Copy **Public Key**
3. Paste into `.env` as `REACT_APP_EMAILJS_PUBLIC_KEY`

---

## Step 5 — Final .env values
```
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
REACT_APP_OWNER_EMAIL=sabariauto009@gmail.com
REACT_APP_OWNER_PHONE=919444484399
REACT_APP_WORKSHOP_NAME=Sabari Auto Workshop
```

## Step 6 — Restart dev server
```bash
npm start
```
> ⚠️ Always restart after editing `.env`

---

## How Notifications Work

| Event | Action |
|---|---|
| Customer submits booking | Booking saved to localStorage |
| Owner email | Sent via EmailJS with full booking details |
| Customer email | Sent if customer provided email (optional) |
| WhatsApp | Opens WhatsApp Web with pre-filled message to owner (+91 94444 84399) |
| Duplicate check | Same phone + service + date blocked with error message |
