import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../style/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactQueryProvider from "../components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe",
  description: "Discover a unique interactive experience combining ease of navigation with top-notch service. Explore diverse menus and special offers in a seamless and enjoyable user experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Header />
          <main className="bg-body">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
