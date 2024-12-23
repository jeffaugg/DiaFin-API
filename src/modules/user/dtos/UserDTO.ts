import z from "zod";

export const UserDTO = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    age: z.number().int().positive({ message: "Age is required" }),
    salary: z.number()
        .positive({ message: "Salary is required" })
        .transform((value) => parseFloat(value.toFixed(2))),
    reserve: z.number()
        .positive({ message: "Reserve is required" })
        .transform((value) => parseFloat(value.toFixed(2))),
});

export type UserDTOType = z.infer<typeof UserDTO>;
