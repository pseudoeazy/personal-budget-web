import { categories } from '@/data/categories';

export function getCategoryInfo(categoryId: string) {
  const category = categories.find((c) => c.id.includes(categoryId));
  if (category) {
    return category;
  }
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
