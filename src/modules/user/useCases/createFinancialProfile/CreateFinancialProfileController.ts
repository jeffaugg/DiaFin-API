import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialProfileDTO } from "../../dtos/FinancialProfileDTO";
import { CreateFinancialProfileUseCase } from "./CreateFinancialProfileUseCase";

export class CreateFinancialProfileController {
  constructor(
    private createFinancialProfileUseCase: CreateFinancialProfileUseCase,
  ) {}

  async handle(req: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const data = FinancialProfileDTO.parse(req.body);

    const financialProfile =
      await this.createFinancialProfileUseCase.execute(data);

    return reply.status(201).send(financialProfile);
  }
}
