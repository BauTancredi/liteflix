import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "./components/Header";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liteflix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} no-scrollbar overflow-y-scroll uppercase`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
