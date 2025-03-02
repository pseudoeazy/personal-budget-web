import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { openSans } from './fonts';
import './globals.css';
import UIProvider from '@/components/providers/ui-provider';
import AuthProvider from '@/components/providers/auth-provider';

export const metadata: Metadata = {
  title: 'Calculate smarter, spend wiser - Monthly Budget',
  description: 'Expense tracking made easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${openSans.variable}  antialiased`}>
        <NextTopLoader />
        <AuthProvider>
          <UIProvider>
            <main className="page">{children}</main>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
