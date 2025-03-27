import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import ServicesPage from '@/Components/Backend/services/list'

export default function ServicesList() {
  return (
    <AuthenticatedLayout>
        <div>
            <ServicesPage />
        </div>
    </AuthenticatedLayout>
  )
}
