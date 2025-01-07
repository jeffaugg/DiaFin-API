import { FastifyReply, FastifyRequest } from "fastify";
import { ShowCategoriesUseCase } from "./ShowCategoriesUseCase";

export class ShowCategoriesController {
  constructor(private showCategoriesUseCase: ShowCategoriesUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const user = req.user!;
    const categories = await this.showCategoriesUseCase.execute(user.id);

    return res.send(categories);
  }
}
