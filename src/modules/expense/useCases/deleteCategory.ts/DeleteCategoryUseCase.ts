import { AppError } from "../../../../config/erro/AppError";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, userId: number): Promise<void> {
    const category = await this.categoryRepository.findById(id, userId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await this.categoryRepository.delete(id, userId);
  }
}
