import { Request, Response } from "express";

import * as service from "../services/credential.service.js";

export async function postCredential(_req: Request, res: Response) {
  const { userId } = res.locals.data;
  const body = res.locals.body;
  
  await service.createCredential({...body, userId});

  return res.sendStatus(201);
}

export async function getById(req: Request, res: Response) {
  const { userId } = res.locals.data;
  const {id: credentialId} = req.params;

  const credential = await service.getCredentialById({userId, credentialId});

  return res.status(200).send(credential);
}

export async function getCredentials(_req: Request, res: Response) {
  const { userId } = res.locals.data;

  const credentials = await service.getUserCredentials(userId);

  return res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const {userId} = res.locals.data;
  const {id: credentialId} = req.params;

  await service.deleteCredential({userId, credentialId});

  return res.sendStatus(200);
}
