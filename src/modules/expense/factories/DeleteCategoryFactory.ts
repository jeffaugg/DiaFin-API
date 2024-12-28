import { CategoryRepository } from "../repositories/CategoryRepository";
import { DeleteCategoryController } from "../useCases/deleteCategory.ts/DeleteCategoryController";
import { DeleteCategoryUseCase } from "../useCases/deleteCategory.ts/DeleteCategoryUseCase";

export class DeleteCategoryFactory {
  static create() {
    const categoryRepository = new CategoryRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
    const deleteCategoryController = new DeleteCategoryController(
      deleteCategoryUseCase,
    );

    return deleteCategoryController;
  }
}
