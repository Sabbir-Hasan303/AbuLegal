import { useRef, useEffect } from "react"
import { CheckCircle, Award, Users, Scale } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Link } from "@inertiajs/react"

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">About Abu Legal</h2>
          <p className="section-subtitle">
            A premier law firm in Sydney providing exceptional legal services across Australia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-br-lg z-0"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://abulegal.com/images/abusiddique.jpg"
                  alt="Abu Legal Office"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary font-serif">
              Your Trusted Legal Partner Since 2006
            </h3>

            <p className="text-gray-700 dark:text-gray-300">
              ABU Legal Pty Ltd is an Australian-owned law firm delivering practical, client-focused legal solutions with integrity and professionalism. We offer tailored services across Immigration Law, Family Law, Commercial Litigation, and Criminal Law, as well as dispute resolution, employment law, and regulatory compliance. Our dedicated team is committed to building lasting client relationships and achieving the best possible outcomes through clear, strategic advice and strong representation.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Expert Lawers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Highly qualified specialists</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Personalised Services</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tailored to your needs</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Proven Results</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High success rate</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Affordable Rates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transparent pricing</p>
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-white">Learn More About Us</Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover-scale">
            <Award className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-primary mb-2">18+</h3>
            <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover-scale">
            <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-primary mb-2">2,500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Satisfied Clients</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover-scale">
            <Scale className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover-scale">
            <CheckCircle className="h-10 w-10 text-secondary mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-primary mb-2">3,800+</h3>
            <p className="text-gray-600 dark:text-gray-400">Cases Handled</p>
          </div>
        </div>
      </div>
    </section>
  )
}
