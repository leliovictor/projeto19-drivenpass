import { Router } from "express";

import authRouter from "./auth.router.js";
import credentialRouter from "./credential.router.js";
import noteRouter from "./note.router.js";
import cardRouter from "./card.router.js";
import networkRouter from "./network.router.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);
router.use(networkRouter);

export default router;
