import { Router } from "express";
import moviesControllers from "../controllers/moviesControllers.js";
import validateBody from "../decorators/validateBody.js";

import isValidId from "../middlewares/isValidId.js";
import {
  createMovieSchema,
  updateMovieSchema,
  updateMovieSchemaFavorite,
} from "../schemas/moviesSchemas.js";
import upload from "../middlewares/upload.js";

const addMiddleware = validateBody(createMovieSchema);
const updateMiddleware = validateBody(updateMovieSchema);
const updateMiddlewareFavorite = validateBody(updateMovieSchemaFavorite);

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getAllMovies);
moviesRouter.get("/:id", isValidId, moviesControllers.getOneMovie);
moviesRouter.post(
  "/",

  upload.single("poster"),
  moviesControllers.addMovie
);
moviesRouter.put(
  "/:id",
  isValidId,
  updateMiddleware,
  moviesControllers.updateMovie
);
moviesRouter.delete("/:id", isValidId, moviesControllers.deleteMovie);

moviesRouter.patch(
  "/:id/favorite",
  isValidId,
  updateMiddlewareFavorite,
  moviesControllers.updateMovieByIdFavorite
);

export default moviesRouter;
