import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Base Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Vaatika Zone API Server (Chhattisgarh Fruits & Vegetables)',
  });
});

// API Routes mounting
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Catch 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Centralized JSON Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Error Details:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Validation Errors (e.g. invalid emails, negative prices)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  // Handle Mongoose Duplicate Key Error (e.g. registering already registered email)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Email address is already in use. Please choose another one.';
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId format in URI)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with invalid key format: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

// For testing server closure in automated tests
export { app, server };
