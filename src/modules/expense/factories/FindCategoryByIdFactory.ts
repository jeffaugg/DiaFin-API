import { CategoryRepository } from "../repositories/CategoryRepository";
import { FindCategoryByIdController } from "../useCases/findCategoryById/FindCategoryByIdController";
import { FindCategoryByIdUseCase } from "../useCases/findCategoryById/FindCategoryByIdUseCase";

export class FindCategoryByIdFactory {
  static create() {
    const categoryRepository = new CategoryRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      categoryRepository,
    );
    const findCategoryByIdController = new FindCategoryByIdController(
      findCategoryByIdUseCase,
    );

    return findCategoryByIdController;
  }
}
