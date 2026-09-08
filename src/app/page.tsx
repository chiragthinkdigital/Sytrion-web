import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Solutions from "@/components/Solutions";
import Industries from "@/components/Industries";
import WhySytrion from "@/components/WhySytrion";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Philosophy />
        <Industries />
        <Solutions />
        <WhySytrion />
        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
