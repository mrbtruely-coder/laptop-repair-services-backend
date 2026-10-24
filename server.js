import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './src/routes/bookingRoutes.js';
import { getTransporter } from './src/config/smtp.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', bookingRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'Door Step Service Backend API',
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
  console.log(`🚀 Door Step Service Backend running on http://localhost:${PORT}`);
});
