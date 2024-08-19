import { Router } from "express";
import moviesControllers from "../controllers/moviesControllers.js";
import validateBody from "../decorators/validateBody.js";

import isValidId from "../middlewares/isValidId.js";

const addMiddleware = validateBody();
const updateMiddleware = validateBody();

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
