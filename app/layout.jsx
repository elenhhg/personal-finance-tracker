// app/layout.jsx
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Personal Finance Tracker",
  description: "Manage your finances effectively",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`animate-gradient ${geistMono.variable}`}>
          <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="w-full max-w-[1400px]">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
