import { categories } from '@/data/categories';
import { sendVerifyEmail } from './helper';
import { prisma } from './prisma';

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

export async function verifyAndDeleteToken(identifier: string, token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!verificationToken) {
    throw new Error('Invalid or expired token');
  }

  const expires = new Date(verificationToken.expires);
  if (new Date() > expires) {
    sendVerifyEmail(identifier);
    throw new Error('Token has expired. Please check your email.');
  }

  try {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });
    await prisma.user.update({
      where: {
        email: identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error('Error deleting token:', error);
    throw new Error('Failed to delete the token.');
  }

  console.log('Token verified and deleted successfully');
  return true;
}
