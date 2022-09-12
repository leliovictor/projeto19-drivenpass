import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { validateToken } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/note.controller.js";
import * as schema from "../schemas/note.schema.js";


const noteRouter = Router();

noteRouter.post("/notes", validateSchemaMiddleware(schema.note), validateToken, controller.postNote);

noteRouter.get("/notes/:id", validateToken, controller.getNoteById);

noteRouter.get("/notes", validateToken, controller.getNotes);

noteRouter.delete("/notes/:id", validateToken, controller.deleteNote);

export default noteRouter;