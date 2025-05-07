import { Head } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/Components/ui/select'
import { toast } from 'react-hot-toast'
import ImageUpload from '@/Components/Backend/ImageUpload'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Clock, Scale, CheckCircle2, Trophy, Target, Lightbulb } from 'lucide-react'
import { useForm, router } from '@inertiajs/react'
import { useState } from 'react'

export default function SuccessStoryCreate ({ categories }) {
    const [image, setImage] = useState(null)
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        client_name: '',
        date: '',
        image: null,
        outcome: '',
        quote: '',
        key_metric: '',
        key_metric_label: '',
        key_metric_icon: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setData(name, value)
    }

    const handleSelectChange = (name, value) => {
        setData(name, value)
    }

    const handleImageChange = (file) => {
        setImage(file)
        setData('image', file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate required fields
        if (!image) {
            toast.error('Please upload an image');
            return;
        }

        post(route('success-stories.store'), {
            onSuccess: () => {
                toast.success('Success story created successfully')
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
        <AuthenticatedLayout>
            <Head title='Add Success Story' />

            <div className=''>
                <div className='flex items-center mb-6'>
                    <Button
                        variant='ghost'
                        onClick={() =>
                            router.visit(route('success-stories.list'))
                        }
                    >
                        <ArrowLeft className='mr-2 h-4 w-4' />
                    </Button>
                    <div className='ml-4'>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            Add Success Story
                        </h1>
                        <p className='text-muted-foreground'>
                            Create a new success story
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Success Story Details</CardTitle>
                            <CardDescription>
                                Enter the information for the success story
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor='title'>Title</Label>
                                    <Input
                                        id='title'
                                        name='title'
                                        value={data.title}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter story title'
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='category'>Category</Label>
                                    <Select
                                        value={parseInt(data.category)}
                                        onValueChange={value =>
                                            handleSelectChange(
                                                'category',
                                                value
                                            )
                                        }
                                        required
                                    >
                                        <SelectTrigger id='category'>
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
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='client_name'>
                                        Client Name
                                    </Label>
                                    <Input
                                        id='client_name'
                                        name='client_name'
                                        value={data.client_name}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter client name'
                                    />
                                    {errors.client_name && <p className="text-sm text-red-500">{errors.client_name}</p>}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='date'>Date</Label>
                                    <Input
                                        id='date'
                                        name='date'
                                        type='date'
                                        value={data.date}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='image' className="flex items-center gap-1">
                                    Story Image
                                    <span className="text-red-500">*</span>
                                </Label>
                                <ImageUpload
                                    onImageChange={handleImageChange}
                                    required
                                />
                                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                {/* {!image && <p className="text-sm text-red-500">Please upload an image</p>} */}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='outcome'>Outcome</Label>
                                <Textarea
                                    id='outcome'
                                    name='outcome'
                                    value={data.outcome}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder='Describe the outcome of the case'
                                />
                                {errors.outcome && <p className="text-sm text-red-500">{errors.outcome}</p>}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='quote'>Client Quote</Label>
                                <Textarea
                                    id='quote'
                                    name='quote'
                                    value={data.quote}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Enter client's testimonial"
                                />
                                {errors.quote && <p className="text-sm text-red-500">{errors.quote}</p>}
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor='key_metric'>Key Metric</Label>
                                    <Input
                                        id='key_metric'
                                        name='key_metric'
                                        value={data.key_metric}
                                        onChange={handleChange}
                                        required
                                        placeholder='e.g. 8 months, 50/50, 100%'
                                    />
                                    {errors.key_metric && <p className="text-sm text-red-500">{errors.key_metric}</p>}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='key_metric_label'>Key Metric Label</Label>
                                    <Input
                                        id='key_metric_label'
                                        name='key_metric_label'
                                        value={data.key_metric_label}
                                        onChange={handleChange}
                                        required
                                        placeholder='e.g. Processing Time, Custody Share'
                                    />
                                    {errors.key_metric_label && <p className="text-sm text-red-500">{errors.key_metric_label}</p>}
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='key_metric_icon'>Key Metric Icon</Label>
                                    <Select
                                        value={data.key_metric_icon}
                                        onValueChange={value => handleSelectChange('key_metric_icon', value)}
                                        required
                                    >
                                        <SelectTrigger id='key_metric_icon'>
                                            <SelectValue placeholder='Select an icon' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='Clock'>
                                                <div className='flex items-center gap-2'>
                                                    <Clock className='h-4 w-4' />
                                                    <span>Clock</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value='Scale'>
                                                <div className='flex items-center gap-2'>
                                                    <Scale className='h-4 w-4' />
                                                    <span>Scale</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value='CheckCircle2'>
                                                <div className='flex items-center gap-2'>
                                                    <CheckCircle2 className='h-4 w-4' />
                                                    <span>Check Circle</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value='Trophy'>
                                                <div className='flex items-center gap-2'>
                                                    <Trophy className='h-4 w-4' />
                                                    <span>Trophy</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value='Target'>
                                                <div className='flex items-center gap-2'>
                                                    <Target className='h-4 w-4' />
                                                    <span>Target</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value='Lightbulb'>
                                                <div className='flex items-center gap-2'>
                                                    <Lightbulb className='h-4 w-4' />
                                                    <span>Lightbulb</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.key_metric_icon && <p className="text-sm text-red-500">{errors.key_metric_icon}</p>}
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <Button type='submit' disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Success Story'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
