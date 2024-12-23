import { UserDTOType } from "../dtos/UserDTO";
import { prisma } from "../../../shared/prisma/PrismaService";
import { IUserRepository } from "./interface/IUserRepository";
import { User } from "@prisma/client";

class UserRepository implements IUserRepository {
    async create(data: UserDTOType) {
        return await prisma.user.create({
            data
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }
        return user;
    }

}

export { UserRepository };