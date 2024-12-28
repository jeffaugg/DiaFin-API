import { FastifyInstance } from "fastify";
import { userRoutes } from "./api/userRoutes";
import { categoryRoutes } from "./api/categoryRoutes";

export async function Routes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/user" });
  app.register(categoryRoutes, { prefix: "/category" });
}
