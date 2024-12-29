import { FastifyInstance } from "fastify";
import { CreateCategoryFactory } from "../../../../modules/expense/factories/CreateCategoryFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { ShowCategoriesFactory } from "../../../../modules/expense/factories/ShowCategoriesFactory";
import { FindCategoryByIdFactory } from "../../../../modules/expense/factories/FindCategoryByIdFactory";
import { DeleteCategoryFactory } from "../../../../modules/expense/factories/DeleteCategoryFactory";
import { CategoryDTO } from "../../../../modules/expense/dtos/CategoryDTO";
import z from "zod";

const createCategoryController = CreateCategoryFactory.create();
const showCategoriesController = ShowCategoriesFactory.create();
const findCategoryByIdController = FindCategoryByIdFactory.create();
const deleteCategoryController = DeleteCategoryFactory.create();
export async function categoryRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Category"],
        description: "Create category",
        body: CategoryDTO.omit({ userId: true }),
        response: {
          201: CategoryDTO,
          400: z.object({
            statusCode: z.literal(400),
            message: z.literal("Category already exists"),
          }),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return createCategoryController.handle(req, reply);
    },
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Category"],
        description: "List all categories",
        response: {
          200: z.array(CategoryDTO),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return showCategoriesController.handle(req, reply);
    },
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Category"],
        description: "Find category by id",
        response: {
          200: CategoryDTO,
          404: z
            .object({
              statusCode: z.literal(404),
              message: z.literal("Category not found"),
            })
            .describe("Category not found"),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return findCategoryByIdController.handle(req, reply);
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Category"],
        description: "Delete category",
        response: {
          200: z.object({ message: z.literal("Category deleted") }),
          404: z.object({
            statusCode: z.literal(404),
            message: z.literal("Category not found"),
          }),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return deleteCategoryController.handle(req, reply);
    },
  );
}
