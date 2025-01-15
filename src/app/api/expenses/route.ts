import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createExpenseSchema } from '@/lib/validationSchemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const expenses = await prisma.expense.findMany({});
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
  const session = await getServerSession(authOptions);
  if (!session) {
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
