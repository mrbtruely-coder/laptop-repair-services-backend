function formatPhoneDisplay(rawPhone) {
  if (!rawPhone) return 'Not provided';
  const clean = String(rawPhone).replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  if (clean.length === 12 && clean.startsWith('91')) {
    return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  return String(rawPhone);
}

function getRawDigits(rawPhone) {
  const clean = String(rawPhone || '').replace(/\D/g, '');
  return clean.length === 10 ? `91${clean}` : clean;
}

/**
 * Customer Booking Confirmation Email Template
 */
export function generateBookingEmailHtml({
  fullName = 'Valued Customer',
  phone = '',
  email = '',
  serviceName = 'Doorstep IT Repair',
  subcategory = '',
  ticketId = 'TF-000000',
  address = '',
  city = 'Hyderabad',
  contactMethod = 'phone',
  slotDate = '',
  slotTime = '',
  description = '',
  paymentMethod = '',
  discountAmount = 150,
}) {
  const formattedPhone = formatPhoneDisplay(phone);
  const paymentModeLabel =
    paymentMethod === 'doorstep_upi'
      ? 'Doorstep UPI (Pay After Service)'
      : 'Doorstep Cash / Pay After Service';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation - Door Step Service</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #06223A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #FFFFFF;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #06223A; padding: 25px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0B2D4C; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <!-- Header Banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #06223A 0%, #0F3B63 100%); padding: 25px 20px; text-align: center; border-bottom: 2px solid #22C55E;">
                  <span style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
                    BOOKING CONFIRMED
                  </span>
                  <h1 style="margin: 8px 0 0; color: #FFFFFF; font-size: 22px; font-weight: 800;">
                    LAPTOP REPAIRS & SERVICES
                  </h1>
                  <p style="margin: 4px 0 0; color: #86EFAC; font-size: 13px;">
                    Same-Day Doorstep Technician Dispatch in ${city}
                  </p>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 24px 20px;">
                  <h2 style="margin: 0 0 10px; color: #FFFFFF; font-size: 18px;">
                    Hello ${fullName},
                  </h2>
                  <p style="margin: 0 0 16px; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">
                    Your service booking has been <strong>successfully registered</strong>. Our certified technician is being dispatched to your location.
                  </p>

                  <!-- Ticket Badge Box -->
                  <div style="background-color: #06223A; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 14px 18px; margin-bottom: 18px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="font-size: 10px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); display: block;">Service Ticket ID</span>
                          <span style="font-size: 22px; font-weight: 800; color: #22C55E; font-family: monospace;">${ticketId}</span>
                        </td>
                        <td align="right">
                          <span style="background-color: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.4); color: #86EFAC; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
                            ACTIVE DISPATCH
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Complete User Booking Details Table -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: rgba(6, 34, 58, 0.75); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; font-size: 13px; margin-bottom: 20px;">
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); width: 38%;">Customer Name:</td>
                      <td style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${fullName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Mobile Number:</td>
                      <td style="color: #FFFFFF; font-weight: bold;">${formattedPhone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Customer Email:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${email || 'Not provided'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Service Category:</td>
                      <td style="color: #22C55E; font-weight: 700;">${serviceName}</td>
                    </tr>
                    ${subcategory ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Issue / Subcategory:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${subcategory}</td>
                    </tr>` : ''}
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">City:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${city}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Service Address / Locality:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${address ? address + ', ' : ''}${city}</td>
                    </tr>
                    ${slotDate || slotTime ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Scheduled Slot:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${slotDate || 'Today'} (${slotTime || 'Within 45-90 mins'})</td>
                    </tr>` : ''}
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Preferred Contact:</td>
                      <td style="color: #FFFFFF; font-weight: 600; text-transform: uppercase;">${contactMethod}</td>
                    </tr>
                    ${description ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Issue Description / Notes:</td>
                      <td style="color: #FAF6F0; font-style: italic;">${description}</td>
                    </tr>` : ''}
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Payment Method:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${paymentModeLabel}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6);">Doorstep Visit Fee:</td>
                      <td style="color: #22C55E; font-weight: 700;">FREE (Pay After Service)</td>
                    </tr>
                    <tr>
                      <td style="color: rgba(255, 255, 255, 0.6);">Service Warranty:</td>
                      <td style="color: #86EFAC; font-weight: 700;">Up to 90 Days Warranty</td>
                    </tr>
                  </table>

                  <!-- What happens next -->
                  <div style="background-color: rgba(34, 197, 94, 0.1); border-left: 3px solid #22C55E; border-radius: 4px; padding: 12px 14px; margin-bottom: 20px;">
                    <strong style="color: #22C55E; font-size: 12px;">What Happens Next?</strong>
                    <p style="margin: 4px 0 0; color: #FFFFFF; font-size: 12px; line-height: 1.5;">
                      1. Our local coordinator in ${city} will verify your exact location & confirm technician arrival.<br>
                      2. Certified engineer equipped with genuine diagnostic parts visits your doorstep.<br>
                      3. Upfront transparent pricing. Pay only after inspection/repair!
                    </p>
                  </div>

                  <!-- Direct Support CTA -->
                  <div style="text-align: center; padding-top: 5px;">
                    <a href="tel:+919515661677" style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 13px; font-weight: 800; text-decoration: none; padding: 12px 28px; border-radius: 24px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);">
                      Call Support: +91 95156 61677
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #06223A; padding: 16px 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                  <p style="margin: 0 0 4px; color: rgba(255, 255, 255, 0.7); font-size: 11px;">
                    Laptop Repairs & Services • Same-day Doorstep Support across Bengaluru, Vizag, Chennai & Hyderabad
                  </p>
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 10px;">
                    © 2026 Door Step Service. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Internal Team Alert Email Template (Sent to doorstephub@gmail.com)
 */
export function generateTeamAlertEmailHtml({
  fullName = 'Customer',
  phone = '',
  email = '',
  serviceName = 'Doorstep IT Repair',
  subcategory = '',
  ticketId = 'TF-000000',
  address = '',
  city = 'Hyderabad',
  contactMethod = 'phone',
  slotDate = '',
  slotTime = '',
  description = '',
  paymentMethod = '',
  submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
}) {
  const formattedPhone = formatPhoneDisplay(phone);
  const whatsappDigits = getRawDigits(phone);
  const paymentModeLabel =
    paymentMethod === 'doorstep_upi'
      ? 'Doorstep UPI (Pay After Service)'
      : 'Doorstep Cash / Pay After Service';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>NEW BOOKING: ${ticketId}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 16px; color: #333;">
      <table style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 2px solid #22C55E; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr style="background-color: #06223A; color: #ffffff;">
          <td style="padding: 16px 20px;">
            <div style="font-size: 11px; font-weight: bold; color: #22C55E; text-transform: uppercase;">NEW CUSTOMER BOOKING RECEIVED</div>
            <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 19px;">Ticket #${ticketId} — ${city}</h2>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Time: ${submittedAt}</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <h3 style="margin-top: 0; color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 35%;">Customer Name:</td>
                <td style="padding: 6px 0; font-size: 15px; font-weight: bold; color: #06223A;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Mobile Number:</td>
                <td style="padding: 6px 0;">
                  <a href="tel:${phone}" style="font-size: 16px; font-weight: bold; color: #2563eb; text-decoration: none;">${formattedPhone}</a>
                  &nbsp;|&nbsp;
                  <a href="https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20service%20booking%20#${ticketId}" style="color: #16a34a; font-weight: bold; text-decoration: none;">WhatsApp Customer</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Customer Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">City:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #16a34a;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Full Address / Locality:</td>
                <td style="padding: 6px 0; background: #f8fafc; padding: 6px 10px; border-radius: 4px;">${address || 'Address pending verification'}</td>
              </tr>
            </table>

            <h3 style="color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Service Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 35%;">Service:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #06223A;">${serviceName}</td>
              </tr>
              ${subcategory ? `<tr><td style="padding: 6px 0; font-weight: bold;">Subcategory:</td><td style="padding: 6px 0;">${subcategory}</td></tr>` : ''}
              ${description ? `<tr><td style="padding: 6px 0; font-weight: bold;">Issue Description:</td><td style="padding: 6px 0; font-style: italic; background: #fffbeb; padding: 6px 8px; border-radius: 4px;">${description}</td></tr>` : ''}
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Scheduled Slot:</td>
                <td style="padding: 6px 0;">${slotDate || 'Today'} (${slotTime || 'Within 45-90 mins'})</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Preferred Contact:</td>
                <td style="padding: 6px 0; text-transform: uppercase;">${contactMethod}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Payment Mode:</td>
                <td style="padding: 6px 0;">${paymentModeLabel}</td>
              </tr>
            </table>

            <div style="margin-top: 16px; text-align: center; padding-top: 12px; border-top: 1px solid #e2e8f0;">
              <a href="tel:${phone}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: bold; margin-right: 8px;">
                📞 Call Customer Now (${formattedPhone})
              </a>
              <a href="https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20booking%20#${ticketId}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: bold;">
                💬 WhatsApp Customer
              </a>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
