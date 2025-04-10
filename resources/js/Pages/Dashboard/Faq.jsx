import { useState, useEffect, useCallback } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Plus, Edit, Trash2, Search, AlertTriangle } from 'lucide-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, router } from '@inertiajs/react'
import { toast } from 'react-hot-toast'
import debounce from 'lodash/debounce'

export default function FaqPage ({ faqs, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '')
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editingFaq, setEditingFaq] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [faqToDelete, setFaqToDelete] = useState(null)

    // useForm for add
    const { data, setData, post, processing, errors, reset } = useForm({
        question: '',
        answer: ''
    })

    // useForm for edit
    const { data: editData, setData: setEditData, put, processing: editProcessing } = useForm({
        question: '',
        answer: ''
    })

    // Create a debounced search function
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(route('faq'), { search: value }, {
                preserveState: true,
                preserveScroll: true,
            })
        }, 300),
        []
    )

    // Handle search input changes
    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }

    // Cleanup debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    const handleSave = () => {
        post(route('faq.store'), {
            onSuccess: () => {
                toast.success('FAQ created successfully')
                setAddDialogOpen(false)
                reset()
            },
            onError: (errors) => {
                toast.error('Please check the form for errors')
            }
        })
    }

    const handleUpdate = (id) => {
        put(route('faq.update', id), {
            onSuccess: () => {
                toast.success('FAQ updated successfully')
                setEditingFaq(null)
            },
            onError: () => {
                toast.error('Failed to update FAQ')
            }
        })
    }

    const handleDelete = (id) => {
        router.delete(route('faq.destroy', id), {
            onSuccess: () => {
                toast.success('FAQ deleted successfully')
                setDeleteDialogOpen(false)
                setFaqToDelete(null)
            },
            onError: () => {
                toast.error('Failed to delete FAQ')
            }
        })
    }

    // Handle edit dialog open
    const handleEditOpen = (faq) => {
        setEditingFaq(faq)
        setEditData({
            question: faq.question,
            answer: faq.answer
        })
    }

    // Handle delete dialog open
    const handleDeleteOpen = (faq) => {
        setFaqToDelete(faq)
        setDeleteDialogOpen(true)
    }

    return (
        <AuthenticatedLayout>
            <div className='space-y-6'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            FAQ Management
                        </h1>
                        <p className='text-muted-foreground mt-2'>
                            Manage frequently asked questions for your website
                        </p>
                    </div>

                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className='gap-1 w-full sm:w-auto'>
                                <Plus className='h-4 w-4' />
                                Add Question
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[600px]'>
                            <DialogHeader>
                                <DialogTitle>Add New FAQ</DialogTitle>
                                <DialogDescription>
                                    Create a new frequently asked question
                                </DialogDescription>
                            </DialogHeader>

                            <div className='grid gap-4 py-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='question'>Question</Label>
                                    <Input
                                        id='question'
                                        placeholder='e.g. What visa options are available?'
                                        value={data.question}
                                        onChange={e => setData('question', e.target.value)}
                                    />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='answer'>Answer</Label>
                                    <Textarea
                                        id='answer'
                                        placeholder='Provide a detailed answer...'
                                        className='min-h-[150px]'
                                        value={data.answer}
                                        onChange={e => setData('answer', e.target.value)}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant='outline' onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSave}>Save Question</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <div className='flex flex-col gap-4'>
                            <CardTitle>All Questions</CardTitle>
                            <div className='relative w-full'>
                                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                                <Input
                                    type='search'
                                    placeholder='Search questions...'
                                    className='pl-8'
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <CardDescription>
                            {faqs.length} questions found
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='divide-y'>
                            {faqs.map(faq => (
                                <div key={faq.id} className='py-4 px-6'>
                                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2'>
                                        <h3 className='text-base font-medium'>
                                            {faq.question}
                                        </h3>
                                        <div className='flex gap-2 shrink-0'>
                                            <Dialog open={editingFaq?.id === faq.id} onOpenChange={(open) => !open && setEditingFaq(null)}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => handleEditOpen(faq)}
                                                    >
                                                        <Edit className='h-4 w-4 mr-2' />
                                                        Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='sm:max-w-[600px]'>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit FAQ</DialogTitle>
                                                        <DialogDescription>
                                                            Update this frequently asked question
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className='grid gap-4 py-4'>
                                                        <div className='grid gap-2'>
                                                            <Label htmlFor={`edit-question-${faq.id}`}>Question</Label>
                                                            <Input
                                                                id={`edit-question-${faq.id}`}
                                                                value={editData.question}
                                                                onChange={e => setEditData('question', e.target.value)}
                                                            />
                                                        </div>

                                                        <div className='grid gap-2'>
                                                            <Label htmlFor={`edit-answer-${faq.id}`}>Answer</Label>
                                                            <Textarea
                                                                id={`edit-answer-${faq.id}`}
                                                                value={editData.answer}
                                                                onChange={e => setEditData('answer', e.target.value)}
                                                                className='min-h-[150px]'
                                                            />
                                                        </div>
                                                    </div>

                                                    <DialogFooter>
                                                        <Button variant='outline' onClick={() => setEditingFaq(null)}>Cancel</Button>
                                                        <Button onClick={() => handleUpdate(faq.id)}>
                                                            Update Question
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog open={deleteDialogOpen && faqToDelete?.id === faq.id} onOpenChange={setDeleteDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        className='text-destructive border-destructive hover:bg-destructive/10'
                                                        onClick={() => handleDeleteOpen(faq)}
                                                    >
                                                        <Trash2 className='h-4 w-4 mr-2' />
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className='flex items-center gap-2 text-destructive'>
                                                            <AlertTriangle className='h-5 w-5' />
                                                            Delete FAQ
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this FAQ? This action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className='mt-4 p-4 border rounded-md bg-muted/50'>
                                                        <div className='font-medium'>
                                                            {faqToDelete?.question}
                                                        </div>
                                                    </div>

                                                    <DialogFooter className='mt-4'>
                                                        <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                                        <Button
                                                            variant='destructive'
                                                            onClick={() => handleDelete(faqToDelete?.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <Accordion
                                        type='single'
                                        collapsible
                                        className='w-full border-0'
                                    >
                                        <AccordionItem
                                            value={`item-${faq.id}`}
                                            className='border-0'
                                        >
                                            <AccordionTrigger className='py-0 text-sm text-muted-foreground hover:no-underline'>
                                                View Answer
                                            </AccordionTrigger>
                                            <AccordionContent className='text-muted-foreground pt-2'>
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </div>

                        {faqs.length === 0 && (
                            <div className='text-center py-10 px-6'>
                                <p className='text-muted-foreground'>
                                    No questions found. Try a different search
                                    term or add a new question.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
