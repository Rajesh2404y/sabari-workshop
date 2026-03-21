import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const OWNER_TEMPLATE = process.env.REACT_APP_EMAILJS_OWNER_TEMPLATE_ID;
const CUSTOMER_TEMPLATE = process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const OWNER_EMAIL = process.env.REACT_APP_OWNER_EMAIL;
const OWNER_PHONE = process.env.REACT_APP_OWNER_PHONE;
const WORKSHOP_NAME = process.env.REACT_APP_WORKSHOP_NAME || "Sabari Auto Workshop";

function isEmailJSConfigured() {
  const keys = [SERVICE_ID, OWNER_TEMPLATE, CUSTOMER_TEMPLATE, PUBLIC_KEY];
  return keys.every(
    (k) =>
      k &&
      !k.includes("xxx") &&
      !k.includes("your_") &&
      !k.toUpperCase().includes("PASTE") &&
      !k.toUpperCase().includes("_HERE")
  );
}

export async function notifyOwner(booking) {
  if (!isEmailJSConfigured()) {
    console.warn("[EmailJS] Keys not configured - skipping owner email.");
    return null;
  }
  return emailjs.send(
    SERVICE_ID,
    OWNER_TEMPLATE,
    {
      to_email: OWNER_EMAIL,
      to_name: "Sabari Workshop Owner",
      customer_name: booking.name,
      customer_phone: booking.phone,
      customer_email: booking.email || "Not provided",
      car_brand: booking.carBrand,
      service_type: booking.serviceType,
      booking_date: booking.date,
      booking_time: booking.time,
      pickup_drop: booking.pickup ? `Yes - ${booking.address}` : "No",
      booking_id: booking.bookingId,
      workshop_name: WORKSHOP_NAME,
      quote_note: "Please contact the customer with service and quote details.",
    },
    PUBLIC_KEY
  );
}

export async function notifyCustomer(booking) {
  if (!booking.email || !isEmailJSConfigured()) return null;
  return emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE,
    {
      to_email: booking.email,
      to_name: booking.name,
      customer_name: booking.name,
      service_type: booking.serviceType,
      car_brand: booking.carBrand,
      booking_date: booking.date,
      booking_time: booking.time,
      pickup_drop: booking.pickup ? "Yes (Pickup and Drop)" : "No",
      owner_phone: OWNER_PHONE,
      workshop_name: WORKSHOP_NAME,
      quote_note: "Our team will contact you with price details and booking confirmation.",
    },
    PUBLIC_KEY
  );
}

export function openOwnerWhatsApp(booking) {
  const phone = OWNER_PHONE || "919444484399";
  const msg = encodeURIComponent(
    `New Booking - ${WORKSHOP_NAME}\n\n` +
    `Booking ID: ${booking.bookingId}\n` +
    `Name: ${booking.name}\n` +
    `Phone: ${booking.phone}\n` +
    `Car: ${booking.carBrand}\n` +
    `Service: ${booking.serviceType}\n` +
    `Date: ${booking.date}\n` +
    `Time: ${booking.time}\n` +
    `Pickup: ${booking.pickup ? `Yes - ${booking.address}` : "No"}\n\n` +
    `Please contact the customer with quote details.`
  );
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

export async function sendAllNotifications(booking) {
  const result = { ownerSent: false, customerSent: false, emailConfigured: isEmailJSConfigured(), errors: [] };

  try {
    const res = await notifyOwner(booking);
    result.ownerSent = res !== null;
  } catch (err) {
    result.errors.push(`Owner email: ${err.text || err.message}`);
    console.error("[EmailJS] Owner notification failed:", err);
  }

  try {
    const res = await notifyCustomer(booking);
    result.customerSent = res !== null;
  } catch (err) {
    result.errors.push(`Customer email: ${err.text || err.message}`);
    console.error("[EmailJS] Customer notification failed:", err);
  }

  return result;
}
