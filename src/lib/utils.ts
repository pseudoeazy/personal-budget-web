import { startOfMonth, endOfMonth } from 'date-fns';
import { categories } from '@/data/categories';

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

export function getCategoryInfo(categoryId: string) {
  const category = categories.find((c) => c.id.includes(categoryId));
  if (category) {
    console.log({ category });
    return category;
  }
  console.log({ lastCategory: categories[6] });
  return categories[6];
}

export function formatToLocalCurrency(amount: number) {
  const locale = navigator.language || navigator.language;
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PHP',
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
