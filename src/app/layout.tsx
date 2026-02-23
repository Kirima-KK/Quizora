import type { Metadata } from "next";
import "./_components/ui/globals.css";

export const metadata: Metadata = {
  title: "Quizora",
  description: "The ultimate quiz game for curious minds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}
