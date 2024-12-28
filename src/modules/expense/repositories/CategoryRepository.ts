import { Category } from "@prisma/client";
import { ICategoryRepository } from "./interface/ICategoryRepository";
import { CategoryDTOType } from "../dtos/CategoryDTO";
import { prisma } from "../../../shared/prisma/PrismaService";

class CategoryRepository implements ICategoryRepository {
  async findByName(name: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }
  async findById(id: number): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }
  async delete(id: number): Promise<void> {
    prisma.category.delete({
      where: {
        id,
      },
    });
  }
  async list(): Promise<Category[]> {
    return prisma.category.findMany();
  }
  async create(data: CategoryDTOType): Promise<Category> {
    return await prisma.category.create({
      data,
    });
  }
}

export { CategoryRepository };
