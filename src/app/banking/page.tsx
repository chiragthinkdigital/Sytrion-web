import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BankingOperationsPage from "@/components/BankingOperationsPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Banking Operations - Sytrion Data Labs",
  description:
    "Intelligent operations for modern banking — transforming banking operations through domain expertise, AI, automation and data intelligence.",
  openGraph: {
    title: "Banking Operations - Sytrion Data Labs",
    description:
      "Intelligent operations for modern banking — transforming banking operations through domain expertise, AI, automation and data intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function BankingOperations() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <BankingOperationsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
