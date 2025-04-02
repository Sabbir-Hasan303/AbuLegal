import { Link, useForm } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import TinyMCE from '@/Components/Backend/tinymce'
import ImageUpload from '@/Components/Backend/ImageUpload'
import { useState, useRef } from 'react'

export default function EditServicePage({ service, categories }) {
  const [description, setDescription] = useState(service.description)
  const fileInputRef = useRef(null)

  // get full domain
  const domain = window.location.origin

  const { data, setData, post, processing, errors } = useForm({
    title: service.title,
    category: service.category,
    short_description: service.short_description,
    description: service.description,
    status: service.status,
    banner: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('services.update', service.slug), {
      preserveScroll: true,
      onSuccess: () => {
        // Reset file input after successful submission
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    })
  }

  const handleImageChange = (file) => {
    setData('banner', file)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/services">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
          <p className="text-muted-foreground mt-2">Update the details for "{service.title}"</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
            <CardDescription>Modify the service details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={data.category}
                  onValueChange={(value) => setData('category', parseInt(value))}
                >
                  <SelectTrigger id="category" className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={parseInt(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Textarea
                id="short-description"
                value={data.short_description}
                onChange={(e) => setData('short_description', e.target.value)}
                className={`resize-none ${errors.short_description ? 'border-red-500' : ''}`}
                rows={2}
              />
              {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
              <p className="text-xs text-muted-foreground">
                Maximum 150 characters. This will be displayed in service listings.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <TinyMCE
                field={{
                  value: data.description,
                  onChange: (content) => setData('description', content)
                }}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner">Banner Image</Label>
              <ImageUpload
                onImageChange={handleImageChange}
                currentImage={`${domain}/${service.banner}`}
                maxSize={2}
              />
              {errors.banner && <p className="text-sm text-red-500">{errors.banner}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={data.status}
                onValueChange={(value) => setData('status', value)}
              >
                <SelectTrigger id="status" className={errors.status ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
              <p className="text-xs text-muted-foreground">Only active services will be displayed on the website.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/dashboard/services">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Updating...' : 'Update Service'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
