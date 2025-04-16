import React from 'react'
import Layout from '@/Layouts/layout'
import AboutHero from '@/Components/Frontend/about/about-hero'
import AboutHistory from '@/Components/Frontend/about/about-history'
import AboutFounder from '@/Components/Frontend/about/about-founder'
import AboutMission from '@/Components/Frontend/about/about-mission'
import AboutClients from '@/Components/Frontend/about/about-clients'
import AboutContact from '@/Components/Frontend/about/about-contact'
import AboutCTA from '@/Components/Frontend/about/about-cta'
import { Head } from '@inertiajs/react'
export default function About() {
    return (
        <Layout>
            <Head title='About' />
            <AboutHero />
            <AboutHistory />
            <AboutFounder />
            <AboutMission />
            <AboutClients />
            <AboutContact />
            {/* <AboutCTA /> */}
        </Layout>
    )
}
