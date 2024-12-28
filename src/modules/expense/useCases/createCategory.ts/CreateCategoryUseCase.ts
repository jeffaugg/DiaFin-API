import { Category } from "@prisma/client";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { AppError } from "../../../../config/erro/AppError";
import { CategoryDTOType } from "../../dtos/CategoryDTO";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CategoryDTOType, userId: number): Promise<Category> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
      userId,
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", 400);
    }

    const categoryData = { ...data, userId };

    const category = await this.categoryRepository.create(categoryData);

    return category;
  }
}
