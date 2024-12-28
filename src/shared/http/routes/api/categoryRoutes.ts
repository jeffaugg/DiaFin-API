import { FastifyInstance } from "fastify";
import { CreateCategoryFactory } from "../../../../modules/expense/factories/CreateCategoryFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { ShowCategoriesFactory } from "../../../../modules/expense/factories/ShowCategoriesFactory";
import { FindCategoryByIdFactory } from "../../../../modules/expense/factories/FindCategoryByIdFactory";
import { DeleteCategoryFactory } from "../../../../modules/expense/factories/DeleteCategoryFactory";

const createCategoryController = CreateCategoryFactory.create();
const showCategoriesController = ShowCategoriesFactory.create();
const findCategoryByIdController = FindCategoryByIdFactory.create();
const deleteCategoryController = DeleteCategoryFactory.create();
export async function categoryRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return createCategoryController.handle(req, reply);
  });

  app.get("/", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return showCategoriesController.handle(req, reply);
  });

  app.get("/:id", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return findCategoryByIdController.handle(req, reply);
  });

  app.delete("/:id", { preHandler: [isAuthenticate] }, async (req, reply) => {
    return deleteCategoryController.handle(req, reply);
  });
}
