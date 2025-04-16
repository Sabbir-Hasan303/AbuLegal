import React from 'react'
import Layout from '@/Layouts/layout'
import ContactSection from '@/Components/Frontend/contact-section'
import { Head } from '@inertiajs/react'

export default function Contact() {
    return (
        <Layout>
            <Head title='Contact' />
            <ContactSection />
        </Layout>
    )
}
