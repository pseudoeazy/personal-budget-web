export type Expense = {
  userId: string;
  id: string;
  name: string;
  categoryId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};
export type Income = {
  userId: string;
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};
export type PaginatedExpense = {
  expenses: Expense[];
  totalExpenses: number;
};
export type PaginatedIncome = {
  incomes: Income[];
  totalIncomes: number;
};

export type ApiResponseError = {
  _errors: string[];
  [key: string]: { _errors: string[] } | string[];
};
