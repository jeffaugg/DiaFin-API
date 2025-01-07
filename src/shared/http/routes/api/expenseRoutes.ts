import { FastifyInstance } from "fastify";
import {
  ExpenseDTO,
  expenseResponse,
} from "../../../../modules/expense/dtos/ExpenseDTO";
import z from "zod";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { CreateExpenseFactory } from "../../../../modules/expense/factories/CreateExpenseFactory";
import { ShowExpensesFactory } from "../../../../modules/expense/factories/ShowExpensesFactory";
import { UpdateExpenseFactory } from "../../../../modules/expense/factories/UpdateExpenseFactory";

const createExpenseController = CreateExpenseFactory.create();
const showExpensesFactory = ShowExpensesFactory.create();
const updateExpenseController = UpdateExpenseFactory.create();
export async function expenseRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Expense"],
        description: "Create expense",
        body: ExpenseDTO,
        response: {
          201: expenseResponse,
          400: z.object({
            status: z.string(),
            message: z.literal("Category not found"),
          }),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return createExpenseController.handle(req, reply);
    },
  );

  app.get("/", {
    schema: {
      tags: ["Expense"],
      description: "List expenses",
      response: {
        200: z.array(expenseResponse),
      },
    },
    preHandler: [isAuthenticate],
    handler: async (req, reply) => {
      return showExpensesFactory.handle(req, reply);
    },
  });

  app.put("/:id", {
    schema: {
      tags: ["Expense"],
      description: "Update expense",
      params: z.object({
        id: z.string(),
      }),
      body: ExpenseDTO,
      response: {
        200: expenseResponse,
        404: z
          .object({
            status: z.string(),
            message: z.union([
              z.literal("Expense not found"),
              z.literal("Category not found"),
              z.literal("User not found"),
            ]),
          })
          .describe("expense || category || user not found"),
      },
    },
    preHandler: [isAuthenticate],
    handler: async (req, reply) => {
      return updateExpenseController.handle(req, reply);
    },
  });
}
