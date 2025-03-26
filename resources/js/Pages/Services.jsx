import React from 'react'
import Layout from '@/Layouts/layout'
import ServicesHero from '@/components/frontend/services/services-hero'
import ServicesListing from '@/components/frontend/services/services-listing'
import ServicesProcess from '@/components/frontend/services/services-process'
import { Head } from '@inertiajs/react'

export default function Services () {
    return (
        <Layout>
            <Head title='Services' />
            <ServicesHero />
            <ServicesListing />
            <ServicesProcess />
        </Layout>
    )
}
