import axios from 'axios';
import { CreateIncomeInputs } from '@/lib/validationSchemas';

export async function createIncome(data: CreateIncomeInputs) {
  const url = process.env.NEXT_PUBLIC_APP_URL + '/api/incomes';
  return axios.post(url, data);
}
