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

function formatFriendlyDate(dateStr) {
  if (!dateStr) return 'Today';
  try {
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    }
  } catch (e) {}
  return String(dateStr);
}

/**
 * Customer Booking Confirmation Email Template
 * Fully responsive across all devices (Mobile, Tablet, Desktop)
 * Industry Standard Level Footer with Doorstep Hub App Store & Play Store links
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
  subArea = '',
  otherLocation = '',
  isOtherArea = false,
  contactMethod = 'phone',
  slotDate = '',
  slotTime = '',
  description = '',
  paymentMethod = '',
  discountAmount = 0,
}) {
  const formattedPhone = formatPhoneDisplay(phone);
  const paymentModeLabel = 'Cash on Delivery (Pay After Service)';

  const playStoreUrl = process.env.PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.doorstephub.customer&pcampaignid=web_share';
  const appStoreUrl = process.env.APP_STORE_URL || 'https://apps.apple.com/in/app/doorstep-hub-all-your-needs/id6475340236';
  const PLAY_STORE_URL = playStoreUrl;
  const APP_STORE_URL = appStoreUrl;
  const smtpUser = process.env.BOOKINGS_EMAIL_USER || process.env.SMTP_USER || 'bookinginfo@homeappliancerepairsservices.com';

  const displayLocation = otherLocation || subArea;
  const isCustomLocation = Boolean(isOtherArea || otherLocation);

  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
      <title>Booking Confirmation - Laptop Repairs & Services</title>
      <style>
        /* Base reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        
        /* Device responsive styling */
        @media only screen and (max-width: 620px) {
          .email-container {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0px !important;
          }
          .outer-wrapper {
            padding: 8px 4px !important;
          }
          .header-cell {
            padding: 20px 14px !important;
          }
          .content-cell {
            padding: 18px 14px !important;
          }
          .brand-logo {
            max-height: 42px !important;
          }
          .brand-title {
            font-size: 19px !important;
          }
          .ticket-number {
            font-size: 19px !important;
          }
          .detail-table td {
            padding: 8px 6px !important;
            font-size: 12px !important;
          }
          .detail-label-col {
            width: 42% !important;
          }
          .app-download-cell {
            padding: 16px 12px !important;
          }
          .store-btn-col {
            display: block !important;
            width: 100% !important;
            padding: 5px 0 !important;
          }
          .store-btn-table {
            width: 100% !important;
            max-width: 260px !important;
            margin: 0 auto !important;
          }
          .cta-btn {
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 14px 16px !important;
          }
          .trust-badge-item {
            display: block !important;
            margin: 4px 0 !important;
          }
          .trust-divider {
            display: none !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #06223A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; -webkit-font-smoothing: antialiased;">
      
      <!-- Outer Wrapper -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #06223A; width: 100%; margin: 0 auto;">
        <tr>
          <td align="center" class="outer-wrapper" style="padding: 24px 12px;">
            
            <!-- Main Email Container -->
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-container" style="max-width: 620px; width: 100%; background-color: #0B2D4C; border: 1px solid rgba(34, 197, 94, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.55);">
              
              <!-- 1. Header Banner -->
              <tr>
                <td class="header-cell" style="background: linear-gradient(135deg, #06223A 0%, #0F3B63 100%); padding: 26px 20px; text-align: center; border-bottom: 2px solid #22C55E;">
                  <div style="text-align: center; margin-bottom: 12px;">
                    <img src="https://laptoprepairsservices.com/logo.png" alt="Laptop Repairs & Services" class="brand-logo" style="max-height: 50px; width: auto; max-width: 220px; vertical-align: middle; background-color: #FFFFFF; padding: 6px 14px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.3);" />
                  </div>
                  <div>
                    <span style="display: inline-block; background-color: #22C55E; color: #06223A; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
                      BOOKING CONFIRMED
                    </span>
                  </div>
                  <h1 class="brand-title" style="margin: 10px 0 0; color: #FFFFFF; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                    LAPTOP REPAIRS & SERVICES
                  </h1>
                  <p style="margin: 4px 0 0; color: #86EFAC; font-size: 13px; font-weight: 500;">
                    Same-Day Doorstep Technician Dispatch in ${displayLocation ? `${displayLocation}, ` : ''}${city}
                  </p>
                </td>
              </tr>

              <!-- 2. Content Body -->
              <tr>
                <td class="content-cell" style="padding: 24px 22px;">
                  <h2 style="margin: 0 0 10px; color: #FFFFFF; font-size: 18px; font-weight: 700;">
                    Hello ${fullName},
                  </h2>
                  <p style="margin: 0 0 16px; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.55;">
                    Your doorstep repair booking is <strong>confirmed</strong>. Our verified service engineer has been assigned to your ticket and is preparing for dispatch.
                  </p>

                  <!-- Ticket Badge Card -->
                  <div style="background-color: #06223A; border: 1px solid rgba(34, 197, 94, 0.35); border-radius: 12px; padding: 14px 18px; margin-bottom: 18px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle">
                          <span style="font-size: 10px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); display: block; font-weight: 600; letter-spacing: 0.5px;">Service Ticket ID</span>
                          <span class="ticket-number" style="font-size: 22px; font-weight: 800; color: #22C55E; font-family: 'Courier New', Courier, monospace; letter-spacing: 1px;">${ticketId}</span>
                        </td>
                        <td align="right" valign="middle">
                          <span style="display: inline-block; background-color: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.45); color: #86EFAC; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">
                            ACTIVE DISPATCH
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Booking Details Table -->
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="10" class="detail-table" style="background-color: rgba(6, 34, 58, 0.8); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 12px; font-size: 13px; margin-bottom: 20px;">
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td class="detail-label-col" style="color: rgba(255, 255, 255, 0.6); width: 38%; font-weight: 500;">Customer Name:</td>
                      <td style="color: #FFFFFF; font-weight: 700; font-size: 14px;">${fullName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Mobile Number:</td>
                      <td style="color: #FFFFFF; font-weight: 700;">${formattedPhone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Customer Email:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${email || 'Not provided'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Service Category:</td>
                      <td style="color: #22C55E; font-weight: 800;">${serviceName}</td>
                    </tr>
                    ${subcategory ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Issue / Subcategory:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${subcategory}</td>
                    </tr>` : ''}
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">City:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${city}</td>
                    </tr>
                    ${displayLocation ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Area / Locality:</td>
                      <td style="color: #22C55E; font-weight: 700;">
                        ${displayLocation} ${isCustomLocation ? '<span style="color: #86EFAC; font-size: 11px; font-weight: normal; margin-left: 6px;">(Other Location)</span>' : ''}
                      </td>
                    </tr>` : ''}
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Service Address:</td>
                      <td style="color: #FFFFFF; font-weight: 600;">${address ? (displayLocation && address.toLowerCase().includes(displayLocation.toLowerCase()) ? `${address}, ${city}` : `${address}, ${displayLocation ? displayLocation + ', ' : ''}${city}`) : `${displayLocation ? displayLocation + ', ' : ''}${city}`}</td>
                    </tr>
                    ${slotDate ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Scheduled Date:</td>
                      <td style="color: #FFFFFF; font-weight: 700;">📅 ${formatFriendlyDate(slotDate)}</td>
                    </tr>` : ''}
                    ${slotTime ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Time Slot:</td>
                      <td style="color: #22C55E; font-weight: 700;">⏰ ${slotTime}</td>
                    </tr>` : ''}
                    ${description ? `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Issue Description:</td>
                      <td style="color: #FAF6F0; font-style: italic;">${description}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="color: rgba(255, 255, 255, 0.6); font-weight: 500;">Payment Mode:</td>
                      <td style="color: #22C55E; font-weight: 700;">${paymentModeLabel}</td>
                    </tr>
                  </table>

               <!-- Industry Standard Responsive App Download Section -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 14px; text-align: center;">
          <p style="margin: 0 0 6px; font-size: 14.5px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em;">
            Experience Faster Bookings on Doorstep Hub App
          </p>
          <p style="margin: 0 0 14px; font-size: 12.5px; color: #64748b; line-height: 1.4; max-width: 440px; margin-left: auto; margin-right: auto;">
            Track your technician in real-time, get instant discounts, and manage appliance warranty.
          </p>
          
          <div style="text-align: center; margin: 0 auto;">
            <div style="display: inline-block; vertical-align: middle; margin: 5px 6px;">
              <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" height="42" style="display: block; height: 42px; width: auto; max-width: 140px; border: 0;" />
              </a>
            </div>
            <div style="display: inline-block; vertical-align: middle; margin: 5px 6px;">
              <a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" height="42" style="display: block; height: 42px; width: auto; max-width: 140px; border: 0;" />
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding: 18px 20px; text-align: center; color: #64748b; font-size: 12px; background: #ffffff;">
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; background: #e0f2fe; color: #0284c7; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 20px; border: 1px solid #bae6fd;">
              🛡️ Verified &amp; Trusted by Doorstep Hub
            </span>
          </div>
          &copy; ${new Date().getFullYear()} Home Appliance Repair Services. Serving Vijayawada, Guntur &amp; Nellore.<br/>
          Helpline: <a href="tel:9515661677" style="color: #008ba6; text-decoration: none; font-weight: bold;">+91 9515661677</a> | Email: <a href="mailto:${smtpUser}" style="color: #008ba6; text-decoration: none;">${smtpUser}</a>
        </div>
      </div>

    </body>
    </html>
  `;
}

/**
 * Internal Team Alert Email Template
 * Fully responsive for dispatchers, mobile technicians and coordinators
 * Industry Standard Level Footer with Doorstep Hub App Links
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
  subArea = '',
  otherLocation = '',
  isOtherArea = false,
  contactMethod = 'phone',
  slotDate = '',
  slotTime = '',
  description = '',
  paymentMethod = '',
  submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
}) {
  const formattedPhone = formatPhoneDisplay(phone);
  const whatsappDigits = getRawDigits(phone);
  const paymentModeLabel = 'Cash on Delivery (Pay After Service)';

  const playStoreUrl = process.env.PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.doorstephub.customer&pcampaignid=web_share';
  const appStoreUrl = process.env.APP_STORE_URL || 'https://apps.apple.com/in/app/doorstep-hub-all-your-needs/id6475340236';

  const displayLocation = otherLocation || subArea;
  const isCustomLocation = Boolean(isOtherArea || otherLocation);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>NEW BOOKING ALERT: ${ticketId}</title>
      <style>
        @media only screen and (max-width: 620px) {
          .team-container {
            width: 100% !important;
            border-radius: 0 !important;
          }
          .action-btn {
            display: block !important;
            width: 100% !important;
            margin: 6px 0 !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }
          .store-btn-col {
            display: block !important;
            width: 100% !important;
            padding: 5px 0 !important;
          }
          .store-btn-table {
            width: 100% !important;
            max-width: 250px !important;
            margin: 0 auto !important;
          }
        }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 12px; color: #333;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            
            <table role="presentation" class="team-container" style="max-width: 620px; width: 100%; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 2px solid #22C55E; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
              
              <!-- Header -->
              <tr style="background-color: #06223A; color: #ffffff;">
                <td style="padding: 18px 20px;">
                  <div style="margin-bottom: 10px;">
                    <img src="https://laptoprepairsservices.com/logo.png" alt="Laptop Repairs & Services" style="max-height: 40px; width: auto; background-color: #ffffff; padding: 4px 12px; border-radius: 6px; display: inline-block;" />
                  </div>
                  <div style="font-size: 11px; font-weight: bold; color: #22C55E; text-transform: uppercase; letter-spacing: 0.5px;">NEW CUSTOMER BOOKING RECEIVED</div>
                  <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 20px;">Ticket #${ticketId} — ${displayLocation ? `${displayLocation}, ` : ''}${city}</h2>
                  <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Booked at: ${submittedAt}</div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 20px;">
                  
                  <h3 style="margin-top: 0; color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; font-size: 15px;">Customer Information</h3>
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
                    ${displayLocation ? `
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Area / Locality:</td>
                      <td style="padding: 6px 0;">
                        <span style="font-weight: bold; color: ${isCustomLocation ? '#92400e' : '#0369a1'}; background: ${isCustomLocation ? '#fef3c7' : '#e0f2fe'}; border: 1px solid ${isCustomLocation ? '#fde68a' : '#bae6fd'}; padding: 4px 10px; border-radius: 6px; display: inline-block; font-size: 13px;">
                          📍 ${displayLocation} ${isCustomLocation ? '<strong style="color: #b45309; margin-left: 6px;">[OTHER LOCATION SPECIFIED BY CUSTOMER]</strong>' : ''}
                        </span>
                      </td>
                    </tr>` : ''}
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Full Address / Locality:</td>
                      <td style="padding: 6px 0; background: #f8fafc; padding: 6px 10px; border-radius: 4px; font-weight: 500;">
                        ${address ? (displayLocation && address.toLowerCase().includes(displayLocation.toLowerCase()) ? `${address}, ${city}` : `${address}, ${displayLocation ? displayLocation + ', ' : ''}${city}`) : `${displayLocation ? displayLocation + ', ' : ''}${city}`}
                      </td>
                    </tr>
                  </table>

                  <h3 style="color: #06223A; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; font-size: 15px;">Service Details</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; width: 35%;">Service:</td>
                      <td style="padding: 6px 0; font-weight: bold; color: #06223A;">${serviceName}</td>
                    </tr>
                    ${subcategory ? `<tr><td style="padding: 6px 0; font-weight: bold;">Subcategory:</td><td style="padding: 6px 0;">${subcategory}</td></tr>` : ''}
                    ${description ? `<tr><td style="padding: 6px 0; font-weight: bold;">Issue Description:</td><td style="padding: 6px 0; font-style: italic; background: #fffbeb; padding: 6px 8px; border-radius: 4px;">${description}</td></tr>` : ''}
                    ${slotDate ? `
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Scheduled Date:</td>
                      <td style="padding: 6px 0; font-weight: 700; color: #06223A;">📅 ${formatFriendlyDate(slotDate)}</td>
                    </tr>` : ''}
                    ${slotTime ? `
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Time Slot:</td>
                      <td style="padding: 6px 0; font-weight: 700; color: #16a34a;">⏰ ${slotTime}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold;">Payment Mode:</td>
                      <td style="padding: 6px 0; font-weight: bold; color: #16a34a;">${paymentModeLabel}</td>
                    </tr>
                  </table>

                  <!-- Quick Action Buttons -->
                  <div style="margin-top: 16px; text-align: center; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                    <a href="tel:${phone}" class="action-btn" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: bold; margin: 4px;">
                      📞 Call Customer Now (${formattedPhone})
                    </a>
                    <a href="https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(fullName)},%20we%20received%20your%20booking%20#${ticketId}" class="action-btn" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: bold; margin: 4px;">
                      💬 WhatsApp Customer
                    </a>
                  </div>

                  <!-- Doorstep Hub App Download Section for Coordinators/Field Team -->
                  <div style="margin-top: 20px; padding: 16px 14px; background: #06223A; border-radius: 10px; text-align: center; color: #ffffff;">
                    <div style="font-size: 10px; font-weight: bold; color: #22C55E; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                      DOORSTEP HUB MOBILE APP
                    </div>
                    <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 12px;">
                      Download the official app to manage orders and track doorstep technician progress:
                    </div>
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto;">
                      <tr>
                        <!-- Google Play Button -->
                        <td class="store-btn-col" align="center" style="padding: 4px 6px;">
                          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" class="store-btn-table" style="background-color: #000000; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; padding: 6px 14px; min-width: 140px;">
                              <tr>
                                <td valign="middle" style="padding-right: 8px;">
                                  <img src="https://laptoprepairsservices.com/playstore-icon.png" width="20" height="22" alt="Google Play" style="display: block; border: 0;" />
                                </td>
                                <td valign="middle" align="left" style="line-height: 1.15;">
                                  <div style="color: #94A3B8; font-size: 8px; text-transform: uppercase; font-weight: 600;">GET IT ON</div>
                                  <div style="color: #FFFFFF; font-size: 12px; font-weight: bold;">Google Play</div>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                        <!-- App Store Button -->
                        <td class="store-btn-col" align="center" style="padding: 4px 6px;">
                          <a href="${appStoreUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" class="store-btn-table" style="background-color: #000000; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; padding: 6px 14px; min-width: 140px;">
                              <tr>
                                <td valign="middle" style="padding-right: 8px;">
                                  <img src="https://laptoprepairsservices.com/appstore-icon.png" width="20" height="22" alt="App Store" style="display: block; border: 0;" />
                                </td>
                                <td valign="middle" align="left" style="line-height: 1.15;">
                                  <div style="color: #94A3B8; font-size: 8px; text-transform: uppercase; font-weight: 600;">Download on</div>
                                  <div style="color: #FFFFFF; font-size: 12px; font-weight: bold;">App Store</div>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 12px 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
                  Laptop Repairs & Services Internal Booking Dispatch System • Powered by Doorstep Hub
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
