import { prisma } from "../../../shared/prisma/PrismaService";
import { FinancialProfileDTOType } from "../dtos/FinancialProfileDTO";
import { IFinancialProfileRepository } from "./interface/IFinancialProfile";

class FinancialProfileRepository implements IFinancialProfileRepository {
  async create(data: FinancialProfileDTOType) {
    return await prisma.financialProfile.create({
      data,
    });
  }

  async findByUserId(userId: number) {
    const user = await prisma.financialProfile.findFirst({
      where: {
        userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}

export { FinancialProfileRepository };
