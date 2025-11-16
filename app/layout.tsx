import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecolive",
  description: "Ecolive - Sustainable Living Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://tweakcn.com/live-preview.min.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}

