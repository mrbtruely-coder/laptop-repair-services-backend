import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const cleanEnv = (val) => (val ? String(val).replace(/["']/g, '').trim() : '');

let transporter = null;

export async function getTransporter() {
  if (transporter) return transporter;

  let rawHost = cleanEnv(process.env.BOOKINGS_EMAIL_HOST) || cleanEnv(process.env.SMTP_HOST) || 'homeappliancerepairsservices.com';
  const host = rawHost;
  const rawPort = Number(cleanEnv(process.env.BOOKINGS_EMAIL_PORT) || cleanEnv(process.env.SMTP_PORT)) || 465;
  const port = rawPort === 587 ? 465 : rawPort;
  const user = cleanEnv(process.env.BOOKINGS_EMAIL_USER) || cleanEnv(process.env.SMTP_USER) || 'bookinginfo@homeappliancerepairsservices.com';
  const pass = cleanEnv(process.env.BOOKINGS_EMAIL_PASS) || cleanEnv(process.env.SMTP_PASS) || 'F9WA+c3eh=(Vl=af';

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
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    try {
      await transporter.verify();
      console.log(`✅ SMTP Connection verified successfully for ${user} at ${host}:${port}`);
    } catch (verifyErr) {
      console.warn(`⚠️ SMTP Verify on ${host}:${port} warning:`, verifyErr.message);
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
