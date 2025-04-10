import React from 'react'
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

export default function AttorneysPage({ attorneys }) {
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
    </div>
  )
}
