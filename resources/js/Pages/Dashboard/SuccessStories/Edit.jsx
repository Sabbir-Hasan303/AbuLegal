import { Head, useForm, router } from "@inertiajs/react"
import { ArrowLeft, Clock, Scale, CheckCircle2, Trophy, Target, Lightbulb } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { toast } from 'react-hot-toast'
import ImageUpload from "@/Components/Backend/ImageUpload"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useState } from 'react'

export default function SuccessStoryEdit({ successStory, categories }) {
  const [iconPreview, setIconPreview] = useState(null)
  const domain = window.location.origin

  const { data, setData, post, processing, errors } = useForm({
    title: successStory.title,
    category: successStory.category.id,
    client_name: successStory.client_name,
    date: new Date(successStory.date).toISOString().split('T')[0],
    image: null,
    outcome: successStory.outcome,
    quote: successStory.quote,
    key_metric: successStory.key_metric,
    key_metric_label: successStory.key_metric_label,
    key_metric_icon: null
  })

  const handleImageChange = (file) => {
    setData('image', file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route("success-stories.update", successStory.id), {
      onSuccess: () => {
        toast.success("Success story updated successfully")
      },
      onError: (errors) => {
        if (errors.error) {
          toast.error(errors.error)
        } else {
          toast.error("Failed to update success story")
        }
      }
    })
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Success Story" />

      <div className="">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.visit(route("success-stories.list"))}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold tracking-tight">Edit Success Story</h1>
            <p className="text-muted-foreground">Update the success story details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Success Story Details</CardTitle>
              <CardDescription>Update the information for the success story</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                    placeholder="Enter story title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={data.category}
                    onValueChange={(value) => setData('category', parseInt(value))}
                    required
                  >
                    <SelectTrigger id="category" className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.length > 0 &&
                        categories.map(category => (
                          <SelectItem
                            key={category.id}
                            value={parseInt(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    value={data.client_name}
                    onChange={(e) => setData('client_name', e.target.value)}
                    required
                    placeholder="Enter client name"
                    className={errors.client_name ? 'border-red-500' : ''}
                  />
                  {errors.client_name && <p className="text-sm text-red-500">{errors.client_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    required
                    className={errors.date ? 'border-red-500' : ''}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Story Image</Label>
                <ImageUpload
                  onImageChange={handleImageChange}
                  currentImage={domain + '/' + successStory.image}
                />
                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep the current image
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Textarea
                  id="outcome"
                  name="outcome"
                  value={data.outcome}
                  onChange={(e) => setData('outcome', e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the outcome of the case"
                  className={errors.outcome ? 'border-red-500' : ''}
                />
                {errors.outcome && <p className="text-sm text-red-500">{errors.outcome}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Client Quote</Label>
                <Textarea
                  id="quote"
                  name="quote"
                  value={data.quote}
                  onChange={(e) => setData('quote', e.target.value)}
                  required
                  rows={4}
                  placeholder="Enter client's testimonial"
                  className={errors.quote ? 'border-red-500' : ''}
                />
                {errors.quote && <p className="text-sm text-red-500">{errors.quote}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="key_metric">Key Metric</Label>
                  <Input
                    id="key_metric"
                    name="key_metric"
                    value={data.key_metric}
                    onChange={(e) => setData('key_metric', e.target.value)}
                    required
                    placeholder="e.g. 8 months, 50/50, 100%"
                    className={errors.key_metric ? 'border-red-500' : ''}
                  />
                  {errors.key_metric && <p className="text-sm text-red-500">{errors.key_metric}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key_metric_label">Key Metric Label</Label>
                  <Input
                    id="key_metric_label"
                    name="key_metric_label"
                    value={data.key_metric_label}
                    onChange={(e) => setData('key_metric_label', e.target.value)}
                    required
                    placeholder="e.g. Processing Time, Custody Share"
                    className={errors.key_metric_label ? 'border-red-500' : ''}
                  />
                  {errors.key_metric_label && <p className="text-sm text-red-500">{errors.key_metric_label}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="key_metric_icon">Key Metric Icon</Label>
                  {(iconPreview || successStory.key_metric_icon) && (
                    <div className="mb-4">
                      <img
                        src={iconPreview || (domain + '/' + successStory.key_metric_icon)}
                        alt="Icon Preview"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <Input
                    id="key_metric_icon"
                    type="file"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        setData('key_metric_icon', file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setIconPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={errors.key_metric_icon ? 'border-red-500' : ''}
                    accept="image/*"
                  />
                  {errors.key_metric_icon && <p className="text-sm text-red-500">{errors.key_metric_icon}</p>}
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to keep the current icon
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  {processing ? "Updating..." : "Update Success Story"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
