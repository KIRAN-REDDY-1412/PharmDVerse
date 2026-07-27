const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/caseRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const platformRoutes = require('./routes/platformRoutes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', apiLimiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/colleges', collegeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cases', caseRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/platform', platformRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'HEALTHY', timestamp: new Date().toISOString(), version: 'v2.1.0' });
});

// Swagger Mock Endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: { title: 'PharmDVerse ERP API', version: '2.1.0', description: 'Enterprise Multi-College SaaS ERP Backend APIs' }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `API route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
