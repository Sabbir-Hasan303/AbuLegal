import { useRef, useEffect } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutContact() {
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
    <section id="contact" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Contact Information</h2>
          <p className="section-subtitle">Get in touch with our legal team</p>
        </div>

        <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-secondary mr-2" />
                    Office Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Suite 204/309 Pitt St
                    <br />
                    Sydney, NSW 2000
                    <br />
                    Australia
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 text-secondary mr-2" />
                    Phone & Fax
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Phone: 02 8540 3701
                    <br />
                    Mobile: 0403 343 814
                    <br />
                    WhatsApp: 0403 343 814
                    <br />
                    Fax: 02 9475 0037
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 text-secondary mr-2" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">abus@lawyer.com</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 text-secondary mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 5:30 PM
                    <br />
                    Saturday: By appointment
                    <br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 mt-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="aspect-w-16 aspect-h-9 w-full h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8872318671197!2d151.2056903!3d-33.8734269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3c3d6c610f%3A0x1d017d69037a07c0!2s309%20Pitt%20St%2C%20Sydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2sus!4v1648226556956!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Abu Legal Office Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
