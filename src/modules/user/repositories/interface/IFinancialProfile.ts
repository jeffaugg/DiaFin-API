import { FinancialProfile } from "@prisma/client";
import { FinancialProfileDTOType } from "../../dtos/FinancialProfileDTO";

interface IFinancialProfileRepository {
  create(data: FinancialProfileDTOType): Promise<FinancialProfile>;
  findByUserId(userId: number): Promise<FinancialProfile | null>;
}

export { IFinancialProfileRepository };
