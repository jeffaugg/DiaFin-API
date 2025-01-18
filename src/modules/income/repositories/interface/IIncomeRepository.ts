import { Income } from "@prisma/client";
import { IIncomeData } from "../../interfaces/IIncomeData";

interface IIncomeRepository {
  create(
    data: IIncomeData & {
      userId: number;
    },
  ): Promise<Income>;
  update(id: number, userId: number, data: IIncomeData): Promise<Income>;
  findById(id: number, userId: number): Promise<Income | null>;
  list(userId: number): Promise<Income[]>;
  delete(id: number, userId: number): Promise<void>;
}

export { IIncomeRepository };
