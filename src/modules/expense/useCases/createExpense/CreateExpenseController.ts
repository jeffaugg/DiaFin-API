import { FastifyReply, FastifyRequest } from "fastify";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

export class CreateExpenseController {
  constructor(private createExpenseUseCase: CreateExpenseUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const userId = req.user!.id;
    const data = ExpenseDTO.parse(req.body);
    const expense = await this.createExpenseUseCase.execute(data, userId);
    return res.send(expense);
  }
}
