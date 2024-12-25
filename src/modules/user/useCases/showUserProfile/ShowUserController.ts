import { FastifyReply, FastifyRequest } from "fastify";
import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
  constructor(private showUserUseCase: ShowUserUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const userByRequest = req.user!;

    const user = await this.showUserUseCase.execute(userByRequest.id);

    return reply.status(200).send(user);
  }
}
