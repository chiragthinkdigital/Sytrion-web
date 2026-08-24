import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HealthcareOperationsPage from "@/components/HealthcareOperationsPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Healthcare Operations - Sytrion Data Labs",
  description:
    "Making healthcare operations work smarter — transforming complex healthcare processes through domain expertise, intelligent automation, data and AI.",
  openGraph: {
    title: "Healthcare Operations - Sytrion Data Labs",
    description:
      "Making healthcare operations work smarter — transforming complex healthcare processes through domain expertise, intelligent automation, data and AI.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function HealthcareOperations() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <HealthcareOperationsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
