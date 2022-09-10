import bcrypt, { hash } from "bcrypt";

import { Auth } from "../types/types.js";
import { AppError } from "../middlewares/error.handler.middleware.js";

import * as repository from "../repositories/auth.repository.js";

async function checkEmailDuplicate(email: string) {
  const findEmail = await repository.findByEmail(email);

  if (findEmail) {
    throw new AppError(
      409,
      "Email already registered",
      "Ensure to provide an email address that is not already in use"
    );
  }
}

export async function createUser(body: Auth) {
  await checkEmailDuplicate(body.email);

  const passwordCript = bcrypt.hashSync(body.password, 10);

  await repository.registerUser({email:body.email, password:passwordCript});
}
