// server/models/User.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Emails must be unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('User', userSchema);