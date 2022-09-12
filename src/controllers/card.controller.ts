import { Request, Response } from "express";

import * as service from "../services/card.service.js";

import { CardParams } from "../types/types.js";
import { Card } from '@prisma/client';

export async function createCard(_req: Request, res: Response) {
  const userId: number = res.locals.data.userId;
  const body: CardParams = res.locals.body;
  
  await service.createCard({...body, userId});

  return res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {
  const userId: number = res.locals.data.userId;  
  const id: string = req.params.id;

  const card: Card = await service.getCardById({userId, id:+id});

  return res.status(200).send(card);
}

export async function getCards(_req: Request, res: Response) {
  const userId: number = res.locals.data.userId;
  
  const cards: Card[] = await service.getCards(userId);
  
  return res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const userId: number = res.locals.data.userId;
  const id: string = req.params.id;

  await service.deleteCard({userId, id:+id});

  return res.sendStatus(200);
}
