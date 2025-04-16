import HeroBanner from '@/Components/Frontend/hero-banner'
import AboutSection from '@/Components/Frontend/about-section'
import ServicesSection from '@/Components/Frontend/services-section'
import AttorneysSection from '@/Components/Frontend/attorneys-section'
import SuccessStoriesSection from "@/Components/Frontend/success-stories"
import TestimonialsSection from '@/Components/Frontend/testimonials-section'
import FaqSection from '@/Components/Frontend/faq-section'
import CtaSection from '@/Components/Frontend/cta-section'
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
