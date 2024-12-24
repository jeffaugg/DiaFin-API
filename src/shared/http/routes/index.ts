import { FastifyInstance } from "fastify";
import { userRoutes } from "./api/userRoutes";

export async function Routes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/user" });
}
