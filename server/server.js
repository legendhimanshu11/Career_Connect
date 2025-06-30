import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';

import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware } from '@clerk/express';


// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Base test route
app.get('/', (req, res) => {
  res.send('🚀 API is working');
});

// Webhook route
app.post('/webhooks', clerkWebhooks);

// API routes
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Start server after DB and Cloudinary are connected
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connects first
    await connectCloudinary();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();