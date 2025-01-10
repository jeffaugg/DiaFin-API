import { AppError } from "../../../config/erro/AppError";
import { IUserRepository } from "../../user/repositories/interface/IUserRepository";

export class UserBalanceService {
  constructor(private userRepository: IUserRepository) {}

  async adjustBalance(userId: number, value: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const newBalance = user.balance + value;

    if (newBalance < 0) {
      throw new AppError("Insufficient balance", 400);
    }

    await this.userRepository.adjustBalance(userId, value);
  }
}
