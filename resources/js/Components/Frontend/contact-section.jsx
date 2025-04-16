import { useRef, useEffect, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { useForm } from "@inertiajs/react"
import { toast } from "react-hot-toast"

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const elementsRef = useRef([])
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

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

    post(route('contact.store'), {
      onSuccess: () => {
        toast.success('Message sent successfully')
        setData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      },
      onError: (errors) => {
        if (errors.error) {
          toast.error(errors.error)
        } else {
          toast.error('Please check the form for errors')
        }
      }
    })

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
                        <Input id="first-name" placeholder="First Name" required value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Last Name" required value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="xyz@example.com" required value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+61 4XX XXX XXX" required value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
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
                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" type="text" placeholder="Subject" required value={data.subject} onChange={(e) => setData('subject', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your legal matter..."
                        className="min-h-[120px]"
                        required
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
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
                    <a href="mailto:abu@abuleagal.com" className="text-muted-foreground hover:text-primary">abu@abuleagal.com</a>
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
