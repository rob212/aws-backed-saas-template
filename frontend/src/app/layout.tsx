import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWS SaaS Template - Build Your Next SaaS with AWS & Next.js",
  description: "A production-ready Next.js SaaS starter template with AWS backend infrastructure, featuring Cognito authentication, API Gateway, DynamoDB, and beautiful UI components.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col max-w-screen-xl mx-auto">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}