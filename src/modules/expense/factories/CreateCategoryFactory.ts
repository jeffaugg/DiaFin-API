import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryController } from "../useCases/createCategory.ts/CreateCategoryController";
import { CreateCategoryUseCase } from "../useCases/createCategory.ts/CreateCategoryUseCase";

export class CreateCategoryFactory {
  static create() {
    const categoryRepository = new CategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    const createCategoryController = new CreateCategoryController(
      createCategoryUseCase,
    );

    return createCategoryController;
  }
}
