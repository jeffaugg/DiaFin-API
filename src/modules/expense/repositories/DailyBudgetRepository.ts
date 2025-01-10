import { DailyBudget } from "@prisma/client";
import { DailyBudgetDTOType } from "../dtos/DailyBudgetDTO";
import { IDailyBudgetRepository } from "./interface/IDailyBudgetRepository";
import { prisma } from "../../../shared/prisma/PrismaService";
import { isSameDay } from "date-fns";

class DailyBudgetRepository implements IDailyBudgetRepository {
  async ajustValue(id: number, value: number): Promise<void> {
    await prisma.dailyBudget.update({
      where: {
        id,
      },
      data: {
        value: {
          increment: value,
        },
      },
    });
  }

  async create(data: DailyBudgetDTOType): Promise<DailyBudget> {
    const dailyBudget = await prisma.dailyBudget.create({
      data,
    });
    return dailyBudget;
  }
  async existsToday(userId: number): Promise<DailyBudget | null> {
    const dailyBudget = await prisma.dailyBudget.findFirst({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (dailyBudget && isSameDay(new Date(dailyBudget.date), new Date())) {
      return dailyBudget;
    }
    return null;
  }
  async findById(id: number, userId: number): Promise<DailyBudget | null> {
    const dailyBudget = await prisma.dailyBudget.findUnique({
      where: {
        id,
        userId,
      },
    });

    return dailyBudget;
  }
  list(userId: number): Promise<DailyBudget[]> {
    const dailyBudgets = prisma.dailyBudget.findMany({
      where: {
        userId,
      },
    });

    return dailyBudgets;
  }
  async delete(id: number, userId: number): Promise<void> {
    await prisma.dailyBudget.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async update(dailyBudget: DailyBudget): Promise<DailyBudget> {
    return await prisma.dailyBudget.update({
      where: {
        id: dailyBudget.id,
      },
      data: {
        value: dailyBudget.value,
        status: dailyBudget.status,
      },
    });
  }
}

export { DailyBudgetRepository };
