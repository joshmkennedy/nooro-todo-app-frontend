import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";


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
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" />
		</head>
      <body
        className={`antialiased`}
      >
				<Header/>
				<div className="min-h-screen pb-20 pt-0 gap-16 sm:p-2 xs:px-8 max-w-[740px] mx-auto">
					{children}
				</div>
      </body>
    </html>
  );
}
