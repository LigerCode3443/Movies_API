import { Router } from "express";
import moviesControllers from "../controllers/moviesControllers.js";
import validateBody from "../decorators/validateBody.js";

import isValidId from "../middlewares/isValidId.js";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../schemas/moviesSchemas.js";

const addMiddleware = validateBody(createMovieSchema);
const updateMiddleware = validateBody(updateMovieSchema);

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getAllMovies);
moviesRouter.get("/:id", isValidId, moviesControllers.getOneMovie);
moviesRouter.post("/", addMiddleware, moviesControllers.addMovie);
moviesRouter.put(
  "/:id",
  isValidId,
  updateMiddleware,
  moviesControllers.updateMovie
);
moviesRouter.delete("/:id", isValidId, moviesControllers.deleteMovie);

export default moviesRouter;
