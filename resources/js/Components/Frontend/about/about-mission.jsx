"use client"

import { useRef, useEffect } from "react"
import { Target, Users, Shield, Globe } from "lucide-react"

export default function AboutMission() {
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
    <section id="mission" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Our Mission & Values</h2>
          <p className="section-subtitle">Committed to service with difference</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 font-serif">
              Our Commitment to Excellence
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              At Abu Legal, we are dedicated to providing exceptional legal services with a focus on client success and
              satisfaction. Our mission is to deliver practical, effective legal solutions while maintaining the highest
              standards of professionalism and integrity.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We believe in fostering long-term relationships with our clients, understanding their unique needs, and
              tailoring our approach to achieve the best possible outcomes. Our team is committed to accessibility,
              responsiveness, and clear communication throughout the legal process.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/10 p-4 rounded-full mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">Excellence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Striving for the highest standards in legal practice
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Client-Focused</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Putting our clients' needs at the center of everything we do
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Integrity</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Maintaining the highest ethical standards</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/10 p-4 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">Global Perspective</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Serving clients from diverse backgrounds worldwide
                </p>
              </div>
            </div>
          </div>

          <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-tr-lg z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-bl-lg z-0"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Abu Legal Team"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}