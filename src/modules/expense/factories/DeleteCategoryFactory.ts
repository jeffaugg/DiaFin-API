import { CategoryRepository } from "../repositories/CategoryRepository";
import { DeleteCategoryController } from "../useCases/deleteCategory/DeleteCategoryController";
import { DeleteCategoryUseCase } from "../useCases/deleteCategory/DeleteCategoryUseCase";

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
