import HeroBanner from '@/Components/frontend/hero-banner'
import AboutSection from '@/Components/frontend/about-section'
import ServicesSection from '@/Components/frontend/services-section'
import AttorneysSection from '@/Components/frontend/attorneys-section'
import SuccessStoriesSection from "@/Components/frontend/success-stories"
import TestimonialsSection from '@/Components/frontend/testimonials-section'
import FaqSection from '@/Components/frontend/faq-section'
import CtaSection from '@/Components/frontend/cta-section'
import Layout from '@/Layouts/layout'
import { Head } from '@inertiajs/react'

export default function Home({ faqs, attorneys, reviews }) {
    return (
        <Layout>
            <Head title='Home' />
            <div className='flex flex-col'>
                <HeroBanner />
                <div className='relative z-40 bg-white dark:bg-gray-900'>
                    <AboutSection />
                    <ServicesSection />
                    <AttorneysSection attorneys={attorneys} />
                    <SuccessStoriesSection />
                    <TestimonialsSection reviews={reviews} />
                    <CtaSection />
                    <FaqSection faqs={faqs} />
                </div>
            </div>
        </Layout>
    )
}
