import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowRight, Home, Globe, Shield } from "lucide-react"

// This would typically come from an API or CMS in a real application
const services = [
  {
    id: "1",
    title: "Migration Law",
    icon: Globe,
    items: [
      {
        title: "Visa Applications",
        description:
          "Assistance with all types of visa applications including work, student, family, and humanitarian visas.",
      },
      {
        title: "Citizenship",
        description: "Guidance through the Australian citizenship application and test process.",
      },
      {
        title: "Appeals",
        description: "Representation for visa refusals and cancellations at the Administrative Appeals Tribunal.",
      },
      {
        title: "Business Migration",
        description: "Specialized services for business owners and investors seeking to migrate to Australia.",
      },
    ],
  },
  {
    id: "2",
    title: "Family Law",
    icon: Home,
    items: [
      {
        title: "Divorce & Separation",
        description: "Legal assistance with divorce applications and separation agreements.",
      },
      { title: "Child Custody", description: "Representation in child custody and parenting arrangement disputes." },
      {
        title: "Property Settlement",
        description: "Expert advice on fair division of assets and financial settlements.",
      },
      {
        title: "Domestic Violence",
        description: "Emergency assistance and representation for domestic violence cases.",
      },
    ],
  },
  {
    id: "3",
    title: "Criminal Law",
    icon: Shield,
    items: [
      {
        title: "Criminal Defense",
        description: "Representation for all criminal matters from minor offenses to serious crimes.",
      },
      {
        title: "Traffic Offenses",
        description: "Defense for driving under influence, speeding, and other traffic violations.",
      },
      { title: "Bail Applications", description: "Assistance with bail applications and conditions." },
      { title: "Appeals", description: "Representation for criminal conviction and sentence appeals." },
    ],
  },
]

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("1")
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
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Our Legal Services</h2>
          <p className="section-subtitle">Comprehensive legal solutions tailored to your specific needs</p>
        </div>

        <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 mt-12">
          <Tabs defaultValue="immigration" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-transparent h-auto">
              {services.map((service) => {
                const ServiceIcon = service.icon
                return (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className={cn(
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      "h-auto py-3 px-4 flex items-center gap-2 text-left",
                      "border border-gray-200 dark:border-gray-700 rounded-lg",
                      "transition-all duration-200",
                    )}
                  >
                    <ServiceIcon className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{service.title}</div>
                    </div>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {service.items.map((item, index) => (
                    <Card key={index} className="service-card">
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    View All {service.title} Services
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}