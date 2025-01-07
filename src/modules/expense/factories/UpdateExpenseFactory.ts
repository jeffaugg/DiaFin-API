import { UserRepository } from "../../user/repositories/UserRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { DailyBudgetRepository } from "../repositories/DailyBudgetRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { updatedExpenseController } from "../useCases/updateExpense/UpdateExpenseController";
import { UpdateExpenseUseCase } from "../useCases/updateExpense/UpdateExpenseUseCase";

export class UpdateExpenseFactory {
  static create() {
    const expenseRepository = new ExpenseRepository();
    const categoryRepository = new CategoryRepository();
    const userRepository = new UserRepository();
    const dailyBudgetRepository = new DailyBudgetRepository();
    const updateExpenseUseCase = new UpdateExpenseUseCase(
      expenseRepository,
      categoryRepository,
      userRepository,
      dailyBudgetRepository,
    );
    return new updatedExpenseController(updateExpenseUseCase);
  }
}
