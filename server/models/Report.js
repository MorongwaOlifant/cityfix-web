// server/models/Report.js

const mongoose = require('mongoose');

// Define the report schema
const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // reference to the user
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Pothole', 'Street Light', 'Water Leak', 'Illegal Dumping', 'Other'],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String, // e.g., address or landmark
    required: true,
  },
  imageUrl: {
    type: String, // optional image URL
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Export the model
module.exports = mongoose.model('Report', reportSchema);