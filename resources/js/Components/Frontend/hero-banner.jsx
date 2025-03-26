"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fixed background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Abu Legal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content that moves with scroll */}
      <div
        className="relative z-20 h-full w-full flex flex-col justify-center items-center"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          opacity: Math.max(0, 1 - scrollY / 700),
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif max-w-4xl mx-auto">
            Expert Legal Representation Across Australia
          </h1>
          <h2 className="text-xl md:text-2xl text-secondary font-medium mb-6 max-w-3xl mx-auto">
            Specializing in Immigration, Family & Criminal Law
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Abu Legal provides professional legal services with a focus on client success and satisfaction. Our
            experienced team will guide you through every step of your legal journey.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground group" asChild>
            <a href="/contact">
              Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* Gradient overlay at the bottom for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-30"
        style={{
          opacity: Math.min(1, scrollY / 300),
        }}
      />
    </section>
  )
}