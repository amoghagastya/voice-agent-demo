import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DentaBot Assistant",
  description: "AI-powered dental appointment scheduling system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.usefathom.com/script.js" data-site="ONYOCTXK" defer></script>
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
