import { UserRepository } from "../../user/repositories/UserRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { DailyBudgetRepository } from "../repositories/DailyBudgetRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { DailyBudgetManagerService } from "../services/DailyBudgetManagerService";
import { UserBalanceService } from "../services/UserBalanceService";
import { ReturnDailyBudgetUseCase } from "../useCases/createDailyBudget/ReturnDailyBudgetUseCase";
import { CreateExpenseController } from "../useCases/createExpense/CreateExpenseController";
import { CreateExpenseUseCase } from "../useCases/createExpense/CreateExpenseUseCase";

export class CreateExpenseFactory {
  static create() {
    const expenseRepository = new ExpenseRepository();
    const categoryRepository = new CategoryRepository();
    const userRepository = new UserRepository();
    const dailyBudgetRepository = new DailyBudgetRepository();
    const userBalanceService = new UserBalanceService(userRepository);
    const returnDailyBudgetUseCase = new ReturnDailyBudgetUseCase(
      dailyBudgetRepository,
      userRepository,
    );
    const dailyBudgetValueService = new DailyBudgetManagerService(
      dailyBudgetRepository,
    );

    const createExpenseUseCase = new CreateExpenseUseCase(
      expenseRepository,
      categoryRepository,
      userBalanceService,
      dailyBudgetValueService,
      returnDailyBudgetUseCase,
    );
    const createExpenseController = new CreateExpenseController(
      createExpenseUseCase,
    );

    return createExpenseController;
  }
}
