import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createExpenseSchema = z.object({
  name: z.string().min(1).max(255),
  amount: z.number(),
  categoryId: z.string().min(1).max(3),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  body.amount = parseInt(body.amount);
  const validation = createExpenseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newExpense = await prisma.expense.create({
    data: {
      name: body.name,
      categoryId: body.categoryId,
      amount: body.amount,
    },
  });

  return NextResponse.json(newExpense, { status: 201 });
}
