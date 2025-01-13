import axios from 'axios';
import { CreateExpenseInputs } from '@/lib/validationSchemas';

export async function createExpense(data: CreateExpenseInputs) {
  const url = process.env.NEXT_PUBLIC_APP_URL + '/api/expenses';
  return axios.post(url, data);
}
