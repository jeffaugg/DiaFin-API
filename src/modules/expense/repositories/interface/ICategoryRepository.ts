import { Category } from "@prisma/client";
import { CategoryDTOType } from "../../dtos/CategoryDTO";

interface ICategoryRepository {
  create(data: CategoryDTOType): Promise<Category>;
  findByName(name: string, userId: number): Promise<Category | null>;
  findById(id: number, userId: number): Promise<Category | null>;
  list(id: number): Promise<Category[]>;
  delete(id: number, userId: number): Promise<void>;
}

export { ICategoryRepository };
