import React from 'react'
import Layout from '@/Layouts/layout'
import AboutHero from '@/components/frontend/about/about-hero'
import AboutHistory from '@/components/frontend/about/about-history'
import AboutFounder from '@/components/frontend/about/about-founder'
import AboutMission from '@/components/frontend/about/about-mission'
import AboutClients from '@/components/frontend/about/about-clients'
import AboutContact from '@/components/frontend/about/about-contact'
import AboutCTA from '@/components/frontend/about/about-cta'

export default function About() {
  return (
    <Layout>
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
