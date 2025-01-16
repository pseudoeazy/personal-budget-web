import { z } from 'zod';

export const createExpenseSchema = z.object({
  name: z.string().min(1, 'expense name is required').max(255),
  amount: z
    .union([z.string().transform((val) => parseFloat(val)), z.number()])
    .refine((val) => !isNaN(val), { message: 'invalid amount' }),
  categoryId: z.string().min(1, 'category is required'),
});

export type CreateExpenseInputs = z.infer<typeof createExpenseSchema>;

export const createIncomeSchema = z.object({
  name: z.string().min(1, 'income source name is required').max(255),
  amount: z
    .union([z.string().transform((val) => parseFloat(val)), z.number()])
    .refine((val) => !isNaN(val), { message: 'invalid amount' }),
});

export type CreateIncomeInputs = z.infer<typeof createIncomeSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'password must contain at least 5 character(s)'),
});

export type RegisterUserInputs = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  token: z.string().min(5),
});
