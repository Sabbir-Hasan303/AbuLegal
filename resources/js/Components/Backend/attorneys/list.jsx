import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { router } from '@inertiajs/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function AttorneysPage({ attorneys }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [attorneyToDelete, setAttorneyToDelete] = useState(null)

  const handleDeleteClick = (attorney) => {
    setAttorneyToDelete(attorney)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (attorneyToDelete) {
    router.delete(route('attorneys.destroy', attorneyToDelete.id), {
      onSuccess: () => {
          setDeleteDialogOpen(false)
          setAttorneyToDelete(null)
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attorneys</h1>
          <p className="text-muted-foreground mt-2">Manage your legal team members</p>
        </div>

        <Link href={route('attorneys.add')}>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Attorney
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Attorneys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attorneys.length > 0 ? (
                attorneys.map((attorney) => (
                  <TableRow key={attorney.id}>
                    <TableCell className="font-medium">{attorney.name}</TableCell>
                    <TableCell>{attorney.email}</TableCell>
                    <TableCell>{attorney.role}</TableCell>
                    <TableCell>{attorney.specialties.join(', ')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={route('attorneys.edit', attorney.id)}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteClick(attorney)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No attorneys found. Add your first attorney to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Attorney</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{attorneyToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
