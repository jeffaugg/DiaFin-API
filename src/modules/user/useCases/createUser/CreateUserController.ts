import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { FastifyRequest, FastifyReply } from 'fastify';

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    async handle(req: FastifyRequest, reply: FastifyReply): Promise<Response> {
        const data = UserDTO.parse(req.body);;

        const user = await this.createUserUseCase.execute(data);

        return reply.status(201).send(user);
    }
}