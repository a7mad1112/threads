import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads Application',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep nested layout minimal; document structure and global providers are in the root layout
  return (
    <div className={`${inter.className} bg-dark-1`}>
      <div className="w-full flex justify-center items-center min-h-screen">{children}</div>
    </div>
  );
}
