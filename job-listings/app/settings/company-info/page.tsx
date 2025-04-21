import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CompanyInfoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Settings
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-perfecthire-900">Company Info</h1>
          <p className="text-perfecthire-600 mt-1">Update company details, locations, and departments</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Company Details</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Company Details</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Update your company's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="legal-name">Legal Company Name</Label>
                  <Input id="legal-name" defaultValue="Perfect Hire Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select defaultValue="51-200">
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1001+">1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://perfecthire.com" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="headquarters">Headquarters Address</Label>
                  <Textarea id="headquarters" defaultValue="123 Recruitment St, San Francisco, CA 94103" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / EIN</Label>
                  <Input id="tax-id" defaultValue="12-3456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded">Year Founded</Label>
                  <Input id="founded" defaultValue="2020" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Company Locations</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage your company's office locations
                  </CardDescription>
                </div>
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Headquarters",
                    address: "123 Recruitment St, San Francisco, CA 94103",
                    type: "Main Office",
                  },
                  {
                    name: "New York Office",
                    address: "456 Hiring Ave, New York, NY 10001",
                    type: "Branch Office",
                  },
                  {
                    name: "Remote US",
                    address: "United States",
                    type: "Remote",
                  },
                ].map((location, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium text-perfecthire-900">{location.name}</h3>
                      <p className="text-sm text-perfecthire-600">{location.address}</p>
                      <Badge className="mt-1 bg-perfecthire-100 text-perfecthire-800">{location.type}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Departments</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage your company's departments and teams
                  </CardDescription>
                </div>
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-perfecthire-600">Department management options will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

