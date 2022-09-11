import { Request, Response } from "express";

import * as service from "../services/auth.service.js";

export async function postSignup(_req: Request, res: Response) {
  const { body } = res.locals;

  await service.createUser(body);

  return res.sendStatus(201);
}

export async function postLogin(_req: Request, res: Response) {
  const { body } = res.locals;

  const token = await service.loginUser(body);

  return res.status(200).send(token);
}
