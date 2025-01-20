import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { sendVerifyEmail } from '@/lib/helper';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        if (!user.emailVerified) {
          sendVerifyEmail(user.email!);

          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (isValidPassword) {
          return user;
        }

        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: '1.1',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === '/user' || url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/user`;
    },
    async session({ session, token }) {
      // Fetch minimal data needed for the session
      // console.log('Token in Session:', { token, session });
      session.user.id = token.id as string;
      session.user.role = token.role as string | undefined;

      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to token when logging in
      // console.log('User in JWT:', { user, token });

      if (user) {
        token.id = user?.id || token.id || null;
      }
      return token;
    },
    // async signIn({ user, account, profile }) {
    //   console.log('User:', user);
    //   console.log('Account:', account);
    //   console.log('Profile:', profile);
    //   return true;
    // },
  },
  debug: false,
  secret: process.env.NEXTAUTH_SECRET!,
};
