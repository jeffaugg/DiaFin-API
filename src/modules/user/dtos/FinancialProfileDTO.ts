import z from "zod";

export const FinancialProfileDTO = z.object({
  name: z.enum(["conservative", "moderate", "aggressive"]).default("moderate"),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description is too long" }),
  userId: z.number().int().positive({ message: "User ID is required" }),
});

export type FinancialProfileDTOType = z.infer<typeof FinancialProfileDTO>;
