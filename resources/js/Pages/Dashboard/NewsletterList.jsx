import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { router } from '@inertiajs/react'
import Pagination from "@/Components/Backend/Pagination"

export default function NewsletterList({ newsletters, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters?.search || '')

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

  // Update URL with filters
  const updateFilters = (newFilters) => {
    router.get(
      route('newsletter.list'),
      {
        search: searchQuery,
        ...newFilters,
        page: 1 // Reset to first page when filters change
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage newsletter subscribers</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Subscribers List</CardTitle>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subscribers..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletters.data && newsletters.data.length > 0 ? (
                  newsletters.data.map((subscriber, index) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>{new Date(subscriber.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      No subscribers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {newsletters.data && newsletters.data.length > 0 && (
              <Pagination
                data={newsletters}
                onPageChange={(page) => updateFilters({ page })}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
