import joi from "joi";
import { CardParams } from '../types/types.js';

const card = joi.object<CardParams>({
  title: joi.string().required(),
  card_number: joi.string().pattern(/^[0-9]*$/).required(),
  password: joi.string().min(4).max(4).required(),
  name_in_card: joi.string().pattern(/^[A-Z\s]*$/).required(),
  cvc: joi.string().pattern(/^[0-9]{3}$/).required(),
  expiration_date: joi.string().pattern(/^[0-9]{2}\/[0-9]{4}$/).length(7).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid('credit', 'debit', 'both').required(),
});

export { card };
