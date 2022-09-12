import { Request, Response } from "express";

import * as service from "../services/network.service.js";

export async function postNetwork(_req: Request, res: Response) {
  const { userId } = res.locals.data;
  const body = res.locals.body;
  
  await service.createNetwork({...body, userId});

  return res.sendStatus(201);
}

export async function getNetworkById(req: Request, res: Response) {
    const { userId } = res.locals.data;
    const { id } = req.params;
    
    const network = await service.getNetworkById({userId, id:+id});
    
    return res.status(200).send(network);
}

export async function getNetworks(_req: Request, res: Response) {
    const { userId } = res.locals.data;
    
    const networks = await service.getUserNetworks(userId);
    
    return res.status(200).send(networks);
}

export async function deleteNetwork(req: Request, res: Response) {
  const {userId} = res.locals.data;
  const {id} = req.params;

  await service.deleteNetwork({userId, id:+id});

  return res.sendStatus(200);
}
