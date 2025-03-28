import { useRef, useEffect } from 'react'
import {
    PhoneCall,
    CalendarCheck,
    FileText,
    Users,
    Scale,
    CheckSquare
} from 'lucide-react'

export default function ServicesProcess () {
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

    const processSteps = [
        {
            id: 1,
            title: 'Initial Consultation',
            description:
                'Schedule a consultation to discuss your legal needs and get expert advice.',
            icon: PhoneCall,
            color: 'bg-blue-600'
        },
        {
            id: 2,
            title: 'Case Assessment',
            description:
                "We'll thoroughly assess your case and develop a strategic plan tailored to your needs.",
            icon: FileText,
            color: 'bg-green-600'
        },
        {
            id: 3,
            title: 'Strategy Meeting',
            description:
                'Meet with your legal team to discuss the strategy and next steps for your case.',
            icon: CalendarCheck,
            color: 'bg-purple-600'
        },
        {
            id: 4,
            title: 'Legal Representation',
            description:
                'Our experienced attorneys will represent you throughout the legal process.',
            icon: Scale,
            color: 'bg-red-600'
        },
        {
            id: 5,
            title: 'Regular Updates',
            description:
                'Receive regular updates on your case progress and next steps.',
            icon: Users,
            color: 'bg-amber-600'
        },
        {
            id: 6,
            title: 'Case Resolution',
            description:
                'We work diligently to achieve the best possible outcome for your case.',
            icon: CheckSquare,
            color: 'bg-teal-600'
        }
    ]

    return (
        <section
            ref={sectionRef}
            className='section-padding bg-gray-50 dark:bg-gray-800 relative overflow-hidden'
        >
            {/* Decorative elements */}
            <div className='absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-10'></div>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full'></div>
            <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full'></div>

            <div className='container mx-auto px-4 relative z-20'>
                <div
                    ref={el => (elementsRef.current[0] = el)}
                    className='opacity-0'
                >
                    <h2 className='section-title'>Our Legal Process</h2>
                    <p className='section-subtitle'>
                        How we work with you to achieve the best possible
                        outcome
                    </p>
                </div>

                <div
                    ref={el => (elementsRef.current[1] = el)}
                    className='opacity-0 mt-16'
                >
                    <div className='relative'>
                        {/* Timeline line */}
                        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700'></div>

                        {/* Process steps */}
                        <div className='space-y-24'>
                            {processSteps.map((step, index) => {
                                const StepIcon = step.icon
                                const isEven = index % 2 === 0

                                return (
                                    <div
                                        key={step.id}
                                        className='relative flex items-center justify-between'
                                    >
                                        {/* Content */}
                                        <div
                                            className={`w-5/12 ${
                                                isEven
                                                    ? 'text-right pr-8'
                                                    : 'order-last text-left pl-8'
                                            }`}
                                        >
                                            <h3 className='text-xl font-bold mb-2'>
                                                {step.title}
                                            </h3>
                                            <p className='text-gray-600 dark:text-gray-300'>
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10'>
                                            <div
                                                className={`${step.color} text-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg`}
                                            >
                                                <StepIcon className='h-6 w-6' />
                                            </div>
                                        </div>

                                        {/* Step number */}
                                        <div
                                            className={`w-5/12 ${
                                                isEven
                                                    ? 'order-last text-left pl-8'
                                                    : 'text-right pr-8'
                                            }`}
                                        >
                                            <span className='text-7xl font-bold text-gray-200 dark:text-gray-800'>
                                                0{step.id}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
