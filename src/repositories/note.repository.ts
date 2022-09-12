import { prisma } from "../config/database.js";

import { NoteParams } from "../types/types.js";

export async function findFirstByTitleUserId(
  data: Omit<NoteParams, "note">
) {
  const { userId, title } = data;
  const select = await prisma.note.findFirst({
    where: {
      AND: [{ userId }, { title }],
    },
  });

  return select;
}

export async function registerNote(data: NoteParams) {
  return await prisma.note.create({data});
}

export async function findById(id: number) {
  return await prisma.note.findUnique({where: {id}});
}

export async function findManyByUserId(userId: number) {
  return await prisma.note.findMany({where: {userId}});
}

export async function deleteById(id: number) {
  return await prisma.note.delete({where: {id}});
}