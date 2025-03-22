import HeroBanner from "@/components/frontend/hero-banner"
import AboutSection from "@/components/frontend/about-section"
import ServicesSection from "@/components/frontend/services-section"
import AttorneysSection from "@/components/frontend/attorneys-section"
import TestimonialsSection from "@/components/frontend/testimonials-section"
// import CaseStudiesSection from "@/components/frontend/case-studies-section"
// import PricingSection from "@/components/frontend/pricing-section"
import FaqSection from "@/components/frontend/faq-section"
// import ContactSection from "@/components/frontend/contact-section"
import CtaSection from "@/components/frontend/cta-section"
import Layout from "@/Layouts/layout"

export default function Home() {
  return (
    <Layout>
    <div className="flex flex-col">
      <HeroBanner />
      <div className="relative z-40 bg-white dark:bg-gray-900">
        <AboutSection />
        <ServicesSection />
        <AttorneysSection />
        {/*<CaseStudiesSection />*/}
        <TestimonialsSection />
        {/*<PricingSection />*/}
        <CtaSection />
        <FaqSection />
        {/*<ContactSection />*/}
      </div>
    </div>
    </Layout>
  )
}