import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/providers/session-provider";
import { auth } from "@/auth";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Traktir",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <AuthProvider session={session}>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
