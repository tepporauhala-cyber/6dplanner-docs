import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6DPlanner eGuide",
  description: "6DPlanner documentation and user guide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body className="bg-brand-dark text-brand-text">{children}</body>
    </html>
  );
}
