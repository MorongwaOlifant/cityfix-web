// routes/report.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// POST /api/report
router.post('/', authMiddleware, async (req, res) => {
  const { category, description, location, imageUrl } = req.body;

  try {
    const newReport = new Report({
      user: req.user.userId,
      category,
      description,
      location,
      imageUrl,
    });

    await newReport.save();

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
    const reports = await Report.find({ user: req.user.userId }).sort({ createdAt: -1 });

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
    const reports = await Report.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'All reports fetched successfully',
      reports,
    });
  } catch (err) {
    console.error('Error fetching all reports:', err);
    res.status(500).json({ message: 'Failed to fetch all reports', error: err.message });
  }
});

module.exports = router;