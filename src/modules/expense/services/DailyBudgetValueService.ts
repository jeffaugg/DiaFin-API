import { IDailyBudgetRepository } from "../repositories/interface/IDailyBudgetRepository";
import { AppError } from "../../../config/erro/AppError";

export class DailyBudgetValueService {
  constructor(private dailyBudgetRepository: IDailyBudgetRepository) {}

  async adjustValue(userId: number, value: number): Promise<number> {
    const dailyBudget = await this.dailyBudgetRepository.existsToday(userId);

    if (!dailyBudget) {
      throw new AppError("Daily budget not found", 404);
    }

    const newValue = dailyBudget.value + value;

    if (newValue < 0) {
      throw new AppError("Insufficient daily budget", 400);
    }

    await this.dailyBudgetRepository.ajustValue(dailyBudget.id, value);

    return dailyBudget.value;
  }
}
