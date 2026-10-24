import express from 'express';
import nodemailer from 'nodemailer';
import { getTransporter, cleanEnv } from '../config/smtp.js';
import { generateBookingEmailHtml, generateTeamAlertEmailHtml } from '../templates/bookingEmail.js';

const router = express.Router();

const SERVICE_DISPLAY_MAP = {
  'laptop-repair': 'Laptop Hardware Diagnostics & Motherboard Servicing',
  'computer-repair': 'Desktop & PC Repair & Troubleshooting',
  'networking': 'Structured IT Networking, CAT6 Cabling & Wi-Fi Setup',
  'cctv-repair-installation': 'CCTV Camera Surveillance, Mounting & DVR Setup',
};

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Door Step Service Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Book Service & Send Confirmation to Customer + Alert to Team
router.post('/book-service', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      service,
      subcategory,
      address,
      city = 'Hyderabad',
      ticketId = 'TF-' + Math.floor(100000 + Math.random() * 900000),
      discountAmount = 150,
      payableAmount = 0,
      contactMethod = 'phone',
      slotDate,
      slotTime,
      description,
      paymentMethod,
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name and mobile number are required.',
      });
    }

    const serviceName = SERVICE_DISPLAY_MAP[service] || service || 'Doorstep IT & Appliance Repair';
    const transporter = await getTransporter();

    const fromAddress =
      cleanEnv(process.env.BOOKINGS_EMAIL_USER) ||
      cleanEnv(process.env.SMTP_FROM) ||
      cleanEnv(process.env.SMTP_USER) ||
      'bookings@doorstephub.com';

    const teamNotificationEmail =
      cleanEnv(process.env.TEAM_NOTIFICATION_EMAIL) || 'doorstephub@gmail.com';

    let customerMailSent = false;
    let teamMailSent = false;
    let previewUrl = null;

    // 1. Dispatch Confirmation Email to Customer (if email provided)
    if (email) {
      const customerEmailHtml = generateBookingEmailHtml({
        fullName,
        phone,
        email,
        serviceName,
        subcategory,
        ticketId,
        address,
        city,
        contactMethod,
        slotDate,
        slotTime,
        description,
        paymentMethod,
        discountAmount,
      });

      const customerMailOptions = {
        from: `"Door Step Service" <${fromAddress}>`,
        to: email,
        subject: `Booking Confirmed: Doorstep Repair Dispatch (#${ticketId})`,
        html: customerEmailHtml,
      };

      try {
        const info = await transporter.sendMail(customerMailOptions);
        customerMailSent = true;
        previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`📧 Customer confirmation email sent to ${email} (MessageId: ${info.messageId})`);
      } catch (custMailErr) {
        console.warn(`⚠️ Customer email dispatch failed for ${email}:`, custMailErr.message);
      }
    }

    // 2. Dispatch Booking Alert to Doorstep Hub Team (doorstephub@gmail.com)
    const teamEmailHtml = generateTeamAlertEmailHtml({
      fullName,
      phone,
      email,
      serviceName,
      subcategory,
      ticketId,
      address,
      city,
      contactMethod,
      slotDate,
      slotTime,
      description,
      paymentMethod,
    });

    const teamMailOptions = {
      from: `"Door Step Service Bookings" <${fromAddress}>`,
      to: teamNotificationEmail,
      subject: `🚨 NEW BOOKING ALERT: ${fullName} - ${serviceName} (${city}) [#${ticketId}]`,
      html: teamEmailHtml,
    };

    try {
      const teamInfo = await transporter.sendMail(teamMailOptions);
      teamMailSent = true;
      console.log(`🚀 Team alert email sent to ${teamNotificationEmail} (MessageId: ${teamInfo.messageId})`);
    } catch (teamMailErr) {
      console.warn(`⚠️ Team alert email dispatch failed for ${teamNotificationEmail}:`, teamMailErr.message);
    }

    res.json({
      success: true,
      message: 'Booking completed successfully.',
      ticketId,
      customerEmailSent: customerMailSent,
      teamEmailSent: teamMailSent,
      emailSentTo: email || null,
      teamAlertSentTo: teamNotificationEmail,
      previewUrl: previewUrl || null,
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process booking: ' + error.message,
    });
  }
});

export default router;
