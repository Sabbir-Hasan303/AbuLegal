import { useRef, useEffect, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowRight, Home, Globe, Shield, File, Briefcase } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
import { Badge } from "@/Components/ui/badge"

// Category colors and icons
const categoryStyles = {
  "Migration Law": {
    color: "bg-blue-600",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    icon: Globe
  },
  "Family Law": {
    color: "bg-green-600",
    lightColor: "bg-green-100",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    icon: Home
  },
  "Criminal Law": {
    color: "bg-red-600",
    lightColor: "bg-red-100",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    icon: Shield
  },
  "Commercial Litigation": {
    color: "bg-purple-600",
    lightColor: "bg-purple-100",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    icon: Briefcase
  }
}

export default function ServicesSection() {
  const { serviceCategories } = usePage().props
  const [activeTab, setActiveTab] = useState(serviceCategories[0]?.id.toString() || "")
  const sectionRef = useRef(null)
  const elementsRef = useRef([])
  const [activeService, setActiveService] = useState(null)

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
                const categoryStyle = categoryStyles[category.name] || {
                  color: "bg-gray-600",
                  icon: File
                }
                const ServiceIcon = categoryStyle.icon
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.services.map((service) => {
                    const categoryStyle = categoryStyles[category.name] || {
                      color: "bg-gray-600",
                      icon: File
                    }
                    const ServiceIcon = categoryStyle.icon

                    return (
                      <div
                        key={service.id}
                        className="group bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                        onMouseEnter={() => setActiveService(service.id)}
                        onMouseLeave={() => setActiveService(null)}
                      >
                        <div className="p-6 flex flex-col h-full">
                          {/* Header with category badge */}
                          <div className="flex justify-between items-start mb-4">
                            <Badge className={cn("py-1.5", categoryStyle.color)}>
                              <ServiceIcon className="h-3.5 w-3.5 mr-1" />
                              {category.name}
                            </Badge>
                          </div>

                          {/* Content */}
                          <Link href={`/services/${service.slug}`}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {service.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                            {service.short_description}
                          </p>

                          {/* Button */}
                          <Link href={`/services/${service.slug}`}>
                            <Button
                              className="bg-primary hover:bg-primary/90 text-white group w-full mt-auto"
                              size="sm"
                            >
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
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
