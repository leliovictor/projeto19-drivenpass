import joi from "joi";

const network = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required(),
});

export { network };