import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function EditAttorneyPage({ attorney }) {
  const { data, setData, put, processing, errors } = useForm({
    name: attorney.name,
    email: attorney.email,
    phone: attorney.phone,
    role: attorney.role,
    specialties: attorney.specialties,
    social_media: attorney.social_media,
    image: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(route('attorneys.update', attorney.id))
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Attorney</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
            className={errors.role ? 'border-red-500' : ''}
          />
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties</Label>
          <Textarea
            id="specialties"
            value={data.specialties}
            onChange={(e) => setData('specialties', e.target.value)}
            className={errors.specialties ? 'border-red-500' : ''}
          />
          {errors.specialties && <p className="text-red-500 text-sm">{errors.specialties}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_media">Social Media Links</Label>
          <Textarea
            id="social_media"
            value={data.social_media}
            onChange={(e) => setData('social_media', e.target.value)}
            className={errors.social_media ? 'border-red-500' : ''}
          />
          {errors.social_media && <p className="text-red-500 text-sm">{errors.social_media}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          {attorney.image && (
            <div className="mb-2">
              <img src={attorney.image} alt={attorney.name} className="h-20 w-20 object-cover rounded" />
            </div>
          )}
          <Input
            id="image"
            type="file"
            onChange={(e) => setData('image', e.target.files[0])}
            className={errors.image ? 'border-red-500' : ''}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          {processing ? 'Updating...' : 'Update Attorney'}
        </Button>
      </form>
    </div>
  )
}
