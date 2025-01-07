import z from "zod";

export const ExpenseDTO = z.object({
  value: z.number().int().positive({ message: "Value is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  categoryId: z.number().int().positive({ message: "Category is required" }),
});

export const expenseResponse = ExpenseDTO.extend({
  id: z.number().int().positive(),
  date: z.date(),
  userId: z.number().int().positive(),
  dailyBudgetId: z.number().int().positive(),
});

export type ExpenseDTOType = z.infer<typeof ExpenseDTO>;
