import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

interface IDeleteCategoryParams {
  id: string;
}

export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const user = req.user!;
    const { id } = req.params as IDeleteCategoryParams;

    await this.deleteCategoryUseCase.execute(Number(id), user.id);

    return res.send({ message: "Category deleted" });
  }
}
