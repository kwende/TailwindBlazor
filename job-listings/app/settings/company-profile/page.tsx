import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CompanyProfilePage() {
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
          <h1 className="text-3xl font-bold text-perfecthire-900">Company Profile</h1>
          <p className="text-perfecthire-600 mt-1">Manage your company profile, logo, and branding settings</p>
        </div>
      </div>

      <Tabs defaultValue="branding">
        <TabsList className="mb-6">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="career-site">Career Site</TabsTrigger>
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
          <TabsTrigger value="values">Company Values</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Company Branding</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Customize your company's visual identity across the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Perfect Hire Inc." />
                </div>

                <div>
                  <Label>Company Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-perfecthire-50">
                      <img src="/placeholder.svg?height=96&width=96" alt="Company logo" className="max-h-20 max-w-20" />
                    </div>
                    <Button variant="outline" className="border-perfecthire-300">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                  <p className="text-sm text-perfecthire-500 mt-2">Recommended size: 200x200px. Max file size: 2MB.</p>
                </div>

                <div>
                  <Label htmlFor="company-description">Company Description</Label>
                  <Textarea
                    id="company-description"
                    rows={4}
                    defaultValue="Perfect Hire is an all-in-one recruitment platform that helps companies find their perfect match."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career-site">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Career Site Settings</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Configure your public career site appearance and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-perfecthire-600">Career site configuration options will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social-media">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Social Media Integration</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Connect your social media accounts for job sharing and promotion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-perfecthire-600">Social media integration options will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Company Values</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Define your company's core values to showcase to candidates
                  </CardDescription>
                </div>
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Value
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Innovation",
                    description:
                      "We embrace new ideas and technologies to continuously improve our products and services.",
                  },
                  {
                    title: "Diversity & Inclusion",
                    description:
                      "We value diverse perspectives and create an inclusive environment where everyone can thrive.",
                  },
                  {
                    title: "Excellence",
                    description:
                      "We strive for excellence in everything we do, setting high standards and delivering quality results.",
                  },
                ].map((value, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-perfecthire-900">{value.title}</h3>
                        <p className="text-sm text-perfecthire-600 mt-1">{value.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4 text-perfecthire-700" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Value Modal (placeholder) */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-perfecthire-900">Add New Company Value</CardTitle>
                <CardDescription className="text-perfecthire-600">
                  Define a new core value that represents your company culture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="value-title">Value Title</Label>
                  <Input id="value-title" placeholder="e.g., Integrity, Innovation, Teamwork" />
                </div>
                <div>
                  <Label htmlFor="value-description">Value Description</Label>
                  <Textarea
                    id="value-description"
                    placeholder="Describe what this value means to your company and how it guides your work..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="border-perfecthire-300">
                    Cancel
                  </Button>
                  <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Save Value</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

