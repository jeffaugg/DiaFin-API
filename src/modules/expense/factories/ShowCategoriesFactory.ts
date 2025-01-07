import { CategoryRepository } from "../repositories/CategoryRepository";
import { ShowCategoriesController } from "../useCases/showCategories/ShowCategoriesController";
import { ShowCategoriesUseCase } from "../useCases/showCategories/ShowCategoriesUseCase";

export class ShowCategoriesFactory {
  static create() {
    const categoryRepository = new CategoryRepository();
    const showCategoriesUseCase = new ShowCategoriesUseCase(categoryRepository);
    const showCategoriesController = new ShowCategoriesController(
      showCategoriesUseCase,
    );

    return showCategoriesController;
  }
}
