import { prisma } from "../config/database.js";

import { CreateCardParams } from "../types/types.js";

async function registerCard(data: CreateCardParams) {
  return await prisma.card.create({data});
}

async function findByCardTitle(userId: number, cardTitle: string) {
  return await prisma.card.findFirst({
    where: {
      AND: [{ userId: userId }, { title: cardTitle }],
    },
  });
}

export async function findCardById(id: number) {
  return await prisma.card.findUnique({ where: { id } });
}

export async function findCards(userId: number) {
  return await prisma.card.findMany({ where: { userId } });
}

export async function deleteCardById(id: number) {
  return await prisma.card.delete({ where: { id } });
}

export const cardRepository = {
  registerCard,
  findByCardTitle,
  findCardById,
  findCards,
  deleteCardById
};
