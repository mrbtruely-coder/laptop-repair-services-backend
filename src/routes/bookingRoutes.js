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
    service: 'Laptop Repairs & Services Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Book Service & Send Confirmation to Customer + Alert to Team
router.post('/book-service', async (req, res) => {
  try {
    const fullName = req.body.fullName || req.body.name || req.body.customerName;
    const phone = req.body.phone || req.body.mobile || req.body.customerPhone;
    const email = req.body.email || req.body.customerEmail;
    const service = req.body.service || req.body.serviceType;
    const subcategory = req.body.subcategory || req.body.issueCategory || '';
    const address = req.body.address || req.body.streetAddress || '';
    const city = req.body.city || 'Hyderabad';
    const ticketId = req.body.ticketId || req.body.bookingId || ('TF-' + Math.floor(100000 + Math.random() * 900000));
    const discountAmount = req.body.discountAmount || 0;
    const payableAmount = req.body.payableAmount || 499;
    const contactMethod = req.body.contactMethod || 'phone';
    const slotDate = req.body.slotDate || req.body.preferredDate || new Date().toISOString().split('T')[0];
    const slotTime = req.body.slotTime || req.body.preferredTime || 'Within 90 Minutes (Express Dispatch)';
    const description = req.body.description || req.body.issueDescription || req.body.notes || '';
    const paymentMethod = req.body.paymentMethod || 'doorstep_cod';

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name and mobile number are required.',
      });
    }

    const serviceName = SERVICE_DISPLAY_MAP[service] || req.body.serviceType || service || 'Doorstep IT & Appliance Repair';
    const transporter = await getTransporter();

    const fromAddress =
      cleanEnv(process.env.BOOKINGS_EMAIL_USER) ||
      cleanEnv(process.env.SMTP_FROM) ||
      cleanEnv(process.env.SMTP_USER) ||
      'bookinginfo@homeappliancerepairsservices.com';

    const teamNotificationEmail =
      cleanEnv(process.env.TEAM_NOTIFICATION_EMAIL) || fromAddress;

    let customerMailSent = false;
    let teamMailSent = false;
    let customerEmailError = null;
    let teamEmailError = null;
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
        from: `"Laptop Repairs & Services" <${fromAddress}>`,
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
        customerEmailError = custMailErr.message;
        console.warn(`⚠️ Customer email dispatch failed for ${email}:`, custMailErr.message);
      }
    }

    // 2. Dispatch Booking Alert to Team
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
      from: `"Laptop Repairs & Services Bookings" <${fromAddress}>`,
      to: teamNotificationEmail,
      subject: `🚨 NEW BOOKING ALERT: ${fullName} - ${serviceName} (${city}) [#${ticketId}]`,
      html: teamEmailHtml,
    };

    try {
      const teamInfo = await transporter.sendMail(teamMailOptions);
      teamMailSent = true;
      console.log(`🚀 Team alert email sent to ${teamNotificationEmail} (MessageId: ${teamInfo.messageId})`);
    } catch (teamMailErr) {
      teamEmailError = teamMailErr.message;
      console.warn(`⚠️ Team alert email dispatch failed for ${teamNotificationEmail}:`, teamMailErr.message);
    }

    const successMsg = customerMailSent
      ? `Booking #${ticketId} confirmed! Confirmation email dispatched to ${email}. Technician arriving as scheduled.`
      : `Booking #${ticketId} confirmed! Technician coordinator will call you directly at ${phone}.`;

    res.json({
      success: true,
      message: successMsg,
      ticketId,
      bookingId: ticketId,
      customerEmailSent: customerMailSent,
      teamEmailSent: teamMailSent,
      emailSentTo: email || null,
      teamAlertSentTo: teamNotificationEmail,
      customerEmailError,
      teamEmailError,
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
