import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

export default function ImageUpload({
    onImageChange,
    currentImage,
    maxSize = 2, // in MB
    accept = 'image/svg+xml,image/png,image/jpeg,image/gif',
    className = ''
}) {
    const [preview, setPreview] = useState(currentImage || null)
    const [error, setError] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setError(null)

        if (!file) return

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size must be less than ${maxSize}MB`)
            return
        }

        // Validate file type
        if (!accept.split(',').some(type => file.type === type.trim())) {
            setError('Invalid file type. Please upload an image file.')
            return
        }

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
            onImageChange(file)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {/* <Label htmlFor='image-upload'>Banner Image</Label> */}
            <div className='flex items-center justify-center w-full md:w-1/2'>
                <label
                    htmlFor='image-upload'
                    className='flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors'
                >
                    {preview ? (
                        <div className='relative w-full h-full'>
                            <img
                                src={preview}
                                alt='Preview'
                                className='w-full h-full object-cover rounded-lg'
                            />
                            <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg'>
                                <p className='text-white text-sm'>Click to change</p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Upload className='w-8 h-8 mb-3 text-muted-foreground' />
                            <p className='mb-2 text-sm text-muted-foreground'>
                                <span className='font-semibold'>Click to upload</span> or drag and drop
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                SVG, PNG, JPG or GIF (MAX. {maxSize}MB)
                            </p>
                        </div>
                    )}
                </label>
                <input
                    id='image-upload'
                    type='file'
                    className='hidden'
                    accept={accept}
                    onChange={handleImageChange}
                />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    )
}
