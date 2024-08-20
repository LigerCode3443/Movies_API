import { Schema, model } from "mongoose";
import { handelSaveError, setUpdateOptions } from "./hooks.js";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    poster: {},
    release_date: {
      type: String,
      required: true,
    },
    actors: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

movieSchema.post("save", handelSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateOptions);

movieSchema.post("findOneAndUpdate", handelSaveError);

const Movies = model("movie", movieSchema);

export default Movies;
