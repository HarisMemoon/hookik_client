// src/app/layout.js (server component)
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel - HOOKIK",
  description: "Admin panel for managing users, products, and transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
