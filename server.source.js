import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './src/routes/bookingRoutes.js';
import { getTransporter } from './src/config/smtp.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Permissive CORS configuration for all incoming domains & methods
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Explicit CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Mount API routes
app.use('/api', bookingRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'Laptop Repairs & Services Backend API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      booking: '/api/book-service',
    },
  });
});

// Pre-initialize mailer connection on startup
getTransporter().catch((err) => {
  console.warn('Initial mailer check warning:', err.message);
});

app.listen(PORT, () => {
  console.log(`🚀 Laptop Repairs & Services Backend running on port ${PORT}`);
});

export default app;
