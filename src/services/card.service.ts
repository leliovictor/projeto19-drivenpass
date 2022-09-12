import Cryptr from "cryptr";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

import { cardRepository } from "../repositories/card.repository.js";

import { CreateCardParams, FindCardParams } from "../types/types.js";
import { AppError } from "../middlewares/error.handler.middleware.js";

const cryptr = new Cryptr(process.env.CRYPTR);

export async function createCard(data: CreateCardParams) {

  await checkTitleDuplicate(data.userId, data.title);

  const encrypted = encryptPasswordAndCVC(data.password, data.cvc);
  
  const newData = {
    userId: data.userId,
    title: data.title,
    card_number: data.card_number,
    name_in_card: data.name_in_card,
    expiration_date: data.expiration_date,
    isVirtual: data.isVirtual,
    type: data.type,
    password: encrypted.password,
    cvc: encrypted.cvc
  }

  const card = await cardRepository.registerCard(newData);

  return card;
}

const checkTitleDuplicate = async(userId: number, cardTitle: string) => {
  const title = await cardRepository.findByCardTitle(userId, cardTitle);
  if (title) {
    throw new AppError(
      409,
      "Title already exists",
      "Insert a new card title"
    )
  }
}

const encryptPasswordAndCVC = (password: string, cvc: string) => {
  const encrypted = {
    password: cryptr.encrypt(password),
    cvc: cryptr.encrypt(cvc)
  };
  return encrypted;
}

async function findCard(id: number) {
  const card = await cardRepository.findCardById(id);

  if(!card) {
    throw new AppError(
      404,
      "Card not found",
      "Ensure to provide a valid id"
    )
  }

  return card;
}

export async function getCardById(data: FindCardParams) {
  const card = await findCard(data.id);
  checkIfIsValidUser(data.userId, card.userId);

  delete card.userId;
  card.password = cryptr.decrypt(card.password);
  card.cvc = cryptr.decrypt(card.cvc);

  return card;
}

const checkIfIsValidUser = (tokenUserId: number, cardUserId: number) => {
  if (tokenUserId !== cardUserId) {
    throw new AppError(
      409,
      "Unauthorized user",
      "Ensure to provide a valid user"
    );
  }
}

export async function getCards(userId: number) {

  const cards = await cardRepository.findCards(userId);

  cards.forEach((card) => {
    delete card.userId;
  });
  cards.forEach(
    (card) => {
      card.password = cryptr.decrypt(card.password);
      card.cvc = cryptr.decrypt(card.cvc);
    }
  );

  return cards;
}

export async function deleteCard(data: FindCardParams) {
  const card = await findCard(data.id);
  checkIfIsValidUser(data.userId, card.userId);

  await cardRepository.deleteCardById(data.id);
}