import { AppError } from "../../../config/erro/AppError";
import { DailyBudgetRepository } from "../repositories/DailyBudgetRepository";
import { DailyBudgetCalculatorService } from "./DailyBudgetCalculatorService";

export class ReloadDailyBudgetService {
  constructor(
    private dailyBudgetRepository: DailyBudgetRepository,
    private dailyBudgetCalculatorService: DailyBudgetCalculatorService,
  ) {}

  async execute(userId: number) {
    const hasDailyBudgetForToday =
      await this.dailyBudgetRepository.existsToday(userId);

    if (!hasDailyBudgetForToday) {
      throw new AppError("Daily budget not found");
    }

    const newDailyBudgetValue =
      await this.dailyBudgetCalculatorService.execute(userId);

    return this.dailyBudgetRepository.update({
      ...hasDailyBudgetForToday,
      value: newDailyBudgetValue,
    });
  }
}
