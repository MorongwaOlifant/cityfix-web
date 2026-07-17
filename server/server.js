require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report'); 
const { initializeDatabase, pool } = require('./db');

const app = express();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '5mb' }));

if (!process.env.JWT_SECRET && !process.env.ACCESS_TOKEN_SECRET) {
  throw new Error('JWT_SECRET or ACCESS_TOKEN_SECRET is required');
}

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('REFRESH_TOKEN_SECRET is required');
}

const connectionPromise = initializeDatabase()
.then(async () => {
  console.log('Connected to PostgreSQL');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const normalizedAdminEmail = adminEmail.trim().toLowerCase();
  const adminExists = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedAdminEmail]);
  if (adminExists.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await pool.query(
      `INSERT INTO users (id, full_name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)`,
      [crypto.randomUUID(), 'Administrator', normalizedAdminEmail, hashedPassword, 'admin']
    );
    console.log('Admin user created from ADMIN_EMAIL');
  }
})
.catch((err) => {
  console.error('PostgreSQL connection error:', err);
  throw err;
});

app.use(async (req, res, next) => {
  try {
    await connectionPromise;
    next();
  } catch (error) {
    next(error);
  }
});

// API Routes
app.use('/api', authRoutes);
app.use('/api/report', reportRoutes); 

// Test Route
app.get('/', (req, res) => {
  res.send('CityFix API is running...');
});

// Start Server
const PORT = process.env.PORT || 5050;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
