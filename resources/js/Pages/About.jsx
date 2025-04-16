import React from 'react'
import Layout from '@/Layouts/layout'
import AboutHero from '@/Components/frontend/about/about-hero'
import AboutHistory from '@/Components/frontend/about/about-history'
import AboutFounder from '@/Components/frontend/about/about-founder'
import AboutMission from '@/Components/frontend/about/about-mission'
import AboutClients from '@/Components/frontend/about/about-clients'
import AboutContact from '@/Components/frontend/about/about-contact'
import AboutCTA from '@/Components/frontend/about/about-cta'
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
