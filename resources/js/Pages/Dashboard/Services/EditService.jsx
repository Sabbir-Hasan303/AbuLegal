import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import EditServicePage from '@/Components/Backend/services/edit'

export default function EditService({ service, categories }) {
  return (
    <AuthenticatedLayout>
        <div>
            <EditServicePage service={service} categories={categories} />
        </div>
    </AuthenticatedLayout>
  )
}
