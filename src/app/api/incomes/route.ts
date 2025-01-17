import { NextRequest, NextResponse } from 'next/server';
import { startOfMonth, endOfMonth } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { createIncomeSchema } from '@/lib/validationSchemas';
import { getUserSession } from '@/lib/helper';
import { getCurrentMonthRange } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 5);
    const skip = (page - 1) * limit;

    const { startDate, endDate } = getCurrentMonthRange();
    const incomes = await prisma.income.findMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const totalIncomes = await prisma.expense.count({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ incomes, totalIncomes }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot retrieve expenses at this time'] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const userSession = await getUserSession();
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = createIncomeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIncome = await prisma.income.create({
      data: {
        userId: userSession.user.id,
        name: body.name,
        amount: body.amount,
      },
    });

    return NextResponse.json(newIncome, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['Unexpected error occurred'] },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const userSession = await getUserSession();
  if (!userSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfMonthDate = startOfMonth(now);
    const endOfMonthDate = endOfMonth(now);

    const deletedIncomes = await prisma.income.deleteMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startOfMonthDate,
          lte: endOfMonthDate,
        },
      },
    });

    return NextResponse.json(
      { message: `${deletedIncomes.count} incomes deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['Unexpected error occurred'] },
      { status: 500 }
    );
  }
}
