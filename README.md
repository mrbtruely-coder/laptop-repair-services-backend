# Door Step Service - Backend API

Node.js + Express backend service responsible for handling service bookings and dispatching automated confirmation emails via SMTP.

## 📁 Directory Structure
```
backend/
├── .env                          # SMTP and Server environment variables
├── package.json                  # Backend dependencies (express, nodemailer, cors, dotenv)
├── server.js                     # Main Express server entry point
├── index.js                      # Index alias
└── src/
    ├── config/
    │   └── smtp.js               # Nodemailer transporter & authentication
    ├── routes/
    │   └── bookingRoutes.js      # API routes (/api/health, /api/book-service)
    └── templates/
        └── bookingEmail.js       # Customer confirmation HTML email template
```

## 🔐 Environment Variables (`.env`)
```ini
PORT=5000
SMTP_HOST="mail.goexperts.in"
SMTP_PORT=465
SMTP_USER="helpdesk@goexperts.in"
SMTP_PASS="7tT?Nc-]PfwF7.Cj"
SMTP_FROM="servicedesk@goexperts.in"
```

## 🚀 Running the Backend Independently
From this `backend` directory:
```bash
npm install
npm start
```
The server will run on `http://localhost:5000`.

## 📡 API Endpoints
- `GET /api/health`: Server health check.
- `POST /api/book-service`: Register a customer booking and send a styled HTML confirmation email.
