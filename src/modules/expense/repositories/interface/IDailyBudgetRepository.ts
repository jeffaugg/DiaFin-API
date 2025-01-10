import { DailyBudget } from "@prisma/client";
import { DailyBudgetDTOType } from "../../dtos/DailyBudgetDTO";

interface IDailyBudgetRepository {
  create(data: DailyBudgetDTOType): Promise<DailyBudget>;
  existsToday(userId: number): Promise<DailyBudget | null>;
  update(dailyBudget: DailyBudget): Promise<DailyBudget>;
  findById(id: number, userId: number): Promise<DailyBudget | null>;
  list(userId: number): Promise<DailyBudget[]>;
  delete(id: number, userId: number): Promise<void>;
  ajustValue(id: number, value: number): Promise<void>;
}

export { IDailyBudgetRepository };
