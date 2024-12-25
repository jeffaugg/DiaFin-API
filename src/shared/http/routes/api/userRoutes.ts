import { FastifyInstance } from "fastify";
import { LoginUserFactory } from "../../../../modules/user/factories/LoginUserFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { CreateUserFactory } from "../../../../modules/user/factories/CreateUserFactory";
import { CreateFinancialProfileFactory } from "../../../../modules/user/factories/CreateFinancialProfileFactory";
import { ShowUserFactory } from "../../../../modules/user/factories/ShowUserFactory";

const createUserController = CreateUserFactory.create();
const loginUserController = LoginUserFactory.create();
const profileUserController = CreateFinancialProfileFactory.create();
const showUserController = ShowUserFactory.create();
export async function userRoutes(app: FastifyInstance) {
  app.post("/signup", async (req, reply) => {
    return createUserController.handle(req, reply);
  });

  app.post("/signin", async (req, reply) => {
    return loginUserController.handle(req, reply);
  });

  app.get("/me", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return showUserController.handle(req, reply);
  });

  app.post("/profile", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return profileUserController.handle(req, reply);
  });
}
