import { Request, Response, NextFunction } from "express";

import { AppError } from "../middlewares/error.handler.middleware.js";

import jwt from "jsonwebtoken";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw new AppError(
      401,
      "Missing token",
      "Ensure to provide the required token"
    );
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.data = data;
  } catch (error) {
    throw new AppError(401, "Invalid token", error);
  }

  next();
}
