import Navbar from "@/components/Navbar";
import SolutionsPage from "@/components/SolutionsPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Solutions - Sytrion | AI, Automation, Data & Industry Solutions",
  description:
    "Explore Sytrion's integrated solutions — AI automation & agentic AI, intelligent operations, data engineering, analytics & BI, plus shipping and healthcare operations.",
};

export default function Solutions() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <SolutionsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
