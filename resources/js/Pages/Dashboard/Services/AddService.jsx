import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AddServicePage from '@/Components/Backend/services/add'

export default function AddService() {
  return (
    <AuthenticatedLayout>
      <div>
        <AddServicePage />
      </div>
    </AuthenticatedLayout>
  )
}
