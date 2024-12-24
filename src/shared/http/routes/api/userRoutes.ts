import { FastifyInstance } from "fastify";
import { CreateUserFactory } from "../../../../modules/user/factories/CreateUserFactory";
import { LoginUserFactory } from "../../../../modules/user/factories/LoginUserFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";

const createUserController = CreateUserFactory.create();
const loginUserController = LoginUserFactory.create();
export async function userRoutes(app: FastifyInstance) {
  app.post("/signup", async (req, reply) => {
    return createUserController.handle(req, reply);
  });

  app.post("/signin", async (req, reply) => {
    return loginUserController.handle(req, reply);
  });

  app.get("/me", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return reply.send(req.user);
  });
}
