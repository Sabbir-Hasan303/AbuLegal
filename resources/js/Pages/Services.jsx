import React from 'react'
import Layout from '@/Layouts/layout'
import ServicesHero from '@/Components/frontend/services/services-hero'
import ServicesListing from '@/Components/frontend/services/services-listing'
import ServicesProcess from '@/Components/frontend/services/services-process'
import { Head } from '@inertiajs/react'

export default function Services({ services, categories }) {
    return (
        <Layout>
            <Head title='Services' />
            <ServicesHero />
            <ServicesListing services={services} categories={categories} />
            <ServicesProcess />
        </Layout>
    )
}
