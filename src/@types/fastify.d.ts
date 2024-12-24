import "fastify";
import { IUserPayload } from "../shared/jwt/VerifyToken";
declare module "fastify" {
  interface FastifyRequest {
    user?: IUserPayload;
  }
}
