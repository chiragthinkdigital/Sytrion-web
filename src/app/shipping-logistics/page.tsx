import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ShippingLogisticsPage from "@/components/ShippingLogisticsPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Shipping & Logistics (IBS & F&A) - Sytrion Data Labs",
  description:
    "Transforming shipping and logistics operations through domain expertise, AI, automation and data intelligence.",
  openGraph: {
    title: "Shipping & Logistics (IBS & F&A) - Sytrion Data Labs",
    description:
      "Transforming shipping and logistics operations through domain expertise, AI, automation and data intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Sytrion Data Labs",
  },
};

export default function ShippingLogistics() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <ShippingLogisticsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
