"use client"

import { useRef, useEffect } from "react"
import { Building, Users, Globe, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutClients() {
  const sectionRef = useRef(null)
  const elementsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <section id="clients" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Our Clients</h2>
          <p className="section-subtitle">Serving a diverse range of clients across Australia and worldwide</p>
        </div>

        <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Government Agencies</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Providing legal services to various government departments and agencies
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-secondary/10 p-4 rounded-full mb-4">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-2">Multinational Corporations</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supporting global businesses with their legal needs in Australia
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-secondary/10 p-4 rounded-full mb-4">
                    <Briefcase className="h-8 w-8 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-2">Small Businesses</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Helping local entrepreneurs navigate legal challenges and opportunities
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Individuals</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supporting people from diverse cultural and political backgrounds
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 mt-16">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-6 font-serif text-center">Global Reach</h3>

            <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
              Our clients come from all corners of the world, including America, Africa, Asia, and Europe. We provide
              expert legal support to individuals and businesses globally.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-primary/5 p-4 rounded-full mb-3">
                  <img src="https://cdn.freebiesupply.com/logos/large/2x/united-states-of-america-logo-svg-vector.svg" alt="America" className="h-10 w-10" />
                </div>
                <h4 className="font-medium">America</h4>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-primary/5 p-4 rounded-full mb-3">
                  <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/europe-26-logo.png" alt="Europe" className="h-10 w-10" />
                </div>
                <h4 className="font-medium">Europe</h4>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-primary/5 p-4 rounded-full mb-3">
                  <img src="https://w7.pngwing.com/pngs/129/233/png-transparent-east-asia-europe-map-globe-continent-map-text-globe-logo.png" alt="Asia" className="h-10 w-10" />
                </div>
                <h4 className="font-medium">Asia</h4>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-primary/5 p-4 rounded-full mb-3">
                  <img src="https://t4.ftcdn.net/jpg/06/96/07/55/360_F_696075532_ZLCalw5ZG2EL815z5a3mrMrCrDNqbLKy.jpg" alt="Africa" className="h-10 w-10" />
                </div>
                <h4 className="font-medium">Africa</h4>
              </div>
            </div>
          </div>
        </div>

        <div ref={(el) => (elementsRef.current[3] = el)} className="opacity-0 mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Our team provides expert legal support in areas such as immigration litigation, commercial leasing, family
            law, and criminal matters to clients from diverse backgrounds and industries.
          </p>
        </div>
      </div>
    </section>
  )
}