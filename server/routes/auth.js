const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { mapUser, pool } = require('../db');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createTokens(user) {
  const payload = { userId: user.id, role: user.role };
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error('Authentication secrets are not configured');
  }

  return {
    accessToken: jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' }),
    refreshToken: jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' }),
  };
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role,
  };
}

// POST /api/register
router.post('/register', async (req, res) => {
  const fullName = String(req.body.fullName || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const result = await pool.query(
      `INSERT INTO users (id, full_name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, fullName, email, hashedPassword]
    );

    const newUser = mapUser(result.rows[0]);
    const { accessToken, refreshToken } = createTokens(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      token: accessToken,
      user: publicUser(newUser),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = mapUser(result.rows[0]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = createTokens(user);

    // 5. Respond with both tokens
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: publicUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// POST /api/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

  if (!accessTokenSecret || !process.env.REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: 'Authentication is not configured' });
  }

  // 1. Check if token was sent
  if (!refreshToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // 2. Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      accessTokenSecret,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  });
});

// GET /api/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, email, role, created_at, updated_at FROM users WHERE id = $1',
      [req.user.userId]
    );
    const user = mapUser(result.rows[0]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

// GET /api/admin/users (ADMIN ONLY)
router.get('/admin/users', authMiddleware, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        users.id,
        users.full_name,
        users.email,
        users.role,
        users.created_at,
        users.updated_at,
        COUNT(reports.id)::int AS report_count,
        COUNT(reports.id) FILTER (WHERE reports.status = 'Pending')::int AS pending_count,
        COUNT(reports.id) FILTER (WHERE reports.status = 'In Progress')::int AS in_progress_count,
        COUNT(reports.id) FILTER (WHERE reports.status = 'Resolved')::int AS resolved_count,
        MAX(reports.created_at) AS last_report_at
      FROM users
      LEFT JOIN reports ON reports.user_id = users.id
      GROUP BY users.id, users.full_name, users.email, users.role, users.created_at, users.updated_at
      ORDER BY users.created_at DESC
    `);

    const users = result.rows.map((row) => ({
      ...mapUser(row),
      reportCount: row.report_count || 0,
      pendingCount: row.pending_count || 0,
      inProgressCount: row.in_progress_count || 0,
      resolvedCount: row.resolved_count || 0,
      lastReportAt: row.last_report_at,
    }));

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

module.exports = router;
