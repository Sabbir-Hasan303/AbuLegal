import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What areas of law does Abu Legal specialize in?",
    answer:
      "Abu Legal specializes in immigration law, family law, and criminal law across Australia. Our team of experienced attorneys provides comprehensive legal services in these areas to individuals, families, and businesses.",
  },
  {
    question: "How much does an initial consultation cost?",
    answer:
      "We offer initial consultations for $150. During this 60-minute session, we'll assess your case, provide legal advice, explain your options, and outline next steps. This fee may be credited toward future services if you decide to retain our firm.",
  },
  {
    question: "How long will my legal matter take to resolve?",
    answer:
      "The timeline for resolving legal matters varies significantly depending on the complexity of your case, the area of law, court schedules, and many other factors. During your initial consultation, we can provide a more specific estimate based on your unique situation.",
  },
  {
    question: "Can you help with urgent immigration matters?",
    answer:
      "Yes, we understand that immigration matters can be time-sensitive. Our team is equipped to handle urgent cases, including visa cancellations, deportation orders, and time-critical applications. Contact us immediately if you're facing an urgent immigration issue.",
  },
  {
    question: "Do you offer payment plans for legal services?",
    answer:
      "Yes, we offer flexible payment plans to make legal services more accessible. The specific terms depend on your case type and complexity. We'll discuss payment options during your initial consultation to find an arrangement that works for your financial situation.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "For your first appointment, please bring any documents relevant to your legal matter, such as court papers, correspondence, agreements, or identification documents. Also bring a list of questions you'd like to discuss. This helps us provide the most accurate advice for your situation.",
  },
  {
    question: "Can you represent me if I'm not in Sydney?",
    answer:
      "Absolutely. While our main office is in Sydney, we provide legal services across Australia. We can arrange video consultations, phone meetings, and travel as needed for court appearances in other locations. Our team is experienced in handling cases throughout the country.",
  },
  {
    question: "What is your success rate for immigration applications?",
    answer:
      "Our firm maintains a success rate of over 95% for immigration applications. However, each case is unique, and outcomes depend on individual circumstances, changes in immigration policy, and other factors. We'll provide a realistic assessment of your chances during your consultation.",
  },
]

export default function FaqSection() {
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
    <section id="faq" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={(el) => (elementsRef.current[0] = el)} className="opacity-0">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about our legal services</p>
        </div>

        <div ref={(el) => (elementsRef.current[1] = el)} className="opacity-0 mt-12">
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-lg">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div ref={(el) => (elementsRef.current[2] = el)} className="opacity-0 text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see your question here? Contact us directly for more information.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white">Contact Us</Button>
        </div>
      </div>
    </section>
  )
}
