import { FinancialProfileRepository } from "../repositories/FinancialProfileRepository";
import { CreateFinancialProfileController } from "../useCases/createFinancialProfile/CreateFinancialProfileController";
import { CreateFinancialProfileUseCase } from "../useCases/createFinancialProfile/CreateFinancialProfileUseCase";

export class CreateFinancialProfileFactory {
  static create() {
    const financialProfileRepository = new FinancialProfileRepository();
    const createFinancialProfileUseCase = new CreateFinancialProfileUseCase(
      financialProfileRepository,
    );
    const createFinancialProfileController =
      new CreateFinancialProfileController(createFinancialProfileUseCase);

    return createFinancialProfileController;
  }
}
