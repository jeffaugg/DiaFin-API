import { UserRepository } from "../repositories/UserRepository";
import { ShowUserController } from "../useCases/showUserProfile/ShowUserController";
import { ShowUserUseCase } from "../useCases/showUserProfile/ShowUserUseCase";

export class ShowUserFactory {
  static create() {
    const userRepository = new UserRepository();
    const showUserUseCase = new ShowUserUseCase(userRepository);
    const showUserController = new ShowUserController(showUserUseCase);

    return showUserController;
  }
}
