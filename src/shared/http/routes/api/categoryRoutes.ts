import { FastifyInstance } from "fastify";
import { CreateCategoryFactory } from "../../../../modules/expense/factories/CreateCategoryFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";

const createCategoryController = CreateCategoryFactory.create();
export async function categoryRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return createCategoryController.handle(req, reply);
  });
}
