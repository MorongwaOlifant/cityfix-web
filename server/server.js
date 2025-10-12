const express = require('express');
const app = express();

// Placeholder middleware
app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});