import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Search, ArrowUpDown } from "lucide-react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

// Sample contact data
const contactsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+61 412 345 678",
    subject: "Immigration Consultation",
    status: "New",
    date: "2023-06-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+61 423 456 789",
    subject: "Family Law Inquiry",
    status: "Replied",
    date: "2023-06-14",
  },
  {
    id: 3,
    name: "Michael Wong",
    email: "m.wong@example.com",
    phone: "+61 434 567 890",
    subject: "Criminal Case Consultation",
    status: "New",
    date: "2023-06-13",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+61 445 678 901",
    subject: "Visa Application Help",
    status: "Replied",
    date: "2023-06-12",
  },
  {
    id: 5,
    name: "Robert Chen",
    email: "robert.c@example.com",
    phone: "+61 456 789 012",
    subject: "Citizenship Application",
    status: "New",
    date: "2023-06-11",
  },
]

// Status badge colors
const statusColors = {
  New: "bg-blue-500",
  Replied: "bg-green-500",
}

export default function ContactList() {
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
                <Input type="search" placeholder="Search inquiries..." className="w-full pl-8" />
              </div>

              <Select defaultValue="all">
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
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 cursor-pointer">
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactsData.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColors[contact.status]} text-white`}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contact.date}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
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
                            <div className="col-span-3">{contact.name}</div>

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
                            <div className="col-span-3">{contact.date}</div>

                            <div className="font-medium">Message:</div>
                            <div className="col-span-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
                              hendrerit arcu sed erat molestie vehicula.
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button>Reply</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AuthenticatedLayout>
  )
}