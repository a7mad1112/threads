import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads Application',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a nested layout under the root layout. Do not add <html> or <body> here.
  // The top-level `app/(root)/layout.tsx` is responsible for the document structure
  // and for providing the single <ClerkProvider> for the whole app.
  return (
    <div className={`${inter.className} bg-dark-1`}>
      <div className="w-full flex justify-center items-center min-h-screen">{children}</div>
    </div>
  );
}
