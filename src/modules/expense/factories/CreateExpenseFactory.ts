import { UserRepository } from "../../user/repositories/UserRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { DailyBudgetRepository } from "../repositories/DailyBudgetRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { CreateExpenseController } from "../useCases/createExpense.ts/CreateExpenseController";
import { CreateExpenseUseCase } from "../useCases/createExpense.ts/CreateExpenseUseCase";

export class CreateExpenseFactory {
  static create() {
    const expenseRepository = new ExpenseRepository();
    const categoryRepository = new CategoryRepository();
    const userRepository = new UserRepository();
    const dailyBudgetRepository = new DailyBudgetRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(
      expenseRepository,
      categoryRepository,
      userRepository,
      dailyBudgetRepository,
    );
    const createExpenseController = new CreateExpenseController(
      createExpenseUseCase,
    );

    return createExpenseController;
  }
}
