import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@inertiajs/react'

export default function ServiceBanner ({ service }) {
    const [scrollY, setScrollY] = useState(0)

    // get full domain url
    const fullUrl = window.location.origin

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className='relative h-[80vh] min-h-[400px] w-full overflow-hidden'>
            {/* Fixed background image */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-black/60 z-10' />
                <img
                    src={`${fullUrl}/${service.banner}`}
                    alt={service.title}
                    className='w-full h-full object-cover'
                />
            </div>

            {/* Content that moves with scroll */}
            <div
                className='relative z-20 h-full w-full flex flex-col justify-center'
                style={{
                    transform: `translateY(${scrollY * 0.4}px)`,
                    opacity: Math.max(0, 1 - scrollY / 700)
                }}
            >
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col max-w-3xl'>
                        <div className='flex items-center text-white/80 mb-4 text-sm md:text-base'>
                            <a
                                href='/'
                                className='hover:text-secondary transition-colors'
                            >
                                Home
                            </a>
                            <ChevronRight className='h-4 w-4 mx-2' />
                            <a
                                href='/services'
                                className='hover:text-secondary transition-colors'
                            >
                                Services
                            </a>
                            <ChevronRight className='h-4 w-4 mx-2' />
                            <span className='text-secondary'>
                                {service.title}
                            </span>
                        </div>

                        <Badge className='bg-secondary text-secondary-foreground mb-4 self-start'>
                            {service.category.name}
                        </Badge>

                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif'>
                            {service.title}
                        </h1>

                        <p className='text-lg text-white/90 mb-6 max-w-2xl'>
                            {service.shortDescription}
                        </p>

                        <div className='flex flex-wrap gap-4'>
                            <Link href='/contact'>
                                <Button
                                    size='lg'
                                    className='bg-secondary hover:bg-secondary/90 text-secondary-foreground group'
                                >
                                    For Consultation
                                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gradient overlay at the bottom for smooth transition */}
            <div
                className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-30'
                style={{
                    opacity: Math.min(1, scrollY / 300)
                }}
            />
        </section>
    )
}
