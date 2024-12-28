import { Category } from "@prisma/client";
import { CategoryDTOType } from "../../dtos/CategoryDTO";

interface ICategoryRepository {
  create(data: CategoryDTOType): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  findById(id: number): Promise<Category | null>;
  list(): Promise<Category[]>;
  delete(id: number): Promise<void>;
}

export { ICategoryRepository };
