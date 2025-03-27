import { useState } from 'react'
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
// Sample FAQ data
const faqData = [
    {
        id: 1,
        question: 'What visa options are available for skilled workers?',
        answer: 'Australia offers several visa options for skilled workers, including the Skilled Independent Visa (subclass 189), Skilled Nominated Visa (subclass 190), and Skilled Work Regional Visa (subclass 491). Eligibility depends on factors such as age, English language proficiency, work experience, and occupation.'
    },
    {
        id: 2,
        question: 'How long does the partner visa process take?',
        answer: 'The partner visa process typically takes between 12-24 months. Processing times vary depending on the complexity of your case, the completeness of your application, and current departmental workloads.'
    },
    {
        id: 3,
        question: 'How is property divided in a divorce?',
        answer: 'In Australia, property division follows a four-step process: identifying and valuing all assets and liabilities, assessing contributions (financial and non-financial), considering future needs, and ensuring the outcome is just and equitable. There is no automatic 50/50 split.'
    },
    {
        id: 4,
        question: 'What factors determine child custody arrangements?',
        answer: "Child custody (now called 'parenting arrangements') is determined based on the best interests of the child. Factors include the benefit of meaningful relationships with both parents, protection from harm, the child's views (depending on age and maturity), practical considerations, and parental capacity."
    },
    {
        id: 5,
        question: "What should I do if I'm arrested?",
        answer: 'If arrested, you should: remain calm, exercise your right to silence, request to speak with a lawyer before answering questions, not resist arrest, and remember everything that happens. Contact a criminal defense lawyer as soon as possible.'
    }
]

export default function FaqPage () {
    const [searchTerm, setSearchTerm] = useState('')
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [editingFaq, setEditingFaq] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const filteredFaqs = faqData.filter(
        faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = id => {
        console.log(`Deleting FAQ with ID: ${id}`)
        // In a real application, you would delete the FAQ from your database here
        setDeleteDialogOpen(false)
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
                                    />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='answer'>Answer</Label>
                                    <Textarea
                                        id='answer'
                                        placeholder='Provide a detailed answer...'
                                        className='min-h-[150px]'
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant='outline' onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                                <Button>Save Question</Button>
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
                                    onChange={e =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <CardDescription>
                            {filteredFaqs.length} questions found
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='divide-y'>
                            {filteredFaqs.map(faq => (
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
                                                        onClick={() => setEditingFaq(faq)}
                                                    >
                                                        <Edit className='h-4 w-4 mr-2' />
                                                        Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='sm:max-w-[600px]'>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit FAQ
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Update this
                                                            frequently asked
                                                            question
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className='grid gap-4 py-4'>
                                                        <div className='grid gap-2'>
                                                            <Label
                                                                htmlFor={`edit-question-${faq.id}`}
                                                            >
                                                                Question
                                                            </Label>
                                                            <Input
                                                                id={`edit-question-${faq.id}`}
                                                                defaultValue={
                                                                    faq.question
                                                                }
                                                            />
                                                        </div>

                                                        <div className='grid gap-2'>
                                                            <Label
                                                                htmlFor={`edit-answer-${faq.id}`}
                                                            >
                                                                Answer
                                                            </Label>
                                                            <Textarea
                                                                id={`edit-answer-${faq.id}`}
                                                                defaultValue={
                                                                    faq.answer
                                                                }
                                                                className='min-h-[150px]'
                                                            />
                                                        </div>
                                                    </div>

                                                    <DialogFooter>
                                                        <Button variant='outline' onClick={() => setEditingFaq(null)}>Cancel</Button>
                                                        <Button>
                                                            Update Question
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        className='text-destructive border-destructive hover:bg-destructive/10'
                                                        onClick={() => setDeleteDialogOpen(true)}
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
                                                            Are you sure you
                                                            want to delete this
                                                            FAQ? This action
                                                            cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className='mt-4 p-4 border rounded-md bg-muted/50'>
                                                        <div className='font-medium'>
                                                            {faq.question}
                                                        </div>
                                                    </div>

                                                    <DialogFooter className='mt-4'>
                                                        <Button variant='outline' onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                                        <Button
                                                            variant='destructive'
                                                            onClick={() =>
                                                                handleDelete(
                                                                    faq.id
                                                                )
                                                            }
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

                        {filteredFaqs.length === 0 && (
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
