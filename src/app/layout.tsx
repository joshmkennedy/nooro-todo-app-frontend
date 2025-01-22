import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Nooro Todo App",
  description: "A Fullstack Take Home Task",
	icons:"/nooro_icon.webp"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
		<head>
		</head>
      <body
        className={`antialiased ${inter.className}`}
      >
				<Header/>
				<div className="min-h-screen pb-20 pt-0 gap-16 sm:p-2 xs:px-8 max-w-[740px] mx-auto">
					{children}
				</div>
      </body>
    </html>
  );
}
