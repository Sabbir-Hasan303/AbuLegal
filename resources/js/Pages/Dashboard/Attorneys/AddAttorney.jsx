import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AddAttorneyPage from '@/Components/Backend/attorneys/add'

export default function AddAttorney() {
  return (
    <AuthenticatedLayout>
        <div>
            <AddAttorneyPage />
        </div>
    </AuthenticatedLayout>
  )
}
