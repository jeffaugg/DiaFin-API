import z from "zod";

export const LoginDTO = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginDTOType = z.infer<typeof LoginDTO>;
