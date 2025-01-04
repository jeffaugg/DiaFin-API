import { Expense } from "@prisma/client";
import { prisma } from "../../../shared/prisma/PrismaService";
import { IExpenseRepository } from "./interface/IExpenseRepository";
import { ExpenseDTOType } from "../dtos/ExpenseDTO";

class ExpenseRepository implements IExpenseRepository {
  async create(
    data: ExpenseDTOType & {
      userId: number;
      dailyBudgetId: number;
    },
  ): Promise<Expense> {
    return await prisma.expense.create({
      data,
    });
  }
  async findById(id: number, userId: number): Promise<Expense | null> {
    const expense = prisma.expense.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      return null;
    }

    return expense;
  }

  async delete(id: number, userId: number): Promise<void> {
    await prisma.expense.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async list(userId: number): Promise<Expense[]> {
    return prisma.expense.findMany({
      where: {
        userId,
      },
    });
  }
}

export { ExpenseRepository };
