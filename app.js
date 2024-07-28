const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/movies', movieRoutes); // Use routes for API

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});