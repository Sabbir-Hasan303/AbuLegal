import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch with our legal team to discuss your case</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="First Name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="xyz@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+61 4XX XXX XXX" />
                    </div>
                    {/*<div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immigration">Immigration Law</SelectItem>
                          <SelectItem value="family">Family Law</SelectItem>
                          <SelectItem value="criminal">Criminal Law</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>*/}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your legal matter..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                  </div>
                  <CardFooter className="px-0 pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={formSubmitted}
                    >
                      {formSubmitted ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Message Sent
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>

          <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary font-serif">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-secondary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+61285403701" className="text-muted-foreground hover:text-primary">02 8540 3701 (Phone)</a> <br />
                    <a href="tel:+61403343814" className="text-muted-foreground hover:text-primary">0403 343 814 (Mobile)</a> <br />
                    <a href="https://wa.me/+61403343814" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">0403 343 814 (WhatsApp)</a>
                    <p className="text-muted-foreground hover:text-primary">02 9475 0037 (FAX)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-secondary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:abus@lawyer.com" className="text-muted-foreground hover:text-primary">abus@lawyer.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-secondary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Office Address</h4>
                    <p className="text-muted-foreground">Suite 204/309 Pitt St</p>
                    <p className="text-muted-foreground">Sydney, NSW 2000</p>
                    <p className="text-muted-foreground">Australia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-secondary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Office Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:30 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary font-serif">Our Locations</h3>

              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sydney</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">123 Legal Street, Sydney, NSW 2000</p>
                  </CardContent>
                </Card>

                {/*<Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Melbourne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">456 Law Avenue, Melbourne, VIC 3000</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Brisbane</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">789 Justice Road, Brisbane, QLD 4000</p>
                  </CardContent>
                </Card>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}