import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";

interface IDeleteExpenseParams {
  id: string;
}

export class DeleteExpenseController {
  constructor(private deleteExpenseUseCase: DeleteExpenseUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const userId = req.user!.id;
    const { id } = req.params as IDeleteExpenseParams;
    await this.deleteExpenseUseCase.execute(Number(id), userId);
    return res.send();
  }
}
