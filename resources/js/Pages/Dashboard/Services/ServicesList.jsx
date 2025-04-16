import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import ServicesPage from '@/Components/Backend/services/list'

export default function ServicesList({ services }) {
  return (
    <AuthenticatedLayout>
      <div>
        <ServicesPage services={services} />
      </div>
    </AuthenticatedLayout>
  )
}
