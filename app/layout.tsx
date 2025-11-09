import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "H4M STUDIOS - Cinematic Production House",
  description: "Premium video production services. We create stunning commercials, narratives, and music videos that captivate audiences.",
  keywords: ["video production", "cinematography", "commercial", "music video", "narrative film"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
