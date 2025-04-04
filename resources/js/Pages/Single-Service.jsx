import React from 'react'
import Layout from '@/Layouts/layout'
import ServiceBanner from '@/Components/Frontend/services/single-service/service-banner'
import ServiceContent from '@/Components/Frontend/services/single-service/service-content'
import ServiceSidebar from '@/Components/Frontend/services/single-service/service-sidebar'
import { Head } from '@inertiajs/react'

export default function SingleService({ service, relatedServices }) {
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
                                <ServiceSidebar service={service} relatedServices={relatedServices} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
