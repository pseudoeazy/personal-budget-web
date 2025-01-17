import { getUserSession } from '@/lib/helper';
import { prisma } from '@/lib/prisma';
import { getCurrentMonthRange } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { startDate, endDate } = getCurrentMonthRange();

    const expense = await prisma.expense.findMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
      },
    });

    if (!expense) {
      return NextResponse.json(
        { _errors: ['expense not found'] },
        { status: 404 }
      );
    }
    return NextResponse.json(expense, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot retrieve expense at this time'] },
      { status: 500 }
    );
  }
}
