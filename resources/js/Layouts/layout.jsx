import React from 'react'
import Navbar from '@/Components/Frontend/navbar'
import Footer from '@/Components/Frontend/footer'
import GoToTop from '@/Components/Frontend/go-to-top'
import WhatsAppButton from '@/Components/Frontend/whatsapp-button'

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <GoToTop />
            <WhatsAppButton />
        </div>
    )
}
