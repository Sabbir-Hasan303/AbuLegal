import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import { Plus, Pencil, Trash2, Award } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog"
import { toast } from 'react-hot-toast'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Clock, Scale, CheckCircle2, Trophy, Target, Lightbulb } from 'lucide-react'

export default function SuccessStoriesIndex({ successStories }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const domain = window.location.origin

  const handleDelete = (id) => {
    setIsDeleting(true)
    router.delete(route("success-stories.destroy", id), {
      onSuccess: () => {
        toast.success("Success story deleted successfully")
      },
      onError: () => {
        toast.error("Failed to delete success story")
      },
      onFinish: () => {
        setIsDeleting(false)
      },
    })
  }

  return (
    <>
    <AuthenticatedLayout>
      <Head title="Success Stories" />

      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Success Stories</h1>
            <p className="text-muted-foreground">Manage your success stories</p>
          </div>
          <Link href={route("success-stories.add")}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Story
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Success Stories</CardTitle>
            <CardDescription>View and manage your success stories</CardDescription>
          </CardHeader>
          <CardContent>
            {successStories.length === 0 ? (
              <div className="text-center py-10">
                <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No success stories</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by creating a new success story.
                </p>
                <div className="mt-6">
                  <Link href={route("success-stories.add")}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Story
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Key Metric</TableHead>
                    <TableHead>Key Metric Label</TableHead>
                    <TableHead>Key Metric Icon</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {successStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell className="font-medium">{story.title}</TableCell>
                      <TableCell>{story.category.name}</TableCell>
                      <TableCell>{story.client_name}</TableCell>
                      <TableCell>{new Date(story.date).toLocaleDateString()}</TableCell>
                      <TableCell>{story.key_metric}</TableCell>
                      <TableCell>{story.key_metric_label}</TableCell>
                      <TableCell>
                        <img src={`${domain}/${story.key_metric_icon}`} alt="Key Metric Icon" className="h-6 w-6" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={route("success-stories.edit", story.id)}>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the success story.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(story.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      </AuthenticatedLayout>
    </>
  )
}
