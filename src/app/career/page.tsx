import Navbar from "@/components/Navbar";
import CareerPage from "@/components/CareerPage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Careers - Sytrion | Build What's Next",
  description:
    "Explore open roles at Sytrion Data Labs and apply to join a team building intelligent operations, AI automation, and data-driven transformation.",
};

export default function CareerRoute() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <CareerPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
