import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottombar from '@/components/shared/Bottombar';
import RightSidebar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a nested layout — document (<html>/<body>) and global providers
  // are provided by `app/layout.tsx` so don't add them here.
  return (
    <>
      <Topbar />

      <main className="flex flex-row">
        <LeftSidebar />
        <section className="main-container">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
        {/* @ts-ignore */}
        <RightSidebar />
      </main>

      <Bottombar />
    </>
  );
}
