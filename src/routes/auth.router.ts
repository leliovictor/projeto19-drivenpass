import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";

import * as controller from "../controllers/auth.controller.js";
import * as schema from "../schemas/auth.schema.js";


const authRouter = Router();

authRouter.post("/login", validateSchemaMiddleware(schema.auth),controller.postLogin);

authRouter.post("/signup", validateSchemaMiddleware(schema.auth), controller.postSignup)

export default authRouter;