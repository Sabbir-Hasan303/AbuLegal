import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Eye, Search } from "lucide-react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useForm } from "@inertiajs/react"
import { toast } from "react-hot-toast"
import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { router } from '@inertiajs/react'
import Pagination from "@/Components/Backend/Pagination"

// Status badge colors
const statusColors = {
  new: "bg-blue-500",
  replied: "bg-green-500",
}

export default function ContactList({ contacts, filters }) {
  const { patch } = useForm()
  const [searchQuery, setSearchQuery] = useState(filters?.search || '')
  const [status, setStatus] = useState(filters?.status || 'all')

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    updateFilters({ search: query })
  }, 300)

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    debouncedSearch(query)
  }

  // Handle status filter change
  const handleStatusChange = (value) => {
    setStatus(value)
    updateFilters({ status: value })
  }

  // Update URL with filters
  const updateFilters = (newFilters) => {
    router.get(
      route('contact.list'),
      {
        search: searchQuery,
        status: status,
        ...newFilters,
        page: 1 // Reset to first page when filters change
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  const handleStatusUpdate = (contactId) => {
    patch(route('contact.update.status', contactId), {
      onSuccess: () => {
        toast.success('Status updated successfully')
      },
      onError: () => {
        toast.error('Failed to update status')
      }
    })
  }

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [])

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Contact Management</h1>
          <p className="text-muted-foreground">Manage client inquiries</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Client Inquiries</CardTitle>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inquiries..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <Select
                  value={status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Name
                      {/* <ArrowUpDown className="h-3 w-3" /> */}
                    </div>
                  </TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Date
                      {/* <ArrowUpDown className="h-3 w-3" /> */}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.data && contacts.data.length > 0 ? (
                  contacts.data.map((contact, index) => (
                    <TableRow key={contact.id}>
                      {/* <TableCell className="font-medium">{contact.id}</TableCell> */}
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contact.first_name} {contact.last_name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${statusColors[contact.status]} text-white`}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                              {/* View */}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Contact Details</DialogTitle>
                              <DialogDescription>Full information about this inquiry</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-4 gap-4">
                                <div className="font-medium">Name:</div>
                                <div className="col-span-3">{contact.first_name} {contact.last_name}</div>

                                <div className="font-medium">Email:</div>
                                <div className="col-span-3">{contact.email}</div>

                                <div className="font-medium">Phone:</div>
                                <div className="col-span-3">{contact.phone}</div>

                                <div className="font-medium">Subject:</div>
                                <div className="col-span-3">{contact.subject}</div>

                                <div className="font-medium">Status:</div>
                                <div className="col-span-3">
                                  <Badge variant="outline" className={`${statusColors[contact.status]} text-white`}>
                                    {contact.status}
                                  </Badge>
                                </div>

                                <div className="font-medium">Date:</div>
                                <div className="col-span-3">{new Date(contact.created_at).toLocaleDateString()}</div>

                                <div className="font-medium">Message:</div>
                                <div className="col-span-3">
                                  {contact.message}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              {contact.status === 'new' && (
                                <Button onClick={() => handleStatusUpdate(contact.id)}>
                                  Mark as Replied
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No contacts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {contacts.data && contacts.data.length > 0 && (
              <Pagination
                data={contacts}
                onPageChange={(page) => updateFilters({ page })}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
