import { Request, Response } from "express";

import * as service from "../services/note.service.js";

export async function postNote(_req: Request, res: Response) {
  const { userId } = res.locals.data;
  const body = res.locals.body;
  
  await service.createNote({...body, userId});

  return res.sendStatus(201);
}

export async function getNoteById(req: Request, res: Response) {
  const { userId } = res.locals.data;
  const {id: noteId} = req.params;

  const note = await service.getNoteById({userId, noteId});

  return res.status(200).send(note);
}

export async function getNotes(_req: Request, res: Response) {
  const { userId } = res.locals.data;
  
  const notes = await service.getUserNotes(userId);
  
  return res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
  const {userId} = res.locals.data;
  const {id: noteId} = req.params;

  await service.deleteNote({userId, noteId});

  return res.sendStatus(200);
}
