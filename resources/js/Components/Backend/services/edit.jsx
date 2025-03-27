import { Link } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"

// This would normally come from a database
const getServiceById = (id) => {
  return {
    id: 1,
    title: "Immigration Law",
    shortDescription: "Expert assistance with visa applications and immigration matters",
    description:
      "Our immigration law services provide comprehensive support for individuals and families seeking to navigate the complex Australian immigration system. We offer expert guidance on visa applications, permanent residency pathways, citizenship applications, and deportation defense. Our experienced team stays up-to-date with the latest immigration policies and procedures to ensure the best possible outcomes for our clients.",
    category: "Legal Services",
    status: "Active",
    banner: "/placeholder.svg",
  }
}

export default function EditServicePage({ id }) {
  const service = getServiceById(id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/services">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
          <p className="text-muted-foreground mt-2">Update the details for "{service.title}"</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>Modify the service details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" defaultValue={service.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="legal-services">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal-services">Legal Services</SelectItem>
                  <SelectItem value="migration">Migration</SelectItem>
                  <SelectItem value="family-law">Family Law</SelectItem>
                  <SelectItem value="criminal-law">Criminal Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-description">Short Description</Label>
            <Textarea id="short-description" defaultValue={service.shortDescription} className="resize-none" rows={2} />
            <p className="text-xs text-muted-foreground">
              Maximum 150 characters. This will be displayed in service listings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea id="description" defaultValue={service.description} className="min-h-[200px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Banner Image</Label>
            <div className="space-y-4">
              <div className="relative w-full max-w-md">
                <img
                  src={service.banner || "/placeholder.svg"}
                  alt={service.title}
                  className="h-40 w-full object-cover rounded-lg border"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="banner-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                  </div>
                  <input id="banner-upload" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Only active services will be displayed on the website.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline">Cancel</Button>
          <Button>Update Service</Button>
        </CardFooter>
      </Card>
    </div>
  )
}