import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

export default function AboutHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Fixed background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Abu Legal Office"
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
            About Abu Legal
          </h1>
          <h2 className="text-xl md:text-2xl text-secondary font-medium mb-6 max-w-3xl mx-auto">
            Committed to Service with Difference
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Founded in 2012, Abu Legal has established itself as a premier law firm in Sydney, providing exceptional
            legal services across Australia.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground group" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
