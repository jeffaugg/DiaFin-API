import { User } from "@prisma/client";
import { UserDTOType } from "../../dtos/UserDTO";
interface IUserRepository {
  create(data: UserDTOType): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export { IUserRepository };
