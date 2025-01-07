import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { ShowExpensesController } from "../useCases/showExpenses/ShowExpensesController";
import { ShowExpensesUseCase } from "../useCases/showExpenses/ShowExpensesUseCase";

export class ShowExpensesFactory {
  static create() {
    const expenseRepository = new ExpenseRepository();
    const showExpensesUseCase = new ShowExpensesUseCase(expenseRepository);
    const showExpensesController = new ShowExpensesController(
      showExpensesUseCase,
    );

    return showExpensesController;
  }
}
