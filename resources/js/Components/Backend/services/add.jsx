import { Link, usePage, useForm } from '@inertiajs/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import TinyMCE from '@/Components/Backend/tinymce'
import ImageUpload from '@/Components/Backend/ImageUpload'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/Components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AddServicePage() {
    const { categories } = usePage().props
    const [description, setDescription] = useState('')
    const [bannerImage, setBannerImage] = useState(null)
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        short_description: '',
        description: '',
        status: 'active',
        banner: null
    })

    const handleImageChange = (file) => {
        setBannerImage(file)
        setData('banner', file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('services.store'), {
            onSuccess: () => {
                toast.success('Service created successfully')
            },
            onError: (errors) => {
                if (errors.error) {
                    toast.error(errors.error)
                } else {
                    toast.error('Please check the form for errors')
                }
            }
        })
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-2'>
                <Link href='/dashboard/services'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ArrowLeft className='h-4 w-4' />
                    </Button>
                </Link>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        Add Service
                    </h1>
                    <p className='text-muted-foreground mt-2'>
                        Create a new service to display on your website
                    </p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Service Information</CardTitle>
                        <CardDescription>
                            Enter the details for the new service
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='title' className="flex items-center gap-1">
                                    Service Title
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id='title'
                                    placeholder='e.g. Immigration Law'
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    error={errors.title}
                                    required
                                />
                                {errors.title && (
                                    <p className='text-sm text-red-500'>{errors.title}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='category' className="flex items-center gap-1">
                                    Category
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={parseInt(data.category)}
                                    onValueChange={value => setData('category', value)}
                                    required
                                >
                                    <SelectTrigger id='category' className={errors.category ? 'border-red-500' : ''}>
                                        <SelectValue placeholder='Select a category' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories &&
                                            categories.length > 0 &&
                                            categories.map(category => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className='text-sm text-red-500'>{errors.category}</p>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='short-description' className="flex items-center gap-1">
                                Short Description
                                <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id='short-description'
                                placeholder='Brief description (displayed in listings)'
                                className='resize-none'
                                rows={2}
                                value={data.short_description}
                                onChange={e => setData('short_description', e.target.value)}
                                error={errors.short_description}
                                required
                            />
                            <p className='text-xs text-muted-foreground'>
                                Maximum 150 characters. This will be displayed in
                                service listings.
                            </p>
                            {errors.short_description && (
                                <p className='text-sm text-red-500'>{errors.short_description}</p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='description' className="flex items-center gap-1">
                                Full Description
                                <span className="text-red-500">*</span>
                            </Label>
                            <TinyMCE
                                field={{
                                    value: description,
                                    onChange: (content) => {
                                        setDescription(content)
                                        setData('description', content)
                                    }
                                }}
                            />
                            {errors.description && (
                                <p className='text-sm text-red-500'>{errors.description}</p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='banner' className="flex items-center gap-1">
                                Banner Image
                                <span className="text-red-500">*</span>
                            </Label>
                            <ImageUpload
                                onImageChange={handleImageChange}
                                maxSize={2}
                                required
                            />
                            {errors.banner && (
                                <p className='text-sm text-red-500'>{errors.banner}</p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='status' className="flex items-center gap-1">
                                Status
                                <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.status}
                                onValueChange={value => setData('status', value)}
                                required
                            >
                                <SelectTrigger id='status' className={errors.status ? 'border-red-500' : ''}>
                                    <SelectValue placeholder='Select status' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='active'>Active</SelectItem>
                                    <SelectItem value='draft'>Draft</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className='text-sm text-red-500'>{errors.status}</p>
                            )}
                            <p className='text-xs text-muted-foreground'>
                                Only active services will be displayed on the
                                website.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-between border-t p-6'>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Service'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
