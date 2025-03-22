import React from "react"
// import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/frontend/navbar"
import Footer from "@/components/frontend/footer"
import GoToTop from "@/components/frontend/go-to-top"
import "../../css/app.css"

export const metadata = {
  title: "Abu Legal | Sydney-based Law Firm",
  description: "Specializing in immigration, migration, family, and criminal law across Australia",
}

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        {/*<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>*/}
          <Navbar />
          <main>{children}</main>
          <Footer />
          <GoToTop />
        {/*</ThemeProvider>*/}
      </body>
    </html>
  )
}