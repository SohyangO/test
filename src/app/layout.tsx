import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from './providers';
import './globals.css';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import type { User } from '@supabase/supabase-js';
import Header from '@/components/header/Header';
import { getSession } from '@/api/auth/getSession';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<User | null>({
    queryKey: ['auth'],
    queryFn: getSession
  });

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="container">
              <Header />
              {children}
              <Footer />
            </div>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
