import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  await repository.registerUser({ email: body.email, password: passwordCript });
}

export async function findUser(email: string) {
  const user = await repository.findByEmail(email);

  if (!user) {
    throw new AppError(
      401,
      "E-mail or Password incorrect!",
      "Ensure to provide a valid user/password"
    );
  }

  return user;
}

export function comparePassword(
  bodyPassword: string,
  userPassword: string
) {
  const valid = bcrypt.compareSync(bodyPassword, userPassword);

  if (!valid) {
    throw new AppError(
      401,
      "E-mail or Password incorrect!",
      "Ensure to provide a valid user/password"
    );
  }
}

function createToken(id: number) {
    const TIME_60M = 60 * 60;
  const secretKey = process.env.JWT_SECRET;
  const data = { id };

  const token = jwt.sign(data, secretKey, { expiresIn: TIME_60M });


    return token;
}

export async function loginUser(body: Auth) {
  const user = await findUser(body.email);
  comparePassword(body.password, user.password);

  const token = createToken(user.id);

  return token;;
}
