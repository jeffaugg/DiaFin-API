import { UserRepository } from "../repositories/UserRepository";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

export class CreateUserFactory {
  static create() {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
  }
}
