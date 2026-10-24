/**
 * Customer Booking Confirmation Email Template
 */
export function generateBookingEmailHtml({
  fullName,
  phone,
  email,
  serviceName,
  subcategory,
  ticketId,
  address,
  city = 'Hyderabad',
  contactMethod = 'phone',
  slotDate,
  slotTime,
  discountAmount = 150,
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Door Step Service</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #06223A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #FFFFFF;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #06223A; padding: 30px 15px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0B2D4C; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <!-- Header Banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #06223A 0%, #0F3B63 100%); padding: 30px 25px; text-align: center; border-bottom: 2px solid #22C55E;">
                  <span style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                    BOOKING CONFIRMED
                  </span>
                  <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                    LAPTOP REPAIRS & SERVICES
                  </h1>
                  <p style="margin: 6px 0 0; color: #86EFAC; font-size: 13px; font-weight: 500;">
                    Same-Day Doorstep Technician Dispatch in ${city}
                  </p>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 30px 25px;">
                  <h2 style="margin: 0 0 12px; color: #FFFFFF; font-size: 18px; font-weight: 700;">
                    Hello ${fullName},
                  </h2>
                  <p style="margin: 0 0 20px; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.6;">
                    Your service booking has been <strong>successfully registered</strong>. Our certified field technician is scheduled for doorstep arrival at your location.
                  </p>

                  <!-- Ticket Badge Box -->
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #06223A; border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 14px; margin-bottom: 22px;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="left">
                              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255, 255, 255, 0.6); display: block;">
                                Service Ticket ID
                              </span>
                              <span style="font-size: 20px; font-weight: 800; color: #22C55E; font-family: monospace;">
                                ${ticketId}
                              </span>
                            </td>
                            <td align="right">
                              <span style="background-color: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.4); color: #86EFAC; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
                                ACTIVE DISPATCH
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Service Details Summary -->
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(6, 34, 58, 0.7); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 14px; margin-bottom: 22px;">
                    <tr>
                      <td style="padding: 18px 20px;">
                        <h3 style="margin: 0 0 14px; color: #22C55E; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                          Booking & Equipment Details
                        </h3>
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 13px;">
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6); width: 40%;">Service Category:</td>
                            <td style="color: #FFFFFF; font-weight: 700;">${serviceName}</td>
                          </tr>
                          ${subcategory ? `
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Issue / Subcategory:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">${subcategory}</td>
                          </tr>` : ''}
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Customer Name:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">${fullName}</td>
                          </tr>
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Mobile Number:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">+91 ${phone}</td>
                          </tr>
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Service Location:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">${address ? address + ', ' : ''}${city}</td>
                          </tr>
                          ${slotDate || slotTime ? `
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Scheduled Slot:</td>
                            <td style="color: #FFFFFF; font-weight: 600;">${slotDate || 'Today'} (${slotTime || 'Within 90 mins'})</td>
                          </tr>` : ''}
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Preferred Contact:</td>
                            <td style="color: #FFFFFF; font-weight: 600; text-transform: capitalize;">${contactMethod}</td>
                          </tr>
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Doorstep Visit:</td>
                            <td style="color: #22C55E; font-weight: 700;">FREE (Pay Only After Service)</td>
                          </tr>
                          <tr>
                            <td style="color: rgba(255, 255, 255, 0.6);">Warranty:</td>
                            <td style="color: #86EFAC; font-weight: 700;">Up to 90 Days Service Warranty</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- What happens next -->
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(34, 197, 94, 0.1); border-left: 3px solid #22C55E; border-radius: 4px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 14px 16px;">
                        <p style="margin: 0; color: #FFFFFF; font-size: 12px; line-height: 1.6;">
                          <strong style="color: #22C55E;">What Happens Next?</strong><br>
                          1. Our local service desk in ${city} will verify your exact location & confirm the technician's arrival.<br>
                          2. A verified technician with genuine parts and diagnostic equipment will visit your doorstep.<br>
                          3. You receive transparent upfront diagnosis. Pay only after the service is completed!
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Direct Support CTA -->
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <a href="tel:+919515661677" style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 13px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 30px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);">
                          Call Support: +91 95156 61677
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #06223A; padding: 20px 25px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                  <p style="margin: 0 0 6px; color: rgba(255, 255, 255, 0.7); font-size: 11px;">
                    Laptop Repairs & Services • Doorstep Repair Support across Bengaluru, Vizag, Chennai & Hyderabad
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
  fullName,
  phone,
  email,
  serviceName,
  subcategory,
  ticketId,
  address,
  city = 'Hyderabad',
  contactMethod = 'phone',
  slotDate,
  slotTime,
  description,
  paymentMethod,
  submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>🚨 NEW CUSTOMER BOOKING: ${ticketId}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; color: #333;">
      <table style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 2px solid #22C55E; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr style="background-color: #06223A; color: #ffffff;">
          <td style="padding: 20px 24px;">
            <div style="font-size: 12px; font-weight: bold; color: #22C55E; text-transform: uppercase;">NEW LEAD RECEIVED</div>
            <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 20px;">Ticket #${ticketId} — ${city}</h2>
            <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">Time: ${submittedAt}</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <h3 style="margin-top: 0; color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 35%;">Customer Name:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: bold; color: #06223A;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Mobile Number:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${phone}" style="font-size: 16px; font-weight: bold; color: #2563eb; text-decoration: none;">+91 ${phone}</a>
                  &nbsp;|&nbsp;
                  <a href="https://wa.me/91${phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20service%20booking%20#${ticketId}" style="color: #16a34a; font-weight: bold; text-decoration: none;">WhatsApp</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">City:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #16a34a;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Full Address / Locality:</td>
                <td style="padding: 8px 0; background: #f8fafc; padding: 6px 10px; border-radius: 6px;">${address || 'Address pending verification'}</td>
              </tr>
            </table>

            <h3 style="color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Service Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 35%;">Service Requested:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #06223A;">${serviceName}</td>
              </tr>
              ${subcategory ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Issue / Subcategory:</td>
                <td style="padding: 8px 0;">${subcategory}</td>
              </tr>` : ''}
              ${description ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Issue Notes:</td>
                <td style="padding: 8px 0; font-style: italic; background: #fffbeb; padding: 6px 10px; border-radius: 6px;">${description}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Scheduled Slot:</td>
                <td style="padding: 8px 0; font-weight: bold;">${slotDate || 'Today'} — ${slotTime || 'Immediate (within 90 mins)'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Preferred Contact:</td>
                <td style="padding: 8px 0; text-transform: uppercase; font-weight: bold;">${contactMethod}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Payment Mode:</td>
                <td style="padding: 8px 0;">${paymentMethod || 'Doorstep COD / UPI'}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; text-align: center; padding-top: 15px; border-top: 1px solid #e2e8f0;">
              <a href="tel:${phone}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-right: 10px;">
                📞 Call Customer Immediately
              </a>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
