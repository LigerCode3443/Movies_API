import Movies from "../models/Movie.js";

export const getMovies = () => Movies.find({}, "-createdAt -updatedAt");

export const getMovieById = (id) => Movies.findById(id);

export const addMovie = (data) => Movies.create(data);

export const updateMovieById = (id, data) => Movies.findByIdAndUpdate(id, data);

export const deleteMovie = (id) => Movies.findByIdAndDelete(id);

export const updateMovieFavorite = (id, data) =>
  Movies.findByIdAndUpdate(id, data);
