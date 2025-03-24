"use client"

import { useRef, useEffect } from "react"
import { CheckCircle, Award, Users, Scale } from "lucide-react"

export default function AboutHistory() {
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
    <section id="history" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Our History</h2>
          <p className="section-subtitle">A journey of legal excellence and client dedication since 2012</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-br-lg z-0"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Abu Legal Office"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary font-serif">Established in Sydney CBD</h3>

            <p className="text-gray-700 dark:text-gray-300">
              Mr. Abu Siddque was admitted as a Solicitor and Barrister in Australia in 2006. He established this legal
              practice as a commercial and immigration law firm in Sydney CBD in 2012. Before founding Abu Legal, he
              worked in various reputed law firms across Sydney, NSW, and Gold Coast, QLD.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Mr. Siddque is highly skilled and oversees business, employment, and migration services. Over the past
              five years, we have supported numerous companies and individuals.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Conveniently located near Town Hall Train Station and the Bus terminal, our firm is dedicated to
              "Committed to Service with Difference," fostering long-term relationships with our clients, including
              reputable Australian businesses and individuals.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Global Reach</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Serving clients worldwide</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Diverse Expertise</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Multiple practice areas</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Client-Focused</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Building lasting relationships</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Convenient Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Central Sydney CBD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}