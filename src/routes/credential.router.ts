import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/credential.controller.js";
import * as schema from "../schemas/credential.schema.js";


const credentialRouter = Router();

credentialRouter.post("/credentials", validateSchemaMiddleware(schema.credential), checkAuthentication, controller.postCredential);

export default credentialRouter;