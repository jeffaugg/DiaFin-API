import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoryDTO } from "../../dtos/CategoryDTO";

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const user = req.user!;
    const data = CategoryDTO.parse({
      ...(req.body as CreateCategoryRequest),
      userId: user.id,
    });
    const category = await this.createCategoryUseCase.execute(data, user.id);
    return res.status(201).send(category);
  }
}
