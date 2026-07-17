// routes/report.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { mapReport, pool } = require('../db');

// POST /api/report
router.post('/', authMiddleware, async (req, res) => {
  const category = String(req.body.category || '').trim();
  const description = String(req.body.description || '').trim();
  const location = String(req.body.location || '').trim();
  const imageUrl = req.body.imageUrl ? String(req.body.imageUrl).trim() : undefined;

  try {
    if (!category || !description || !location) {
      return res.status(400).json({ message: 'Category, location, and description are required' });
    }

    const result = await pool.query(
      `INSERT INTO reports (id, user_id, category, description, location, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [crypto.randomUUID(), req.user.userId, category, description, location, imageUrl || null]
    );

    const newReport = mapReport(result.rows[0]);

    res.status(201).json({
      message: 'Report submitted successfully',
      report: newReport,
    });
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).json({ message: 'Failed to submit report', error: err.message });
  }
});

// GET /api/report/my-reports
router.get('/my-reports', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    const reports = result.rows.map(mapReport);

    res.status(200).json({
      message: 'User reports fetched successfully',
      reports,
    });
  } catch (err) {
    console.error('Error fetching user reports:', err);
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
});

// GET /api/report/admin/reports (ADMIN ONLY)
router.get('/admin/reports', authMiddleware, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        reports.*,
        users.full_name AS user_full_name,
        users.email AS user_email
      FROM reports
      JOIN users ON users.id = reports.user_id
      ORDER BY reports.created_at DESC
    `);
    const reports = result.rows.map(mapReport);

    res.status(200).json({
      message: 'All reports fetched successfully',
      reports,
    });
  } catch (err) {
    console.error('Error fetching all reports:', err);
    res.status(500).json({ message: 'Failed to fetch all reports', error: err.message });
  }
});

// GET /api/report/admin/reports/:id (ADMIN ONLY)
router.get('/admin/reports/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        reports.*,
        users.full_name AS user_full_name,
        users.email AS user_email
      FROM reports
      JOIN users ON users.id = reports.user_id
      WHERE reports.id = $1`,
      [req.params.id]
    );

    const report = mapReport(result.rows[0]);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      message: 'Report fetched successfully',
      report,
    });
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ message: 'Failed to fetch report', error: err.message });
  }
});

// PATCH /api/report/admin/reports/:id/status (ADMIN ONLY)
router.patch('/admin/reports/:id/status', authMiddleware, isAdmin, async (req, res) => {
  const status = String(req.body.status || '').trim();
  const allowedStatuses = ['Pending', 'In Progress', 'Resolved'];

  try {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending, In Progress, or Resolved' });
    }

    const result = await pool.query(
      `UPDATE reports
       SET status = $1,
           updated_at = NOW(),
           resolved_at = CASE WHEN $1 = 'Resolved' THEN NOW() ELSE NULL END
       WHERE id = $2
       RETURNING *`,
      [status, req.params.id]
    );

    const report = mapReport(result.rows[0]);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      message: 'Report status updated successfully',
      report,
    });
  } catch (err) {
    console.error('Error updating report status:', err);
    res.status(500).json({ message: 'Failed to update report status', error: err.message });
  }
});

module.exports = router;
