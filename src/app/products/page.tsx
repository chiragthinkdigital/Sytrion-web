import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/ProductsPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Solutions - Sytrion | Intelligent Operations & Technology Solutions",
  description:
    "Explore Sytrion's portfolio of technology-enabled solutions — AI automation, intelligent operations, data engineering, analytics, and industry-specific services.",
};

export default function Products() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ProductsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
