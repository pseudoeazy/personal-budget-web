import { NextRequest, NextResponse } from 'next/server';
import { startOfMonth, endOfMonth } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { createExpenseSchema } from '@/lib/validationSchemas';
import { getUserSession } from '@/lib/helper';

export async function GET() {
  try {
    const userSesson = await getUserSession();
    if (!userSesson) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId: userSesson.user.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot retrieve expenses at this time'] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const userSesson = await getUserSession();
  if (!userSesson) {
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
        userId: userSesson.user.id,
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
    const now = new Date();
    const startOfMonthDate = startOfMonth(now);
    const endOfMonthDate = endOfMonth(now);

    const deletedExpenses = await prisma.expense.deleteMany({
      where: {
        userId: userSession.user.id,
        createdAt: {
          gte: startOfMonthDate,
          lte: endOfMonthDate,
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
