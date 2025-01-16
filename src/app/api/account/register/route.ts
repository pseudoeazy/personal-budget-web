import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { getUserSession, sendVerifyEmail } from '@/lib/helper';
import { registerSchema } from '@/lib/validationSchemas';

export async function POST(request: NextRequest) {
  const isLoggedIn = await getUserSession();

  if (isLoggedIn) {
    return NextResponse.json(
      { _errors: ['You are already registered.'] },
      { status: 500 }
    );
  }

  const body = await request.json();
  const validate = registerSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (userExist) {
      return NextResponse.json(
        { _errors: ['User already exist'] },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword,
      },
    });

    sendVerifyEmail(body.email);
    return NextResponse.json({ email: user.email }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { _errors: ['Unexpected error occured'] },
      { status: 500 }
    );
  }
}
