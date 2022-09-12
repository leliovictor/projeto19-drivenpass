import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { validateToken } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/credential.controller.js";
import * as schema from "../schemas/credential.schema.js";


const credentialRouter = Router();

credentialRouter.post("/credentials", validateSchemaMiddleware(schema.credential), validateToken, controller.postCredential);

credentialRouter.get("/credentials/:id", validateToken, controller.getById);
credentialRouter.get("/credentials", validateToken, controller.getCredentials);
credentialRouter.delete("/credentials/:id", validateToken, controller.deleteCredential);

export default credentialRouter;