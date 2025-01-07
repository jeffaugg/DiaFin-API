import { Category } from "@prisma/client";
import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";

export class ShowCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<Category[]> {
    const categories = await this.categoryRepository.list(id);
    return categories;
  }
}
