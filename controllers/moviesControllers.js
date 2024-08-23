import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as moviesServices from "../services/moviesServices.js";
import path, { dirname } from "path";
import * as url from "url";
import fs from "fs/promises";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const moviesDir = path.join(__dirname, "../", "public", "movies");

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
  const { path: tempUpload, originalname } = req.file;

  const filename = `${Date.now()}_${originalname}`;
  const resultUpload = path.join(moviesDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const movieData = {
    ...req.body,
    poster: resultUpload,
  };
  const result = await moviesServices.addMovie(movieData);

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

const updateMovieByIdFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await moviesServices.updateMovieFavorite(id, { favorite });

  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

export default {
  getAllMovies: ctrlWrapper(getAllMovies),
  getOneMovie: ctrlWrapper(getOneMovie),
  addMovie: ctrlWrapper(addMovie),
  updateMovie: ctrlWrapper(updateMovie),
  deleteMovie: ctrlWrapper(deleteMovie),
  updateMovieByIdFavorite: ctrlWrapper(updateMovieByIdFavorite),
};
