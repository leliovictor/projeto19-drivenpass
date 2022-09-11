import { Router } from "express";

import authRouter from "./auth.router.js";
import credentialRouter from "./credential.router.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);

export default router;
