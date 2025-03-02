import React from 'react';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import VerifyEmail from '@emails/VerifyEmail';
import { authOptions } from '@/lib/authOptions';
import { prisma } from './prisma';

export const isLoggedIn = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    return false;
  }
};

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export async function sendVerifyEmail(email: string) {
  const verification = await createVerificationToken(email);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const verifyURL =
    process.env.NEXT_PUBLIC_APP_URL +
    '/account/verify/?t=' +
    verification.token +
    '&e=' +
    btoa(email);

  console.log(
    'Sending verification email ...' +
      verification.token +
      ' &email=' +
      btoa(email)
  );

  resend.emails.send({
    from: process.env.EMAIL_SENDER!,
    to: email,
    subject: 'Monthly Budget Verification',
    react: React.createElement(VerifyEmail, { verifyURL }),
  });
}

async function createVerificationToken(identifier: string) {
  const token = randomBytes(32).toString('hex');

  // Token's expiration time (e.g., 24 hours from now)
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires,
    },
  });

  return verificationToken;
}

export async function verifyAndDeleteToken(identifier: string, token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!verificationToken) {
    throw new Error('Invalid or expired token');
  }

  const expires = new Date(verificationToken.expires);
  if (new Date() > expires) {
    sendVerifyEmail(identifier);
    throw new Error('Token has expired. Please check your email.');
  }

  try {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });
    await prisma.user.update({
      where: {
        email: identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error('Error deleting token:', error);
    throw new Error('Failed to delete the token.');
  }

  console.log('Token verified and deleted successfully');
  return true;
}
