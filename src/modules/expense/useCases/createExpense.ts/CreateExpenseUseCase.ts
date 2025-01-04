import { Expense } from "@prisma/client";
import { IExpenseRepository } from "../../repositories/interface/IExpenseRepository";
import { ExpenseDTOType } from "../../dtos/ExpenseDTO";
import { AppError } from "../../../../config/erro/AppError";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { IUserRepository } from "../../../user/repositories/interface/IUserRepository";
import { IDailyBudgetRepository } from "../../repositories/interface/IDailyBudgetRepository";
import { ReturnDailyBudgetUseCase } from "../createDailyBudget/ReturnDailyBudgetUseCase";

export class CreateExpenseUseCase {
  private dailyBudgetValueService: ReturnDailyBudgetUseCase;
  constructor(
    private expenseRepository: IExpenseRepository,
    private categoryRepository: ICategoryRepository,
    private userRepository: IUserRepository,
    private dailyBudgetRepository: IDailyBudgetRepository,
  ) {
    this.dailyBudgetValueService = new ReturnDailyBudgetUseCase(
      this.dailyBudgetRepository,
      this.userRepository,
    );
  }

  async execute(data: ExpenseDTOType, userId: number): Promise<Expense> {
    const category = await this.categoryRepository.findById(
      data.categoryId,
      userId,
    );

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const dailyBudget = await this.dailyBudgetValueService.execute(userId);

    if (user.balance < data.value) {
      throw new AppError("Insufficient balance", 400);
    }

    if (data.value > dailyBudget.value) {
      throw new AppError(
        `Value greater than daily budget: ${dailyBudget.value} `,
        400,
      );
    }

    dailyBudget.value -= data.value;
    user.balance -= data.value;
    this.userRepository.update(user);
    this.dailyBudgetRepository.update(dailyBudget);

    const expense = await this.expenseRepository.create({
      ...data,
      userId,
      dailyBudgetId: dailyBudget.id,
    });

    return expense;
  }
}
