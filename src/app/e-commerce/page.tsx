import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ECommercePage from "@/components/ECommercePage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "E-Commerce Operations - Sytrion Data Labs",
  description:
    "Intelligent operations behind every digital order — transforming e-commerce operations through domain expertise, AI, automation and data intelligence.",
  openGraph: {
    title: "E-Commerce Operations - Sytrion Data Labs",
    description:
      "Intelligent operations behind every digital order — transforming e-commerce operations through domain expertise, AI, automation and data intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function ECommerce() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <ECommercePage />
      <Footer />
      <BackToTop />
    </main>
  );
}