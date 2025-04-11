import React, { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'
import { cn } from "@/lib/utils"
import { toast } from 'react-hot-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const roles = [
    "Immigration Law Specialist",
    "Family Law Attorney",
    "Criminal Defense Lawyer",
    "Managing Partner",
    "Property Law Specialist",
    "Business Law Attorney"
]

const specialties = [
    "Visa Applications",
    "Appeals",
    "Citizenship",
    "Divorce",
    "Child Custody",
    "Property Settlement",
    "Criminal Defense",
    "Traffic Offenses",
    "Strategic Leadership",
    "Complex Cases",
    "International Law",
    "Property Transactions",
    "Leasing",
    "Conveyancing",
    "Business Formation",
    "Contracts",
    "Compliance"
]

export default function AddAttorneyPage() {
    const [socialMedia, setSocialMedia] = useState({
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    })

    const [imagePreview, setImagePreview] = useState(null)

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        role: '',
        specialties: [],
        social_media: [],
        image: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        clearErrors()

        // Validate specialties
        if (!Array.isArray(data.specialties) || data.specialties.length === 0) {
            setError('specialties', 'Please select at least one specialty')
            return
        }

        const socialMediaArray = Object.entries(socialMedia).map(([platform, url]) => ({
            platform,
            url
        }))

        data.social_media = socialMediaArray

        // Submit the form
        post(route('attorneys.store'), {
            onSuccess: () => {
                toast.success('Attorney added successfully')
                setData({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    specialties: [],
                    facebook: '',
                    twitter: '',
                    linkedin: '',
                    instagram: '',
                    image: null
                })
                setImagePreview(null)
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

    const handleSocialMediaChange = (platform, value) => {
        setSocialMedia(prev => ({
            ...prev,
            [platform]: value
        }))
    }

    const toggleSpecialty = (specialty) => {
        const currentSpecialties = Array.isArray(data.specialties) ? data.specialties : []
        setData('specialties',
            currentSpecialties.includes(specialty)
                ? currentSpecialties.filter(item => item !== specialty)
                : [...currentSpecialties, specialty]
        )
        // Clear specialty error when user selects a specialty
        if (errors.specialties) {
            clearErrors('specialties')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Link href="/dashboard/attorneys">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Add Attorney
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Add a new attorney to your legal team
                    </p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Attorney Information</CardTitle>
                        <CardDescription>
                            Enter the details for the new attorney
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-1">
                                    Full Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    error={errors.name}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-1">
                                    Email
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    error={errors.email}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-1">
                                    Phone Number
                                    {/* <span className="text-red-500">*</span> */}
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder="+1 (555) 000-0000"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    error={errors.phone}
                                    // required
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500">{errors.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role" className="flex items-center gap-1">
                                    Role
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={data.role}
                                    onValueChange={value => setData('role', value)}
                                    required
                                >
                                    <SelectTrigger id="role" className={errors.role ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p className="text-sm text-red-500">{errors.role}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="flex items-center gap-1 mb-3">
                                    Specialties
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {specialties.map((specialty) => (
                                        <Badge
                                            key={specialty}
                                            variant={(Array.isArray(data.specialties) && data.specialties.includes(specialty)) ? "default" : "outline"}
                                            className={cn(
                                                "cursor-pointer hover:bg-primary/90 transition-colors text-sm md:text-base",
                                                (Array.isArray(data.specialties) && data.specialties.includes(specialty))
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background hover:text-primary-foreground"
                                            )}
                                            onClick={() => toggleSpecialty(specialty)}
                                        >
                                            {specialty}
                                        </Badge>
                                    ))}
                                </div>
                                {errors.specialties && (
                                    <p className="text-sm text-red-500 mt-2">{errors.specialties}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-2">
                                    Select at least one specialty
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Social Media Links</Label>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <Input
                                        id="facebook"
                                        placeholder="https://facebook.com/username"
                                        value={socialMedia.facebook}
                                        onChange={e => handleSocialMediaChange('facebook', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Input
                                        id="twitter"
                                        placeholder="https://twitter.com/username"
                                        value={socialMedia.twitter}
                                        onChange={e => handleSocialMediaChange('twitter', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        placeholder="https://linkedin.com/in/username"
                                        value={socialMedia.linkedin}
                                        onChange={e => handleSocialMediaChange('linkedin', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        placeholder="https://instagram.com/username"
                                        value={socialMedia.instagram}
                                        onChange={e => handleSocialMediaChange('instagram', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Profile Image
                                <span className="text-red-500">*</span>
                            </Label>
                            {imagePreview && (
                                <div className="mb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <Input
                                id="image"
                                type="file"
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setData('image', file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImagePreview(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className={errors.image ? 'border-red-500' : ''}
                                required
                                accept="image/*"
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Attorney'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
