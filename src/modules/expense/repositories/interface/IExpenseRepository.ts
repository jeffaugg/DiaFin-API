import { Expense } from "@prisma/client";
import { ExpenseDTOType } from "../../dtos/ExpenseDTO";

interface IExpenseRepository {
  create(
    data: ExpenseDTOType & {
      userId: number;
      dailyBudgetId: number;
    },
  ): Promise<Expense>;
  findById(id: number, userId: number): Promise<Expense | null>;
  list(userId: number): Promise<Expense[]>;
  delete(id: number, userId: number): Promise<void>;
}

export { IExpenseRepository };
