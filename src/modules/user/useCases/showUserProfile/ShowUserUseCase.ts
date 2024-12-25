import { AppError } from "../../../../config/erro/AppError";
import { IUserRepository } from "../../repositories/interface/IUserRepository";

export class ShowUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }
}
