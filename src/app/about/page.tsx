import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "About Us - Sytrion | Digital Transformation & Technology Solutions",
  description:
    "Learn about Sytrion Data Labs — our mission, values, and the team behind intelligent operations that transform businesses across industries.",
};

export default function About() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <AboutPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
