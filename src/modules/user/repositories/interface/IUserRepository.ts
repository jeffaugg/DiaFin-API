import { FinancialProfile, User } from "@prisma/client";
import { UserDTOType } from "../../dtos/UserDTO";

export type UserFull = User & {
  financialProfile: FinancialProfile | null;
};
interface IUserRepository {
  create(data: UserDTOType): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<UserFull | null>;
}

export { IUserRepository };
