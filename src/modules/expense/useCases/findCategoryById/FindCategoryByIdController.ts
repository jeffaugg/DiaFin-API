import { FastifyReply, FastifyRequest } from "fastify";
import { FindCategoryByIdUseCase } from "./FindCategoryByIdUseCase";

interface IFindCategoryByIdParams {
  id: string;
}

export class FindCategoryByIdController {
  constructor(private findCategoryByIdUseCase: FindCategoryByIdUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const user = req.user!;
    const { id } = req.params as IFindCategoryByIdParams;
    const category = await this.findCategoryByIdUseCase.execute(
      Number(id),
      user.id,
    );

    return res.send(category);
  }
}
