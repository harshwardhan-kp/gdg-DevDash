import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Perspective | Multi-Perspective Historical Narratives",
  description:
    "Explore historical events through multiple narratives. View perspectives from different countries, communities, religions, ideologies, and academic viewpoints side-by-side.",
  keywords: [
    "history",
    "multiple perspectives",
    "narratives",
    "historical events",
    "education",
    "AI",
  ],
  authors: [{ name: "Perspective Team" }],
  openGraph: {
    title: "Perspective | Multi-Perspective Historical Narratives",
    description:
      "Explore history through diverse viewpoints. Compare narratives side-by-side.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
