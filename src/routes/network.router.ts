import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { validateToken } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/network.controller.js";
import * as schema from "../schemas/network.schema.js";


const networkRouter = Router();

networkRouter.post("/networks", validateSchemaMiddleware(schema.network), validateToken, controller.postNetwork);

networkRouter.get("/networks/:id", validateToken, controller.getNetworkById);

networkRouter.get("/networks", validateToken, controller.getNetworks);

networkRouter.delete("/networks/:id", validateToken, controller.deleteNetwork);

export default networkRouter; 