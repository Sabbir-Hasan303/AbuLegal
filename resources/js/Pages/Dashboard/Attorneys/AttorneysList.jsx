import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AttorneysPage from '@/Components/Backend/attorneys/list'

export default function AttorneysList({ attorneys }) {
  return (
    <AuthenticatedLayout>
      <div>
        <AttorneysPage attorneys={attorneys} />
      </div>
    </AuthenticatedLayout>
  )
}
