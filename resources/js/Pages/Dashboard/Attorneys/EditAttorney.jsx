import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import EditAttorneyPage from '@/Components/Backend/attorneys/edit'

export default function EditAttorney({ attorney }) {
  return (
    <AuthenticatedLayout>
        <div>
            <EditAttorneyPage attorney={attorney} />
        </div>
    </AuthenticatedLayout>
  )
}
