const Movie = require('../models/movieModels');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    console.log('Fetching all movies');
    const movies = await Movie.find();
    console.log('Movies found:', movies);
    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get a specific movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      console.log('Movie found:', movie);
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  const { title, director, releaseYear, genre, castCount, duration, country } = req.body;

  const newMovie = new Movie({
    title,
    director,
    releaseYear,
    genre,
    castCount,
    duration,
    country,
  });

  try {
    const savedMovie = await newMovie.save();
    console.log('Movie added:', savedMovie);
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
  const { title, director, releaseYear, genre, castCount, duration, country } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, releaseYear, genre, castCount, duration, country },
      { new: true }
    );

    if (updatedMovie) {
      console.log('Movie updated:', updatedMovie);
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (deletedMovie) {
      console.log('Movie deleted:', deletedMovie);
      res.json({ message: 'Movie deleted' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ message: err.message });
  }
};

// Search for movies by title
exports.searchMovies = async (req, res) => {
  const searchTerm = req.query.search || '';

  try {
    const movies = await Movie.find({
      title: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search
    });

    console.log('Movies found:', movies);
    res.json(movies);
  } catch (err) {
    console.error('Error searching for movies:', err);
    res.status(500).json({ message: err.message });
  }
};