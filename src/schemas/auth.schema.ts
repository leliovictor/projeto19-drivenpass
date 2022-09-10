import joi from "joi";

const auth = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

export { auth };
