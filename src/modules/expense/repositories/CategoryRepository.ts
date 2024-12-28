import { Category } from "@prisma/client";
import { ICategoryRepository } from "./interface/ICategoryRepository";
import { CategoryDTOType } from "../dtos/CategoryDTO";
import { prisma } from "../../../shared/prisma/PrismaService";

class CategoryRepository implements ICategoryRepository {
  async findByName(name: string, userId: number): Promise<Category | null> {
    const category = prisma.category.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }
  async findById(id: number, userId: number): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }
  async delete(id: number, userId: number): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async list(id: number): Promise<Category[]> {
    return prisma.category.findMany({
      where: {
        userId: id,
      },
    });
  }
  async create(data: CategoryDTOType): Promise<Category> {
    return await prisma.category.create({
      data,
    });
  }
}

export { CategoryRepository };
