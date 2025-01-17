import { getUserSession } from '@/lib/helper';
import { prisma } from '@/lib/prisma';
import { createIncomeSchema } from '@/lib/validationSchemas';
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

    const isValidIncome = createIncomeSchema.safeParse(body);
    if (!isValidIncome.success) {
      return NextResponse.json(isValidIncome.error.format(), { status: 400 });
    }

    const { id } = await context.params;
    const updatedIncome = await prisma.income.update({
      where: {
        id,
        userId: userSession.user.id,
      },
      data: {
        name: body.name,
        amount: body.amount,
      },
    });

    return NextResponse.json(updatedIncome, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot update income at this time'] },
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
    console.log({ pathname: request.nextUrl.pathname });

    const { id } = await context.params;

    const income = await prisma.income.findUnique({
      where: { id, userId: userSession.user.id },
    });

    if (!income) {
      return NextResponse.json(
        { _errors: ['income does not exist'] },
        { status: 404 }
      );
    }

    const deletedIncome = await prisma.income.delete({
      where: { id, userId: userSession.user.id },
    });

    return NextResponse.json(deletedIncome, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['cannot delete income at this time'] },
      { status: 500 }
    );
  }
}
