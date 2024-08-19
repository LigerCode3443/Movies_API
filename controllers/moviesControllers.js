import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as moviesServices from "../services/moviesServices.js";

const getAllMovies = async (_, res) => {
  const result = await moviesServices.getMovies();

  res.json(result);
};
const getOneMovie = async (req, res) => {
  const { id } = req.params;
  const result = await moviesServices.getMovieById(id);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

const addMovie = async (req, res) => {
  const result = await moviesServices.addMovie(req.body);

  res.status(201).json(result);
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  const result = await moviesServices.updateMovieById(id, req.body);

  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json(result);
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  const result = await moviesServices.deleteMovie(id);

  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json({ message: "Delete success" });
};

export default {
  getAllMovies: ctrlWrapper(getAllMovies),
  getOneMovie: ctrlWrapper(getOneMovie),
  addMovie: ctrlWrapper(addMovie),
  updateMovie: ctrlWrapper(updateMovie),
  deleteMovie: ctrlWrapper(deleteMovie),
};
