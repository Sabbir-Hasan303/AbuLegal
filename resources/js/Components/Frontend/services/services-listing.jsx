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

export default function ServicesListing ({ services, categories }) {
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
            selectedCategory === 'all' || service.category.name === selectedCategory
        const searchMatch =
            searchQuery === '' ||
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase())
        return categoryMatch && searchMatch
    })

    // Get unique categories
    const categoryList = ['all', ...categories.map(cat => cat.name)]

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
                                    {categoryList.map(category => (
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
                                categoryStyles[service.category.name]
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
                                                {service.category.name}
                                            </Badge>
                                        </div>

                                        {/* Content */}
                                        <Link href={`/services/${service.slug}`}>
                                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                                                {service.title}
                                            </h3>
                                        </Link>
                                        <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow'>
                                            {service.short_description}
                                        </p>

                                        {/* Button */}
                                        <Link href={`/services/${service.slug}`}>
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
