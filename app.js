require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRoutes = require('./app/routes/movieRoutes');
const connectDB = require('./config/database');
const path = require('path');

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Routes
app.use('/movies', movieRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;