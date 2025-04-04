import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, Calendar, ArrowRight } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function ServiceSidebar ({ service, relatedServices }) {
    const sidebarRef = useRef(null)
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
        <div ref={sidebarRef} className='space-y-6 sticky top-24'>
            {/* Contact Card */}
            <Card
                ref={el => (elementsRef.current[0] = el)}
                className='opacity-0 border-primary/20'
            >
                <CardHeader className='bg-primary text-white rounded-t-lg'>
                    <CardTitle className='text-xl'>Get Expert Advice</CardTitle>
                </CardHeader>
                <CardContent className='p-6 space-y-4'>
                    <p className='text-gray-600 dark:text-gray-300'>
                        Speak with our {service.category.name} specialists for
                        personalized advice on your situation.
                    </p>

                    <div className='space-y-3'>
                        <a href='tel:+61422777333'>
                            <Button className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'>
                                <Phone className='mr-2 h-4 w-4' />
                                Call Us Now
                            </Button>
                        </a>

                        <a href='/contact' className='block'>
                            <Button variant='outline' className='w-full'>
                                <Calendar className='mr-2 h-4 w-4' />
                                Schedule Consultation
                            </Button>
                        </a>

                        <a href='mailto:abu@abulegal.com.au' className='block'>
                            <Button variant='outline' className='w-full'>
                                <Mail className='mr-2 h-4 w-4' />
                                Email Us
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>

            {/* Related Services */}
            {relatedServices && relatedServices.length > 0 && (
                <Card
                    ref={el => (elementsRef.current[1] = el)}
                    className='opacity-0'
                >
                    <CardHeader className='pb-3'>
                        <CardTitle>Related Services</CardTitle>
                    </CardHeader>
                    <CardContent className='p-6 pt-0'>
                        <ul className='space-y-3'>
                            {relatedServices.map((relatedService, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/services/${relatedService.slug}`}
                                        className='flex items-center text-gray-700 dark:text-gray-300 hover:text-primary transition-colors'
                                    >
                                        <ArrowRight className='h-4 w-4 mr-2 text-secondary' />
                                        {relatedService.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
