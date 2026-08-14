import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Contact Us - Sytrion | Digital Transformation & Technology Solutions",
  description:
    "Get in touch with Sytrion Data Labs. Reach out to discuss AI-driven transformation, intelligent operations, data engineering, or industry-specific solutions.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
