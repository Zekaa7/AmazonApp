// app/layout.tsx
"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { Provider } from "react-redux";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Provider>
    </SessionWrapper>
  );
}
