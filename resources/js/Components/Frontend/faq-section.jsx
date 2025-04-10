import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Link } from '@inertiajs/react'


export default function FaqSection ({ faqs }) {
    const sectionRef = useRef(null)
    const elementsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        elementsRef.current.forEach(el => {
            if (el) observer.observe(el)
        })

        return () => {
            elementsRef.current.forEach(el => {
                if (el) observer.unobserve(el)
            })
        }
    }, [])

    return (
        <section
            id='faq'
            ref={sectionRef}
            className='section-padding bg-white dark:bg-gray-900'
        >
            <div className='container mx-auto px-4'>
                <div
                    ref={el => (elementsRef.current[0] = el)}
                    className='opacity-0'
                >
                    <h2 className='section-title'>
                        Frequently Asked Questions
                    </h2>
                    <p className='section-subtitle'>
                        Find answers to common questions about our legal
                        services
                    </p>
                </div>

                <div
                    ref={el => (elementsRef.current[1] = el)}
                    className='opacity-0 mt-12'
                >
                    <Accordion
                        type='single'
                        collapsible
                        className='w-full max-w-3xl mx-auto'
                    >
                        {faqs && faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                >
                                    <AccordionTrigger className='text-left font-medium text-lg'>
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className='text-gray-700 dark:text-gray-300 text-lg'>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        ) : (
                            <p className='text-muted-foreground text-center'>No FAQs found</p>
                        )}
                    </Accordion>
                </div>

                <div
                    ref={el => (elementsRef.current[2] = el)}
                    className='opacity-0 text-center mt-12'
                >
                    <p className='text-muted-foreground mb-4'>
                        Don't see your question here? Contact us directly for
                        more information.
                    </p>
                    <Link href='/contact'>
                        <Button className='bg-primary hover:bg-primary/90 text-white'>
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
