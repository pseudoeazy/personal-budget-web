import { z } from 'zod';

export const createExpenseSchema = z.object({
  name: z.string().min(1, 'expense name is required').max(255),
  amount: z
    .union([z.string().transform((val) => parseFloat(val)), z.number()])
    .refine((val) => !isNaN(val), { message: 'invalid amount' }),
  categoryId: z.string().min(1, 'category is required'),
});

export type CreateExpenseInputs = z.infer<typeof createExpenseSchema>;
