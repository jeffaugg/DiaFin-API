import { FastifyInstance } from "fastify";
import {
  ExpenseDTO,
  expenseResponse,
} from "../../../../modules/expense/dtos/ExpenseDTO";
import z from "zod";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { CreateExpenseFactory } from "../../../../modules/expense/factories/CreateExpenseFactory";

const createExpenseController = CreateExpenseFactory.create();
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
}
