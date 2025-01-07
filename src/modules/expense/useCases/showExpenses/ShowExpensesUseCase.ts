import { Expense } from "@prisma/client";
import { IExpenseRepository } from "../../repositories/interface/IExpenseRepository";

export class ShowExpensesUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(userId: number): Promise<Expense[]> {
    const expenses = await this.expenseRepository.list(userId);
    return expenses;
  }
}
