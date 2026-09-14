import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Addis Living | Thoughtful Stays in Addis Ababa",
  description:
    "Thoughtfully prepared homes and full-service property management in Addis Ababa, with backup power, reliable water, fast Wi-Fi, and local support.",
  keywords: [
    "Addis Ababa Airbnb",
    "Ethiopia property management",
    "Bole apartments for rent",
    "Kazanchis diplomatic housing",
    "Addis Airbnb management",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
        {children}
      </body>
    </html>
  );
}
