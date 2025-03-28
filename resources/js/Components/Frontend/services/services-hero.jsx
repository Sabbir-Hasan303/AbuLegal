import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ServicesHero () {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const categories = [
        { name: 'Migration Law', count: 3 },
        { name: 'Family Law', count: 3 },
        { name: 'Criminal Law', count: 2 },
        { name: 'Commercial Litigation', count: 4 }
    ]

    return (
        <section className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary to-primary-foreground/90'>
            {/* Decorative elements */}
            <div className='absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl'></div>

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid lg:grid-cols-2 gap-12 min-h-screen items-center py-24'>
                    {/* Left column - Text content */}
                    <div
                        className='flex flex-col justify-center'
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                            opacity: Math.max(0, 1 - scrollY / 1000)
                        }}
                    >
                        <Badge className='bg-secondary text-secondary-foreground mb-6 self-start'>
                            Our Expertise
                        </Badge>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif'>
                            Comprehensive{' '}
                            <span className='text-secondary'>
                                Legal Services
                            </span>{' '}
                            for Every Need
                        </h1>
                        <p className='text-lg text-white/80 mb-8 max-w-xl'>
                            Abu Legal provides expert legal services across
                            multiple practice areas, with a focus on
                            immigration, family, criminal, and commercial law.
                        </p>

                        <div className='flex flex-wrap gap-3 mb-8'>
                            {categories.map(category => (
                                <div
                                    key={category.name}
                                    className='flex items-center bg-white/10 rounded-full px-4 py-2'
                                >
                                    <span className='text-white mr-2'>
                                        {category.name}
                                    </span>
                                    {/* <span className='bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                        {category.count}
                                    </span> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column - Image grid */}
                    <div
                        className='hidden lg:grid grid-cols-2 gap-4 relative'
                        style={{
                            transform: `translateY(${scrollY * -0.1}px)`,
                            opacity: Math.max(0, 1 - scrollY / 1000)
                        }}
                    >
                        <div className='space-y-4'>
                            <div className='rounded-lg overflow-hidden h-48 shadow-lg transform translate-y-12'>
                                <img
                                    src='https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                    alt='Legal Service'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='rounded-lg overflow-hidden h-64 shadow-lg'>
                                <img
                                    src='https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                    alt='Legal Service'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='rounded-lg overflow-hidden h-64 shadow-lg'>
                                <img
                                    src='https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                    alt='Legal Service'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='rounded-lg overflow-hidden h-48 shadow-lg transform translate-y-[-48px]'>
                                <img
                                    src='https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                    alt='Legal Service'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-48 text-center'>
                            <p className='text-primary font-bold text-lg'>
                                12+ Legal Services
                            </p>
                            <p className='text-gray-600 text-sm'>
                                Tailored for you
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider */}
            <div className='absolute bottom-0 left-0 right-0'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1440 320'
                    className='w-full'
                >
                    <path
                        fill='#ffffff'
                        fillOpacity='1'
                        d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                    ></path>
                </svg>
            </div>
        </section>
    )
}
