import { Category } from "@prisma/client";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { AppError } from "../../../../config/erro/AppError";

export class FindCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, userId: number): Promise<Category | null> {
    const category = await this.categoryRepository.findById(id, userId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return category;
  }
}
