import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const cleanEnv = (val) => (val ? String(val).replace(/["']/g, '').trim() : '');

let transporter = null;

export async function getTransporter() {
  if (transporter) return transporter;

  const host = cleanEnv(process.env.BOOKINGS_EMAIL_HOST) || cleanEnv(process.env.SMTP_HOST) || 'mail.doorstephub.com';
  const port = Number(cleanEnv(process.env.BOOKINGS_EMAIL_PORT) || cleanEnv(process.env.SMTP_PORT)) || 587;
  const user = cleanEnv(process.env.BOOKINGS_EMAIL_USER) || cleanEnv(process.env.SMTP_USER) || 'bookings@doorstephub.com';
  const pass = cleanEnv(process.env.BOOKINGS_EMAIL_PASS) || cleanEnv(process.env.SMTP_PASS) || 'jwT6NlDRBYh5';

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      await transporter.verify();
      console.log(`✅ SMTP Connection verified successfully for ${user} at ${host}:${port}`);
    } catch (verifyErr) {
      console.warn('⚠️ SMTP Verify warning:', verifyErr.message);
    }
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('⚠️ Running with Ethereal test mailer: ' + testAccount.user);
    } catch (err) {
      console.warn('Ethereal fallback:', err.message);
      transporter = nodemailer.createTransport({ jsonTransport: true });
    }
  }

  return transporter;
}
