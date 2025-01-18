import { AppError } from "../../../../config/erro/AppError";
import { IExpenseRepository } from "../../repositories/interface/IExpenseRepository";
import { DailyBudgetManagerService } from "../../services/DailyBudgetManagerService";
import { UserBalanceService } from "../../services/UserBalanceService";

export class DeleteExpenseUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private userBalanceService: UserBalanceService,
    private dailyBudgetValueService: DailyBudgetManagerService,
  ) {}

  async execute(id: number, userId: number): Promise<void> {
    const expense = await this.expenseRepository.findById(id, userId);

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    await this.userBalanceService.adjustBalance(userId, expense.value);
    await this.dailyBudgetValueService.adjustValue(userId, expense.value);

    await this.expenseRepository.delete(id, userId);
  }
}
