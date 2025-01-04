import { differenceInDays, endOfMonth } from "date-fns";
import { AppError } from "../../../config/erro/AppError";
import { UserRepository } from "../../user/repositories/UserRepository";

export class DailyBudgetValueService {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<number> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const today = new Date();
    const lastDayOfMonth = endOfMonth(today);

    const daysRemaining = Math.max(1, differenceInDays(lastDayOfMonth, today));

    if (user.balance === undefined || user.balance === null) {
      throw new AppError("O saldo do usuário não está definido", 409);
    }
    const dailyValue = user.balance / daysRemaining;

    return dailyValue;
  }
}
