import { Expense } from '@/types/definitions';

export const expenses: Expense[] = [
  {
    id: `1`,
    name: 'Breakfast',
    category: 'Food',
    amount: '125',
    createdAt: `January, 08-2025`,
    updatedAt: Date.now().toString(),
  },
  {
    id: `2`,
    name: 'Dinner',
    category: 'Food',
    amount: '75',
    createdAt: `January, 08-2025`,
    updatedAt: Date.now().toString(),
  },
];
