import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma/PrismaService";
import { UserDTOType } from "../dtos/UserDTO";
import { IUserRepository, UserFull } from "./interface/IUserRepository";

class UserRepository implements IUserRepository {
  async adjustBalance(userId: number, value: number): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: value,
        },
      },
    });
  }

  async update(user: User): Promise<User> {
    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async create(data: UserDTOType) {
    return await prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: number): Promise<UserFull | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        financialProfile: true,
      },
    });

    return user;
  }
}

export { UserRepository };
