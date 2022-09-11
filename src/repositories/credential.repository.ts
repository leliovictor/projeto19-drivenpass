import { prisma } from "../config/database.js";

import { Credential } from "../types/types.js";

export async function findFirstByTitleUserId(
  data: Omit<Credential, "username" | "password" | "url">
) {
  const { userId, title } = data;
  const select = await prisma.credential.findFirst({
    where: {
      AND: [{ userId }, { title }],
    },
  });

  return select;
}

export async function registerCredential(data: Credential) {
  return await prisma.credential.create({ data });
}
