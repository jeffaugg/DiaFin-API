import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";

interface IUpdateExpenseParams {
  id: string;
}

export class updatedExpenseController {
  constructor(private updateExpenseUseCase: UpdateExpenseUseCase) {}

  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<Response> {
    const userByRequest = request.user!;

    const { id } = request.params as IUpdateExpenseParams;
    const data = ExpenseDTO.parse(request.body);

    const expense = await this.updateExpenseUseCase.execute(
      Number(id),
      userByRequest.id,
      data,
    );

    return response.status(200).send(expense);
  }
}
