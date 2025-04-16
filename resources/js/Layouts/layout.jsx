import React from 'react'
import Navbar from '@/Components/frontend/navbar'
import Footer from '@/Components/frontend/footer'
import GoToTop from '@/Components/frontend/go-to-top'
import WhatsAppButton from '@/Components/frontend/whatsapp-button'

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
