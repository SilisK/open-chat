import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Open Chat | Start talking.",
  description: "Respond to any conversation.",
  siteName: "Open Chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-zinc-900"}>{children}</body>
    </html>
  );
}
