import React from 'react'
import Layout from '@/Layouts/layout'
import ServiceBanner from '@/Components/Frontend/services/single-service/service-banner'
import ServiceContent from '@/Components/Frontend/services/single-service/service-content'
import ServiceSidebar from '@/Components/Frontend/services/single-service/service-sidebar'
import { Head } from '@inertiajs/react'

const services = [
    {
        id: 1,
        slug: 'partner-visa',
        title: 'Partner Visa Applications',
        category: 'Migration Law',
        shortDescription:
            'Reunite with your partner in Australia with our expert partner visa application services.',
        description:
            'Our Partner Visa service helps couples navigate the complex Australian immigration system to reunite and build their lives together in Australia. We understand that every relationship is unique, and our experienced migration lawyers provide personalized guidance throughout the entire application process. From initial assessment to final approval, we ensure your application meets all legal requirements and presents your relationship in the strongest possible light.',
        bannerImage:
            'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        relatedServices: [
            {
                title: 'Prospective Marriage Visa',
                slug: 'prospective-marriage-visa'
            },
            {
                title: 'Parent Visa Applications',
                slug: 'parent-visa'
            },
            {
                title: 'Visa Appeals',
                slug: 'visa-appeals'
            },
            {
                title: 'Citizenship Applications',
                slug: 'citizenship-applications'
            }
        ]
    },
    {
        id: 2,
        slug: 'divorce-separation',
        title: 'Divorce & Separation',
        category: 'Family Law',
        shortDescription:
            'Compassionate legal guidance through divorce and separation proceedings.',
        description:
            "Our Divorce and Separation service provides compassionate and practical legal support during what can be a challenging time in your life. We focus on achieving fair outcomes while minimizing conflict and emotional stress. Our experienced family lawyers will guide you through the legal process, help you understand your rights and obligations, and work toward resolving matters related to property, finances, and children's arrangements.",
        bannerImage:
            'https://images.pexels.com/photos/5699459/pexels-photo-5699459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        relatedServices: [
            {
                title: 'Child Custody & Parenting Arrangements',
                slug: 'child-custody'
            },
            {
                title: 'Property Settlement',
                slug: 'property-settlement'
            },
            {
                title: 'Domestic Violence Protection',
                slug: 'domestic-violence'
            },
            {
                title: 'Mediation Services',
                slug: 'mediation-services'
            }
        ]
    }
]

export function getAllServiceSlugs () {
    return services.map(service => service.slug)
}

export function getServiceBySlug (slug) {
    return services.find(service => service.slug === slug)
}

export function getAllServices () {
    return services
}

export default function SingleService ({ params }) {
    const service = getServiceBySlug(params.slug)

    return (
        <Layout>
            <Head title={service.title} />
            <div className='flex flex-col'>
                <ServiceBanner service={service} />
                <div className='relative z-40 bg-white dark:bg-gray-900'>
                    <div className='container mx-auto px-4 py-12 md:py-16'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            <div className='lg:col-span-2'>
                                <ServiceContent service={service} />
                            </div>
                            <div className='lg:col-span-1'>
                                <ServiceSidebar service={service} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
