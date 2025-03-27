import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import EditServicePage from '@/Components/Backend/services/edit'

export default function EditService() {
  return (
    <AuthenticatedLayout>
        <div>
            <EditServicePage />
        </div>
    </AuthenticatedLayout>
  )
}
