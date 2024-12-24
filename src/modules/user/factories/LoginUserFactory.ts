import { UserRepository } from "../repositories/UserRepository";
import { LoginUserController } from "../useCases/loginUser/LoginUserController";
import { LoginUserUseCase } from "../useCases/loginUser/LoginUserUseCase";

export class LoginUserFactory {
  static create() {
    const userRepository = new UserRepository();
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const loginUserController = new LoginUserController(loginUserUseCase);

    return loginUserController;
  }
}
