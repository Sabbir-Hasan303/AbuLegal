// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
// import { Button } from "@/Components/ui/button"
import { FileText, Users, Briefcase, Calendar, Mail, MessageSquare, Newspaper, Settings } from "lucide-react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/react"

export default function DashboardPage({ services, attorneys, contacts, newsletters }) {
  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your legal practice management system</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href={route('services.list')}>
            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Services</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{services}</div>
                <p className="text-xs text-muted-foreground">Total active services</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={route('attorneys.list')}>
            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Attorneys</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attorneys}</div>
                <p className="text-xs text-muted-foreground">Total attorneys</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={route('contact.list')}>
            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contacts}</div>
                <p className="text-xs text-muted-foreground">New messages</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={route('newsletter.list')}>
            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newsletters}</div>
                <p className="text-xs text-muted-foreground">Total subscribers</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content Tabs */}
        {/* <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="attorneys">Attorneys</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Messages</CardTitle>
                <CardDescription>Latest messages from potential clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground">No recent messages to display</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Services</CardTitle>
                  <CardDescription>Your current service offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">No active services to display</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Your legal team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">No team members to display</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Services Management</CardTitle>
                <CardDescription>Manage your legal services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Link href={route('services.add')}>
                    <Button>Add New Service</Button>
                  </Link>
                </div>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground">No services to display</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attorneys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attorneys Management</CardTitle>
                <CardDescription>Manage your legal team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Link href={route('attorneys.add')}>
                    <Button>Add New Attorney</Button>
                  </Link>
                </div>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground">No attorneys to display</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>View and manage client inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground">No messages to display</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs> */}
      </div>
    </AuthenticatedLayout>
  )
}
