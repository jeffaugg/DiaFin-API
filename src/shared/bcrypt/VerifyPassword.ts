import { compare } from "bcryptjs";

export async function VerifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}