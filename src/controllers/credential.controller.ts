import { Request, Response } from "express";

import * as service from "../services/credential.service.js";

export async function postCredential(_req: Request, res: Response) {
  const { userId } = res.locals.data;
  const body = res.locals.body;
  
  await service.createCredential({...body, userId});

  return res.sendStatus(201);
}
