import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playroom — Play for the joy of it",
  description: "A friendly play-money games prototype. No real money, just good games.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
