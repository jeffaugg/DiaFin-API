import { FastifyReply, FastifyRequest } from "fastify";
import { VerifyToken } from "../../jwt/VerifyToken";

export async function isAuthenticate(req: FastifyRequest, res: FastifyReply) {
  const rawToken = req.headers.authorization;
  const token = rawToken?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token is required" });
  }

  const user = await VerifyToken(token);

  if (!user) {
    return res.status(401).send({ message: "Invalid token" });
  }

  req.user = user;
}
