import { useRef, useEffect } from "react"
import { GraduationCap, Briefcase, Award, MapPin } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"

export default function AboutFounder() {
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
    <section id="founder" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Meet Founder</h2>
          <p className="section-subtitle">The vision and leadership behind Abu Legal</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start mt-12">
          <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 md:col-span-4">
            <div className="sticky top-32">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-tr-lg z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-bl-lg z-0"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/images/others/abu_siddique.jpg"
                    alt="Abu Siddique"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Abu Siddique</h3>
                <p className="text-secondary font-medium mb-4">Principal Solicitor & Barrister</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Registered Migration Agent</p>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Sydney, Australia</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 md:col-span-8 space-y-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-6 font-serif">Professional Background</h3>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Abu Siddique, Principal Solicitor and Barrister at Abu Legal, is also a Registered Migration Agent. He
                earned his Bachelor of Law and Master of Laws with honors from the University of Dhaka, Bangladesh,
                before relocating to Australia in 2005 to advance his legal career.
              </p>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                On the Gold Coast, he earned his second Master of Laws in Legal Practice from Bond University, gaining
                admission to the Supreme Court of Queensland in 2006. After gaining diverse experience in Sydney and
                Parramatta, he founded Abu Legal in 2012.
              </p>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Mr. Siddque has represented clients across criminal, civil, and migration law, holding a practicing
                certificate from the Law Society of NSW.
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                His professional details are listed on the NSW Law Society website:{" "}
                <a
                  href="https://www.lawsociety.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  www.lawsociety.com.au
                </a>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                      <GraduationCap className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Education</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Master of Laws (Legal Practice), Bond University</li>
                        <li>Master of Laws, University of Dhaka</li>
                        <li>Bachelor of Law (Honours), University of Dhaka</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Experience</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Founder, Abu Legal (2012-Present)</li>
                        <li>Solicitor at various reputed law firms in Sydney</li>
                        <li>Legal practice in Gold Coast, QLD</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                      <Award className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Qualifications & Memberships</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Admitted to the Supreme Court of Queensland (2006)</li>
                        <li>Practicing Certificate from the Law Society of NSW</li>
                        <li>Registered Migration Agent</li>
                        <li>Member of the Law Society of NSW</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
