import { FastifyInstance } from "fastify";
import { CreateUserFactory } from "../../../../modules/user/factories/CreateUserFactory";

const createUserController = CreateUserFactory.create();

export async function userRoutes(app: FastifyInstance) {
    app.post("/signup", async (req, reply) => {
        return createUserController.handle(req, reply);
    });
}