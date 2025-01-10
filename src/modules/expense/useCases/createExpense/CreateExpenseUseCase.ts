import { Expense } from "@prisma/client";
import { IExpenseRepository } from "../../repositories/interface/IExpenseRepository";
import { ExpenseDTOType } from "../../dtos/ExpenseDTO";
import { AppError } from "../../../../config/erro/AppError";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { ReturnDailyBudgetUseCase } from "../createDailyBudget/ReturnDailyBudgetUseCase";
import { UserBalanceService } from "../../services/UserBalanceService";
import { DailyBudgetValueService } from "../../services/DailyBudgetValueService";

export class CreateExpenseUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private categoryRepository: ICategoryRepository,
    private userBalanceService: UserBalanceService,
    private dailyBudgetValueService: DailyBudgetValueService,
    private returnDailyBudgetUseCase: ReturnDailyBudgetUseCase,
  ) {}

  async execute(data: ExpenseDTOType, userId: number): Promise<Expense> {
    const category = await this.categoryRepository.findById(
      data.categoryId,
      userId,
    );

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const dailyBudget = await this.returnDailyBudgetUseCase.execute(userId);

    if (data.value > dailyBudget.value) {
      throw new AppError(`Value greater than daily budget`, 400);
    }
    await this.userBalanceService.adjustBalance(userId, -data.value);
    await this.dailyBudgetValueService.adjustValue(userId, -data.value);

    const expense = await this.expenseRepository.create({
      ...data,
      userId,
      dailyBudgetId: dailyBudget.id,
    });

    return expense;
  }
}
