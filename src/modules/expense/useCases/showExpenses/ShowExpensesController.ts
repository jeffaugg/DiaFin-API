import { FastifyReply, FastifyRequest } from "fastify";
import { ShowExpensesUseCase } from "./ShowExpensesUseCase";

export class ShowExpensesController {
  constructor(private showExpensesUseCase: ShowExpensesUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const userByRequest = req.user!;

    const expenses = await this.showExpensesUseCase.execute(userByRequest.id);

    return reply.status(200).send(expenses);
  }
}
