import { FindNote, NoteParams } from "../types/types.js";
import { AppError } from "../middlewares/error.handler.middleware.js";

import * as repository from "../repositories/note.repository.js";

async function checkTitleDuplicate(data: Omit<NoteParams, "note">) {
  const note = await repository.findFirstByTitleUserId(data);

  if (note) {
    throw new AppError(
      409,
      "Title already in use",
      "Ensure to provide a unique title per user"
    );
  }
}

export async function createNote(data: NoteParams) {
  await checkTitleDuplicate({ userId: data.userId, title: data.title });

  await repository.registerNote(data);
}

async function findNoteById(id: number) {
  const note = await repository.findById(id);

  if (!note) {
    throw new AppError(404, "Note not found", "Ensure to provide a valid id");
  }

  return note;
}

function validUser(tokenUserId: number, noteUserId: number) {
  if (tokenUserId !== noteUserId) {
    throw new AppError(
      409,
      "Unauthorized user",
      "Ensure to provide a valid user"
    );
  }
}

export async function getNoteById(data: FindNote) {
  const note = await findNoteById(+data.noteId);
  validUser(data.userId, note.userId);

  delete note.userId;

  return note;
}

export async function getUserNotes(userId: number) {
  const userNotes = await repository.findManyByUserId(userId);

  userNotes.forEach((note) => {
    delete note.userId;
  });

  return userNotes;
}

export async function deleteNote(data: FindNote) {
    const note = await findNoteById(+data.noteId);
    validUser(data.userId, note.userId);
  
    await repository.deleteById(+data.noteId);
  }