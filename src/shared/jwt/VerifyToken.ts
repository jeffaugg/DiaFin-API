import jwt from "jsonwebtoken";
import AuthConfig from "./AuthConfig";
import { AppError } from "../../config/erro/AppError";

export interface IUserPayload {
  id: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export async function VerifyToken(token: string) {
  try {
    const user = jwt.verify(token, AuthConfig.secret) as IUserPayload;
    const { iat, exp, ...simpleUser } = user;
    return simpleUser;
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
