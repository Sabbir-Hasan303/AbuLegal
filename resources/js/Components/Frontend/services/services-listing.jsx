'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
    ArrowRight,
    Globe,
    Home,
    Shield,
    Briefcase,
    CheckCircle,
    Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Link } from '@inertiajs/react'

// Service data
const services = [
    {
        id: 1,
        title: 'Visa Applications',
        category: 'Migration Law',
        icon: Globe,
        description:
            'Expert assistance with all types of visa applications including work, student, family, and humanitarian visas.',
        image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 2,
        title: 'Citizenship Applications',
        category: 'Migration Law',
        icon: Globe,
        description:
            'Comprehensive guidance through the Australian citizenship application and test process.',
        image: 'https://images.pexels.com/photos/4427616/pexels-photo-4427616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 3,
        title: 'Migration Appeals',
        category: 'Migration Law',
        icon: Globe,
        description:
            'Professional representation for visa refusals and cancellations at the Administrative Appeals Tribunal.',
        image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 4,
        title: 'Divorce & Separation',
        category: 'Family Law',
        icon: Home,
        description:
            'Compassionate legal assistance with divorce applications and separation agreements.',
        image: 'https://images.pexels.com/photos/5699459/pexels-photo-5699459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 5,
        title: 'Child Custody',
        category: 'Family Law',
        icon: Home,
        description:
            'Dedicated representation in child custody and parenting arrangement disputes.',
        image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 6,
        title: 'Property Settlement',
        category: 'Family Law',
        icon: Home,
        description:
            'Expert advice on fair division of assets and financial settlements in family law matters.',
        image: 'https://images.pexels.com/photos/5699437/pexels-photo-5699437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 7,
        title: 'Criminal Defense',
        category: 'Criminal Law',
        icon: Shield,
        description:
            'Strong representation for all criminal matters from minor offenses to serious crimes.',
        image: 'https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 8,
        title: 'Traffic Offenses',
        category: 'Criminal Law',
        icon: Shield,
        description:
            'Specialized defense for driving under influence, speeding, and other traffic violations.',
        image: 'https://images.pexels.com/photos/5699482/pexels-photo-5699482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 9,
        title: 'Commercial Contracts',
        category: 'Commercial Litigation',
        icon: Briefcase,
        description:
            'Drafting, reviewing, and negotiating commercial contracts to protect your business interests.',
        image: 'https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 10,
        title: 'Business Disputes',
        category: 'Commercial Litigation',
        icon: Briefcase,
        description:
            'Resolution of business disputes through negotiation, mediation, or litigation when necessary.',
        image: 'https://images.pexels.com/photos/5699458/pexels-photo-5699458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 11,
        title: 'Debt Recovery',
        category: 'Commercial Litigation',
        icon: Briefcase,
        description:
            'Effective strategies for recovering debts owed to your business.',
        image: 'https://images.pexels.com/photos/5699457/pexels-photo-5699457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 12,
        title: 'Employment Law',
        category: 'Commercial Litigation',
        icon: Briefcase,
        description:
            'Advice and representation on employment contracts, disputes, and workplace issues.',
        image: 'https://images.pexels.com/photos/5699455/pexels-photo-5699455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
]

// Category colors and icons
const categoryStyles = {
    'Migration Law': {
        color: 'bg-blue-600',
        lightColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-200',
        icon: Globe
    },
    'Family Law': {
        color: 'bg-green-600',
        lightColor: 'bg-green-100',
        textColor: 'text-green-600',
        borderColor: 'border-green-200',
        icon: Home
    },
    'Criminal Law': {
        color: 'bg-red-600',
        lightColor: 'bg-red-100',
        textColor: 'text-red-600',
        borderColor: 'border-red-200',
        icon: Shield
    },
    'Commercial Litigation': {
        color: 'bg-purple-600',
        lightColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        borderColor: 'border-purple-200',
        icon: Briefcase
    }
}

export default function ServicesListing () {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [activeService, setActiveService] = useState(null)
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

    // Filter services based on selected category and search query
    const filteredServices = services.filter(service => {
        const categoryMatch =
            selectedCategory === 'all' || service.category === selectedCategory
        const searchMatch =
            searchQuery === '' ||
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        return categoryMatch && searchMatch
    })

    // Get unique categories
    const categories = [
        'all',
        ...new Set(services.map(service => service.category))
    ]

    return (
        <section
            id='services'
            ref={sectionRef}
            className='bg-white dark:bg-gray-900'
        >
            <div className='container mx-auto px-4'>
                <div
                    ref={el => (elementsRef.current[0] = el)}
                    className='opacity-0'
                >
                    <h2 className='section-title'>Legal Services</h2>
                    <p className='section-subtitle'>
                        Expert legal solutions tailored to your specific needs
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div
                    ref={el => (elementsRef.current[1] = el)}
                    className='opacity-0 mt-8 mb-12'
                >
                    <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm'>
                        <div className='flex flex-col md:flex-row gap-4 items-center'>
                            <div className='relative w-full md:w-1/3'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                                <Input
                                    type='text'
                                    placeholder='Search services...'
                                    className='pl-10 bg-white dark:bg-gray-700'
                                    value={searchQuery}
                                    onChange={e =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                            <div className='flex-1 w-full md:w-auto'>
                                <div className='flex flex-wrap gap-2 justify-center md:justify-end'>
                                    {categories.map(category => (
                                        <Badge
                                            key={category}
                                            variant={
                                                selectedCategory === category
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className={cn(
                                                'cursor-pointer text-sm py-2 px-4 capitalize',
                                                selectedCategory === category &&
                                                    category !== 'all' &&
                                                    categoryStyles[category]
                                                        ?.color,
                                                selectedCategory !== category &&
                                                    'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            )}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }
                                        >
                                            {category === 'all'
                                                ? 'All Services'
                                                : category}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid with Uniform Cards */}
                <div
                    ref={el => (elementsRef.current[2] = el)}
                    className='opacity-0'
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {filteredServices.map(service => {
                            const categoryStyle =
                                categoryStyles[service.category]
                            const ServiceIcon = categoryStyle.icon

                            return (
                                <div
                                    key={service.id}
                                    className='group bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden'
                                    onMouseEnter={() =>
                                        setActiveService(service.id)
                                    }
                                    onMouseLeave={() => setActiveService(null)}
                                >
                                    <div className='p-6 flex flex-col h-full'>
                                        {/* Header with category and popular badge */}
                                        <div className='flex justify-between items-start mb-4'>
                                            <Badge
                                                className={cn(
                                                    'py-1.5',
                                                    categoryStyle.color
                                                )}
                                            >
                                                <ServiceIcon className='h-3.5 w-3.5 mr-1' />
                                                {service.category}
                                            </Badge>
                                        </div>

                                        {/* Content */}
                                        {/* <Link href={`/services/${service.slug}`}>
                                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                                                {service.title}
                                            </h3>
                                        </Link> */}
                                        <Link href={`/services/partner-visa`}>
                                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                                                {service.title}
                                            </h3>
                                        </Link>
                                        <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow'>
                                            {service.description}
                                        </p>

                                        {/* Button */}
                                        <Link href={`/services/partner-visa`}>
                                            <Button
                                                className='bg-primary hover:bg-primary/90 text-white group w-full mt-auto'
                                                size='sm'
                                        >
                                            Learn More
                                                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* No Results Message */}
                {filteredServices.length === 0 && (
                    <div className='text-center py-12'>
                        <h3 className='text-xl font-medium mb-2'>
                            No services found
                        </h3>
                        <p className='text-muted-foreground mb-4'>
                            Try adjusting your search or filter criteria
                        </p>
                        <Button
                            variant='outline'
                            onClick={() => {
                                setSelectedCategory('all')
                                setSearchQuery('')
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}

                {/* Call to Action */}
                <div
                    ref={el => (elementsRef.current[3] = el)}
                    className='opacity-0 mt-16 text-center'
                >
                    <div className='bg-primary/5 border border-primary/10 rounded-xl p-8'>
                        <h3 className='text-2xl font-bold text-primary mb-4'>
                            Need a Custom Legal Solution?
                        </h3>
                        <p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
                            Our team of experienced attorneys can provide
                            tailored legal services to address your specific
                            needs.
                        </p>
                        <Link href='/contact'>
                            <Button className='bg-primary hover:bg-primary/90 text-white'>
                                Request a Consultation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
