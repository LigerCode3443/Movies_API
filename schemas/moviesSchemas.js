import Joi from "joi";

export const createContactSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  genres: Joi.string().required(),
  rating: Joi.string().required(),
  director: Joi.string().required(),
  poster: Joi.string().required(),
  release_date: Joi.string().required(),
  actors: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  genres: Joi.string(),
  rating: Joi.string(),
  director: Joi.string(),
  poster: Joi.string(),
  release_date: Joi.string(),
  actors: Joi.string(),
});
