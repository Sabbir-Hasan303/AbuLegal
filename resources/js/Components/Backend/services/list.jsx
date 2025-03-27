import { Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, ArrowUpDown } from "lucide-react"

// Sample services data
const servicesData = [
  {
    id: 1,
    title: "Immigration Law",
    shortDescription: "Expert assistance with visa applications and immigration matters",
    category: "Legal Services",
    status: "Active",
    banner: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Family Law",
    shortDescription: "Comprehensive legal services for family matters",
    category: "Legal Services",
    status: "Active",
    banner: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Criminal Law",
    shortDescription: "Skilled defense for all criminal charges",
    category: "Legal Services",
    status: "Active",
    banner: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Migration Assistance",
    shortDescription: "Complete support for all migration processes",
    category: "Migration",
    status: "Active",
    banner: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Business Visa Consultation",
    shortDescription: "Specialized consultation for business visa applicants",
    category: "Migration",
    status: "Draft",
    banner: "/placeholder.svg",
  },
]

export default function ServicesPage() {
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
                <Input type="search" placeholder="Search services..." className="w-full pl-8" />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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
              {servicesData.map((service) => (
                <TableRow key={service.id} className="group">
                  <TableCell className="font-medium">{service.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={service.banner || "/placeholder.svg"}
                        alt={service.title}
                        className="h-10 w-16 object-cover rounded-md"
                      />
                      <span className="font-medium">{service.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {service.shortDescription}
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      ${service.status === "Active" ? "bg-green-500" : ""}
                      ${service.status === "Draft" ? "bg-yellow-500" : ""}
                      ${service.status === "Archived" ? "bg-gray-500" : ""}
                      text-white
                    `}
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/services/edit/${service.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}