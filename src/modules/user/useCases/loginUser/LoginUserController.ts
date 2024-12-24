import { FastifyReply, FastifyRequest } from "fastify";
import { LoginDTO } from "./LoginDTO";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply): Promise<Response> {
    const data = LoginDTO.parse(req.body);

    const token = await this.loginUserUseCase.execute(data);

    return reply.status(200).send(token);
  }
}
