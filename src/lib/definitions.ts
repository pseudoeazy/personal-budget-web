export type Expense = {
  id: string;
  name: string;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponseError = {
  _errors: string[];
  [key: string]: { _errors: string[] } | string[];
};
