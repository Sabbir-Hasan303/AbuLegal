import { useRef, useEffect, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowRight, Home, Globe, Shield, File } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"

const icons = {
  "Migration Law": Globe,
  "Family Law": Home,
  "Criminal Law": Shield,
  "Commercial Litigation": File,
}

export default function ServicesSection() {
  const { serviceCategories } = usePage().props
  const [activeTab, setActiveTab] = useState(serviceCategories[0]?.id.toString() || "")
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

  if (!serviceCategories.length) {
    return null
  }

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Our Legal Services</h2>
          <p className="section-subtitle">Comprehensive legal solutions tailored to your specific needs</p>
        </div>

        <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 mt-12">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-transparent h-auto">
              {serviceCategories.map((category) => {
                const ServiceIcon = icons[category.name] || File
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id.toString()}
                    className={cn(
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      "h-auto py-3 px-4 flex items-center gap-2 text-left",
                      "border border-gray-200 dark:border-gray-700 rounded-lg",
                      "transition-all duration-200",
                    )}
                  >
                    <ServiceIcon className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                    </div>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id.toString()} className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service) => (
                    <Card key={service.id} className="service-card">
                      <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.short_description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Link href={`/services/${service.slug}`}>
                          <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link href={`/services`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
