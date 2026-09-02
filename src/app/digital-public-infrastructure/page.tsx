import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DigitalPublicInfrastructurePage from "@/components/DigitalPublicInfrastructurePage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Digital Public Infrastructure - Sytrion Data Labs",
  description:
    "Building secure, interoperable and intelligent digital ecosystems that connect people, institutions and services at scale.",
  openGraph: {
    title: "Digital Public Infrastructure - Sytrion Data Labs",
    description:
      "Building secure, interoperable and intelligent digital ecosystems that connect people, institutions and services at scale.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function DigitalPublicInfrastructure() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <DigitalPublicInfrastructurePage />
      <Footer />
      <BackToTop />
    </main>
  );
}
