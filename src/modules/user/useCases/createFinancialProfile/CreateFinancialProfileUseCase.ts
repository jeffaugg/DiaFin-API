import { FinancialProfile } from "@prisma/client";
import { FinancialProfileDTOType } from "../../dtos/FinancialProfileDTO";
import { IFinancialProfileRepository } from "../../repositories/interface/IFinancialProfile";
import { AppError } from "../../../../config/erro/AppError";

export class CreateFinancialProfileUseCase {
  constructor(
    private financialProfileRepository: IFinancialProfileRepository,
  ) {}

  async execute(data: FinancialProfileDTOType): Promise<FinancialProfile> {
    const financialProfileExists =
      await this.financialProfileRepository.findByUserId(data.userId);

    if (financialProfileExists) {
      throw new AppError("Financial profile already exists", 409);
    }

    return await this.financialProfileRepository.create(data);
  }
}
