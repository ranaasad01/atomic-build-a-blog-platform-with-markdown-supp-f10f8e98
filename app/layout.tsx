import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'DevBlog',
    template: '%s | DevBlog',
  },
  description: 'A blog about web development, TypeScript, React, and modern tooling.',
  openGraph: {
    type: 'website',
    siteName: 'DevBlog',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devblog',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
