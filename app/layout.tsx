import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import ConditionalLayout from "./ConditionalLayout";

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
        <PageTransition>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </PageTransition>
      </body>
    </html>
  );
}
