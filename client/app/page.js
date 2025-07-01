import NavBar from "./ui/components/nav-bar";
import Hero from "./ui/landing-page/hero-section";
import CompanyLogos from "./ui/landing-page/company-logos";
import Features from "./ui/landing-page/features-section";
import OwnFeatures from "./ui/landing-page/own-featues-section";
import Benefits from "./ui/landing-page/benefits-section";
import Testimonials from "./ui/landing-page/testimonials-section";
import Footer from "./ui/landing-page/footer";

export default function CloustyLanding() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto">
        <NavBar />
        <Hero />
        <CompanyLogos />
        <Features />
        <OwnFeatures />
        <Benefits />
      </div>
      <div className="bg-[#161C28] text-white">
        <div className=" container mx-auto">
          <Testimonials />
          <Footer />
        </div>
      </div>
    </div>
  );
}
