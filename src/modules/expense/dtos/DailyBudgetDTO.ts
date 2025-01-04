import { z } from "zod";

export const DailyBudgetDTO = z.object({
  value: z.number().int().positive({ message: "Value is required" }),
  date: z.date(),
  status: z.enum(["Green", "Red", "Yellow"]).default("Green"),
  userId: z.number().int().positive({ message: "User is required" }),
});

export type DailyBudgetDTOType = z.infer<typeof DailyBudgetDTO>;
