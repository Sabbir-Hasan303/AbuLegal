import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit ({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title='Profile' />

            <div className=''>
                <div className='space-y-6 sm:px-6 lg:px-8'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            Profile
                        </h1>
                        <p className='text-muted-foreground mt-2'>
                            Manage your profile information
                        </p>
                    </div>
                    <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800'>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className='max-w-xl'
                        />
                    </div>

                    <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800'>
                        <UpdatePasswordForm className='max-w-xl' />
                    </div>

                    <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800'>
                        <DeleteUserForm className='max-w-xl' />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
