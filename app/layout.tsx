import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flower - Parenting Community Platform",
  description: "A community platform for parents with intuitive iPod-style navigation",
  keywords: ["parenting", "community", "childcare", "family", "support"],
  authors: [{ name: "Flower Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body 
        className={`${inter.className} antialiased bg-gray-50 text-gray-900`}
        style={{
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'auto'
        }}
      >
        <div 
          id="__next"
          style={{
            minHeight: '100vh',
            height: '100dvh', // Use dynamic viewport height
            display: 'flex',
            flexDirection: 'column',
            overscrollBehavior: 'none',
            WebkitOverflowScrolling: 'auto'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
