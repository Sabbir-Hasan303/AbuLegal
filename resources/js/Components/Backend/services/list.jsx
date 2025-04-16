import { Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import { Plus, Search, Edit, Trash2, ArrowUpDown } from "lucide-react"
import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/Components/ui/dialog"
import Pagination from "@/Components/Backend/Pagination"

export default function ServicesPage({ services, filters }) {
    const domain = window.location.origin;
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || 'all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    // Debounced search function
    const debouncedSearch = debounce((query) => {
        updateFilters({ search: query });
    }, 300);

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    // Handle status filter change
    const handleStatusChange = (value) => {
        setStatus(value);
        updateFilters({ status: value });
    };

    // Update URL with filters
    const updateFilters = (newFilters) => {
        router.get(
            route('services.list'),
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
        );
    };

    const handlePageChange = (page) => {
        router.get(
            route('services.list'),
            {
                search: searchQuery,
                status: status,
                page
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Handle delete confirmation
    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setDeleteDialogOpen(true);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        if (serviceToDelete) {
            router.delete(route('services.destroy', serviceToDelete.id), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setServiceToDelete(null);
                },
            });
        }
    };

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground mt-2">Manage your legal services offerings</p>
                </div>

                <Link href="/dashboard/services/add">
                    <Button className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <CardTitle>All Services</CardTitle>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search services..."
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
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead className="w-[250px]">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Title
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Short Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.data && services.data.length > 0 ? (
                                services.data.map((service) => (
                                    <TableRow key={service.id} className="group">
                                        <TableCell className="font-medium">{service.id}</TableCell>
                                        <TableCell>
                                            <Link href={`/services/${service.slug}`}>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`${domain}/${service.banner}`}
                                                        alt={service.title}
                                                        className="h-10 w-16 object-cover rounded-md"
                                                    />
                                                    <span className="font-medium">{service.title}</span>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                                            {service.short_description}
                                        </TableCell>
                                        <TableCell>{service.category?.name || 'Uncategorized'}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`
                                                ${service.status === "active" ? "bg-green-500" : ""}
                                                ${service.status === "draft" ? "bg-yellow-500" : ""}
                                                text-white
                                            `}
                                            >
                                                {service.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/dashboard/services/edit/${service.slug}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDeleteClick(service)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        No services found. Add your first service to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {services.data && services.data.length > 0 && (
                        <Pagination
                            data={services}
                            onPageChange={(page) => handlePageChange(page)}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{serviceToDelete?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
