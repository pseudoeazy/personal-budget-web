import { NextRequest, NextResponse } from 'next/server';
import { getUserSession, verifyAndDeleteToken } from '@/lib/helper';
import { verifyEmailSchema } from '@/lib/validationSchemas';

export async function POST(request: NextRequest) {
  const isLoggedIn = await getUserSession();

  if (isLoggedIn) {
    return NextResponse.json(
      { _errors: ['You are already registered.'] },
      { status: 500 }
    );
  }

  const body = await request.json();
  const validate = verifyEmailSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  try {
    await verifyAndDeleteToken(body.email, body.token);
    return NextResponse.json(
      { message: 'email verification successful.' },
      { status: 200 }
    );
  } catch (e: unknown) {
    const error = e as Error;
    console.error(error.message);
    return NextResponse.json({ _errors: [error.message] }, { status: 400 });
  }
}
