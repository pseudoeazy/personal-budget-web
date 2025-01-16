import { getUserSession } from '@/lib/helper';
import { prisma } from '@/lib/prisma';
import { createExpenseSchema } from '@/lib/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const isValidExpense = createExpenseSchema.safeParse(body);
    if (!isValidExpense.success) {
      return NextResponse.json(isValidExpense.error.format(), { status: 400 });
    }
    const { id } = await context.params;

    const updatedExpense = await prisma.expense.update({
      where: {
        id,
        userId: userSession.user.id,
      },
      data: {
        name: body.name,
        categoryId: body.categoryId,
        amount: body.amount,
      },
    });

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { _errors: ['cannot update expense at this time'] },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userSession = await getUserSession();
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const expense = await prisma.expense.findUnique({
      where: { id, userId: userSession.user.id },
    });

    if (!expense) {
      return NextResponse.json(
        { _errors: ['expense does not exist'] },
        { status: 404 }
      );
    }

    const deletedExpense = await prisma.expense.delete({
      where: { id, userId: userSession.user.id },
    });

    return NextResponse.json(deletedExpense, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { _errors: ['cannot delete expense at this time'] },
      { status: 500 }
    );
  }
}
