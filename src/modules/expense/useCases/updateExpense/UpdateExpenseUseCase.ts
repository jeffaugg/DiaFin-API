import { Expense } from "@prisma/client";
import { ExpenseDTOType } from "../../dtos/ExpenseDTO";
import { IExpenseRepository } from "../../repositories/interface/IExpenseRepository";
import { AppError } from "../../../../config/erro/AppError";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { IUserRepository } from "../../../user/repositories/interface/IUserRepository";
import { IDailyBudgetRepository } from "../../repositories/interface/IDailyBudgetRepository";
import { ReturnDailyBudgetUseCase } from "../createDailyBudget/ReturnDailyBudgetUseCase";

export class UpdateExpenseUseCase {
  private returnDailyBudgetUseCase: ReturnDailyBudgetUseCase;
  constructor(
    private expenseRepository: IExpenseRepository,
    private categoryRepository: ICategoryRepository,
    private userRepository: IUserRepository,
    private dailyBudgetRepository: IDailyBudgetRepository,
  ) {
    this.returnDailyBudgetUseCase = new ReturnDailyBudgetUseCase(
      this.dailyBudgetRepository,
      this.userRepository,
    );
  }

  async execute(
    id: number,
    userId: number,
    data: ExpenseDTOType,
  ): Promise<Expense> {
    const expense = await this.expenseRepository.findById(id, userId);

    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

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

    const dailyBudget = await this.returnDailyBudgetUseCase.execute(userId);

    dailyBudget.value += expense.value;
    user.balance += expense.value;

    if (user.balance < data.value) {
      throw new AppError("Insufficient balance", 400);
    }

    if (data.value > dailyBudget.value) {
      throw new AppError(`Value greater than daily budget`, 400);
    }

    dailyBudget.value -= data.value;
    user.balance -= data.value;

    const { financialProfile, ...simpleUser } = user;
    this.userRepository.update(simpleUser);
    this.dailyBudgetRepository.update(dailyBudget);

    const updatedExpense = await this.expenseRepository.update(
      id,
      userId,
      data,
    );

    return updatedExpense;
  }
}
