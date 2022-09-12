import joi from "joi";

const note = joi.object({
  title: joi.string().max(50).required(),
  note: joi.string().max(1000).required(),
});

export { note };