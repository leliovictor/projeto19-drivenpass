import Cryptr from "cryptr";

import { FindNetworkParams, CreateNetworkParams } from "../types/types.js";
import { AppError } from "../middlewares/error.handler.middleware.js";

import * as repository from "../repositories/network.repository.js";

const cryptr = new Cryptr(process.env.CRYPTR);

async function checkTitleDuplicate(
  data: Omit<CreateNetworkParams, "name" | "password">
) {
  const network = await repository.findFirstByTitleUserId(data);

  if (network) {
    throw new AppError(
      409,
      "Network title already in use",
      "Ensure to provide a unique title per user"
    );
  }
}

export async function createNetwork(data: CreateNetworkParams) {
  await checkTitleDuplicate({ userId: data.userId, title: data.title });

  const passwordCript = cryptr.encrypt(data.password);
  await repository.registerNetwork({ ...data, password: passwordCript });
}

async function findNetworkById(id: number) {
  const network = await repository.findById(id);

  if (!network) {
    throw new AppError(
      404,
      "Network not found",
      "Ensure to provide a valid id"
    );
  }

  return network;
}

function validUser(tokenUserId: number, networkUserId: number) {
  if (tokenUserId !== networkUserId) {
    throw new AppError(
      409,
      "Unauthorized user",
      "Ensure to provide a valid user"
    );
  }
}

export async function getNetworkById(data: FindNetworkParams) {
  const network = await findNetworkById(data.id);
  validUser(data.userId, network.userId);

  delete network.userId;

  network.password = cryptr.decrypt(network.password);

  return network;
}

export async function getUserNetworks(userId: number) {
  const userNetworks = await repository.findManyByUserId(userId);

  userNetworks.forEach((network) => {
    delete network.userId;
  });

  userNetworks.forEach(
    (network) => (network.password = cryptr.decrypt(network.password))
  );

  return userNetworks;
}

export async function deleteNetwork(data: FindNetworkParams) {
  const network = await findNetworkById(data.id);
  validUser(data.userId, network.userId);

  await repository.deleteById(data.id);
}
