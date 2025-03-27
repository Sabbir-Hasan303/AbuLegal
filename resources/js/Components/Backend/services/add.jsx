import { Link } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"

export default function AddServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/services">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Service</h1>
          <p className="text-muted-foreground mt-2">Create a new service to display on your website</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>Enter the details for the new service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" placeholder="e.g. Immigration Law" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
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
            <Textarea
              id="short-description"
              placeholder="Brief description (displayed in listings)"
              className="resize-none"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Maximum 150 characters. This will be displayed in service listings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea id="description" placeholder="Detailed description of the service..." className="min-h-[200px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Banner Image</Label>
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

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="draft">
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
          <Button>Save Service</Button>
        </CardFooter>
      </Card>
    </div>
  )
}