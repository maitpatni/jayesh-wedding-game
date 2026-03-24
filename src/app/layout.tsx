import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayesh ❤ Shubhami — A Wedding Journey",
  description: "An interactive wedding story — scroll through our journey",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-ivory-100 antialiased">{children}</body>
    </html>
  );
}
