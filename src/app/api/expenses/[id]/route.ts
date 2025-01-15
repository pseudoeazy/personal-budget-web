import { prisma } from '@/lib/prisma';
import { createExpenseSchema } from '@/lib/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: params.id,
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

export async function PUT(request: NextRequest, params: { id: string }) {
  try {
    const body = await request.json();

    const isValidExpense = createExpenseSchema.safeParse(body);
    if (!isValidExpense.success) {
      return NextResponse.json(isValidExpense.error.format(), { status: 400 });
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        categoryId: body.categoryId,
        amount: body.amount,
      },
    });

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot update expense at this time'] },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, params: { id: string }) {
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: params.id },
    });
    if (!expense)
      return NextResponse.json(
        { _errors: ['expense does not exist'] },
        { status: 404 }
      );

    const deletedExpense = prisma.expense.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deletedExpense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot delete expense at this time'] },
      { status: 500 }
    );
  }
}
