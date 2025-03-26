import HeroBanner from '@/components/frontend/hero-banner'
import AboutSection from '@/components/frontend/about-section'
import ServicesSection from '@/components/frontend/services-section'
import AttorneysSection from '@/components/frontend/attorneys-section'
import TestimonialsSection from '@/components/frontend/testimonials-section'
import FaqSection from '@/components/frontend/faq-section'
import CtaSection from '@/components/frontend/cta-section'
import Layout from '@/Layouts/layout'
import { Head } from '@inertiajs/react'

export default function Home () {
    return (
        <Layout>
            <Head title='Home' />
            <div className='flex flex-col'>
                <HeroBanner />
                <div className='relative z-40 bg-white dark:bg-gray-900'>
                    <AboutSection />
                    <ServicesSection />
                    <AttorneysSection />
                    <TestimonialsSection />
                    <CtaSection />
                    <FaqSection />
                </div>
            </div>
        </Layout>
    )
}
