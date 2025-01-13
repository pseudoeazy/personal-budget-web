import { z } from 'zod';

export const createExpenseSchema = z.object({
  name: z.string().min(1, 'Budget Name is required').max(255),
  amount: z.number().min(1, 'Amount is required'),
  categoryId: z.string().min(1, 'Category is required').max(3),
});
