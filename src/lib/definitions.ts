export type Expense = {
  id: string;
  name: string;
  category: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponseError = {
  _errors: string[];
  [key: string]: { _errors: string[] } | string[];
};
