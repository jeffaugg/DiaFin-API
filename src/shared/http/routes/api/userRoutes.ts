import { FastifyInstance } from "fastify";
import { LoginUserFactory } from "../../../../modules/user/factories/LoginUserFactory";
import { isAuthenticate } from "../../middlewares/isAuthenticate";
import { CreateUserFactory } from "../../../../modules/user/factories/CreateUserFactory";
import { CreateFinancialProfileFactory } from "../../../../modules/user/factories/CreateFinancialProfileFactory";
import { ShowUserFactory } from "../../../../modules/user/factories/ShowUserFactory";
import z from "zod";
import { LoginDTO } from "../../../../modules/user/useCases/loginUser/LoginDTO";
import { UserDTO, userResponse } from "../../../../modules/user/dtos/UserDTO";
import {
  FinancialProfileDTO,
  financialProfileResponse,
} from "../../../../modules/user/dtos/FinancialProfileDTO";

const createUserController = CreateUserFactory.create();
const loginUserController = LoginUserFactory.create();
const profileUserController = CreateFinancialProfileFactory.create();
const showUserController = ShowUserFactory.create();
export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/signup",
    {
      schema: {
        tags: ["User"],
        description: "Create user",
        body: UserDTO,
        response: {
          201: userResponse.omit({ financialProfile: true }),
          409: z.object({
            statusCode: z.literal(409),
            message: z.literal("User already exists"),
          }),
        },
      },
    },
    async (req, reply) => {
      return createUserController.handle(req, reply);
    },
  );

  app.post(
    "/signin",
    {
      schema: {
        tags: ["User"],
        description: "Login user",
        body: LoginDTO,
        response: {
          200: z.object({
            userToken: z.string(),
          }),
          401: z.object({
            statusCode: z.literal(401),
            message: z.literal("Username or password does not exist"),
          }),
        },
      },
    },
    async (req, reply) => {
      return loginUserController.handle(req, reply);
    },
  );

  app.get(
    "/me",
    {
      schema: {
        tags: ["User"],
        description: "Show user",
        response: {
          200: userResponse,
          404: z.object({
            status: z.string(),
            message: z.literal("User not found"),
          }),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return showUserController.handle(req, reply);
    },
  );

  app.post(
    "/profile",
    {
      schema: {
        tags: ["User"],
        description: "Create financial profile",
        body: FinancialProfileDTO,
        response: {
          201: financialProfileResponse,
          409: z.object({
            status: z.string(),
            message: z.literal("Financial profile already exists"),
          }),
        },
      },
      preHandler: [isAuthenticate],
    },
    async (req, reply) => {
      return profileUserController.handle(req, reply);
    },
  );
}
