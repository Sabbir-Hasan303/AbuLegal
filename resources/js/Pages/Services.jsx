import React from 'react'
import Layout from '@/Layouts/layout'
import ServicesHero from '@/components/frontend/services/services-hero'
import ServicesListing from '@/components/frontend/services/services-listing'
import ServicesProcess from '@/components/frontend/services/services-process'

export default function Services () {
    return (
        <Layout>
            <ServicesHero />
            <ServicesListing />
            <ServicesProcess />
        </Layout>
    )
}
