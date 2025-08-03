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
        <body className={`${geistMono.variable} font-sans bg-black text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
