import { DailyBudget } from "@prisma/client";
import { IDailyBudgetRepository } from "../../repositories/interface/IDailyBudgetRepository";
import { UserRepository } from "../../../user/repositories/UserRepository";
import { AppError } from "../../../../config/erro/AppError";
import { DailyBudgetCalculatorService } from "../../services/DailyBudgetCalculatorService";

export class ReturnDailyBudgetUseCase {
  private daylyBudgetValueService!: DailyBudgetCalculatorService;
  constructor(
    private dailyBudgetRepository: IDailyBudgetRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(userId: number): Promise<DailyBudget> {
    const dailyBudget = await this.dailyBudgetRepository.existsToday(userId);

    if (dailyBudget) {
      return dailyBudget;
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    this.daylyBudgetValueService = new DailyBudgetCalculatorService(
      this.userRepository,
    );

    const value = await this.daylyBudgetValueService.execute(userId);

    return await this.dailyBudgetRepository.create({
      value,
      date: new Date(),
      status: "Green",
      userId,
    });
  }
}
