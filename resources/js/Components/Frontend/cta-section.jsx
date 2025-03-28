import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Calendar, MessageSquare } from "lucide-react"

export default function CtaSection() {
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
    <section ref={sectionRef} className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ready to Discuss Your Legal Needs?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Our team of experienced attorneys is here to help you navigate your legal challenges with confidence and
            peace of mind.
          </p>

          <div className="flex justify-center gap-4 w-full">
            <a href="tel:+0285403701" className="text-base font-medium">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </a>

            {/*<Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 group">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="mr-2 h-5 w-5" />
              Live Chat
            </Button>*/}
          </div>
        </div>
      </div>
    </section>
  )
}
