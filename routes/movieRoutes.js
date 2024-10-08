const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Define routes and associate them with controller functions
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.addMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.get('/search', movieController.searchMovies);

module.exports = router;