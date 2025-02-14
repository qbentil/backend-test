import Joi from "joi";

export const UserValidation = {
  new: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("PATIENT", "DOCTOR").required(),
  }),
  update: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string().valid("PATIENT", "DOCTOR"),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
