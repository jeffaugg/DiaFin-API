import jwt from "jsonwebtoken";
import AuthConfig from "./AuthConfig";

export interface IPayload {
  id: number;
  email: string;
  name: string;
}

export async function CreateToken(payload: IPayload) {
  const token = jwt.sign(payload, AuthConfig.secret, {
    noTimestamp: true,
  });

  return {
    userToken: token,
  };
}
