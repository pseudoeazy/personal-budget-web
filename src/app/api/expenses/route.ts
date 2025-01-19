import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createExpenseSchema } from '@/lib/validationSchemas';
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
    const expenses = await prisma.expense.findMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate, // Greater than or equal to the start of the month
          lte: endDate, // Less than or equal to the end of the month
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const totalExpenses = await prisma.expense.count({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ expenses, totalExpenses }, { status: 200 });
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
    const validation = createExpenseSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newExpense = await prisma.expense.create({
      data: {
        userId: userSession.user.id,
        name: body.name,
        categoryId: body.categoryId,
        amount: body.amount,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
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
    const { startDate, endDate } = getCurrentMonthRange();

    const deletedExpenses = await prisma.expense.deleteMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json(
      { message: `${deletedExpenses.count} expenses deleted` },
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
