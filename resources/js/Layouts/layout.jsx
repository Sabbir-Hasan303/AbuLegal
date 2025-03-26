import React from 'react'
import Navbar from '@/components/frontend/navbar'
import Footer from '@/components/frontend/footer'
import GoToTop from '@/components/frontend/go-to-top'

export default function RootLayout ({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <GoToTop />
        </div>
    )
}
