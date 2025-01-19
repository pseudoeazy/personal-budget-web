import { startOfMonth, endOfMonth } from 'date-fns';
import { categories } from '@/data/categories';
import { Session } from 'next-auth';

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

export function getCurrentUserName(session: Session) {
  const name = session.user.name || session.user.email || 'Dear';
  return name;
}

export function getCategoryInfo(categoryId: string) {
  const category = categories.find((c) => c.id.includes(categoryId));
  if (category) {
    return category;
  }

  return categories[6];
}

export function formatToLocalCurrency(amount: number, currency = 'PHP') {
  const locale = navigator.language || navigator.language;
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);

  return formattedAmount;
}

export function getCurrentMonthRange() {
  const now = new Date();
  const startDate = startOfMonth(now);
  const endDate = endOfMonth(now);

  return {
    startDate,
    endDate,
  };
}

export const refetch = async (
  path: string,
  callback: (url: string) => Promise<void>
) => {
  const rowsPerPage = [5, 10, 20];
  for (const row of rowsPerPage) {
    await callback(
      `${process.env.NEXT_PUBLIC_APP_URL}${path}?page=1&limit=${row}`
    );
  }
};

export const getEndPoint = (url: 'expenses' | 'incomes') => {
  if (url === 'expenses') {
    return '/api/expenses';
  }
  return '/api/incomes';
};
