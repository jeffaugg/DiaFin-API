import { UserRepository } from "../../user/repositories/UserRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { UserBalanceService } from "../services/UserBalanceService";
import { DeleteExpenseUseCase } from "../useCases/deleteExpense/DeleteExpenseUseCase";
import { DailyBudgetManagerService } from "../services/DailyBudgetManagerService";
import { DailyBudgetRepository } from "../repositories/DailyBudgetRepository";
import { DeleteExpenseController } from "../useCases/deleteExpense/DeleteExpenseController";

export class DeleteExpenseFactory {
  static create() {
    const expenseRepository = new ExpenseRepository();
    const userRepository = new UserRepository();
    const userBalanceService = new UserBalanceService(userRepository);
    const dailyBudgetRepository = new DailyBudgetRepository();
    const dailyBudgetValueService = new DailyBudgetManagerService(
      dailyBudgetRepository,
    );
    const deleteExpenseUseCase = new DeleteExpenseUseCase(
      expenseRepository,
      userBalanceService,
      dailyBudgetValueService,
    );
    const deleteExpenseController = new DeleteExpenseController(
      deleteExpenseUseCase,
    );
    return deleteExpenseController;
  }
}
