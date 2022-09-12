import { prisma } from "../config/database.js";

import { CreateNetworkParams } from "../types/types.js";

export async function findFirstByTitleUserId(
  data: Omit<CreateNetworkParams, "name" | "password">
) {
  const { userId, title } = data;
  const select = await prisma.network.findFirst({
    where: {
      AND: [{ userId }, { title }],
    },
  });

  return select;
}
export async function registerNetwork(data: CreateNetworkParams) {
  return await prisma.network.create({ data });
}

export async function findById(id: number) {
  return await prisma.network.findUnique({ where: { id } });
}

export async function findManyByUserId(userId: number) {
  return await prisma.network.findMany({ where: { userId } });
}

export async function deleteById(id: number) {
  return await prisma.network.delete({ where: { id } });
}
