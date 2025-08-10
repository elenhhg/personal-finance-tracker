import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Personal Finance Tracker",
  description: "Manage your finances effectively",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
        <body className="animate-gradient font-poppins">
          <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="w-full max-w-[1400px]">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
