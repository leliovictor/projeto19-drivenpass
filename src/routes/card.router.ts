import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { validateToken } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/card.controller.js";
import * as schema from "../schemas/card.schema.js";


const cardRouter = Router();

cardRouter.post("/cards", validateToken, validateSchemaMiddleware(schema.card), controller.createCard);

cardRouter.get("/cards/:id", validateToken, controller.getCardById);

cardRouter.get("/cards", validateToken, controller.getCards);

cardRouter.delete("/cards/:id", validateToken, controller.deleteCard);

export default cardRouter;