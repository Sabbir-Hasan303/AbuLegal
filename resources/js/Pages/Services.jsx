import React from 'react'
import Layout from '@/Layouts/layout'
import ServicesHero from '@/Components/Frontend/services/services-hero'
import ServicesListing from '@/Components/Frontend/services/services-listing'
import ServicesProcess from '@/Components/Frontend/services/services-process'
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
