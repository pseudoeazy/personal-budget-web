import { Geist, Geist_Mono, Open_Sans } from 'next/font/google';

export const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
