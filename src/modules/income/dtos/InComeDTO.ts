import z from "zod";

export const IncomeDTO = z.object({
  value: z.number().int().positive({ message: "Value is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type IncomeDTOType = z.infer<typeof IncomeDTO>;
