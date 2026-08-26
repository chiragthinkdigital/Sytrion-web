import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TravelHospitalityPage from "@/components/TravelHospitalityPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Travel & Hospitality - Sytrion Data Labs",
  description:
    "Intelligent operations behind every journey — transforming travel operations through domain expertise, AI, automation and data intelligence.",
  openGraph: {
    title: "Travel & Hospitality - Sytrion Data Labs",
    description:
      "Intelligent operations behind every journey — transforming travel operations through domain expertise, AI, automation and data intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function TravelHospitality() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <TravelHospitalityPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
