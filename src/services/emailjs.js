import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

if (isConfigured) {
  emailjs.init({ publicKey: PUBLIC_KEY });
}

export function isEmailjsConfigured() {
  return isConfigured;
}

export async function sendContactEmail(formElement) {
  if (!isConfigured) {
    throw new Error(
      'EmailJS no está configurado. Faltan VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID o VITE_EMAILJS_PUBLIC_KEY en el archivo .env',
    );
  }

  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formElement);
}
