import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function OfferSettingsPage() {
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
          <h1 className="text-3xl font-bold text-perfecthire-900">Offer Settings</h1>
          <p className="text-perfecthire-600 mt-1">Configure offer templates, approval workflows, and defaults</p>
        </div>
      </div>

      <Tabs defaultValue="templates">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Offer Templates</TabsTrigger>
          <TabsTrigger value="approvals">Approval Workflow</TabsTrigger>
          <TabsTrigger value="defaults">Default Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Offer Templates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage templates for different types of offers
                  </CardDescription>
                </div>
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Standard Full-time Offer",
                    description: "Default template for full-time employees",
                    lastUpdated: "2025-02-15",
                  },
                  {
                    name: "Contract Position",
                    description: "Template for contract positions with limited term",
                    lastUpdated: "2025-02-10",
                  },
                  {
                    name: "Executive Offer",
                    description: "Template for executive and leadership positions",
                    lastUpdated: "2025-01-20",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-perfecthire-100">
                        <FileText className="h-5 w-5 text-perfecthire-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-perfecthire-900">{template.name}</h3>
                        <p className="text-sm text-perfecthire-600">{template.description}</p>
                        <p className="text-xs text-perfecthire-500 mt-1">
                          Last updated: {new Date(template.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Duplicate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Approval Workflow</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Configure the approval process for offers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Approval Workflow</Label>
                  <p className="text-sm text-perfecthire-600">
                    Require approvals before offers can be sent to candidates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-4">
                <Label>Approval Steps</Label>
                <div className="space-y-2">
                  {[
                    { step: 1, role: "Hiring Manager", required: true },
                    { step: 2, role: "Department Head", required: true },
                    { step: 3, role: "HR Manager", required: true },
                    { step: 4, role: "Finance", required: false },
                  ].map((step, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-perfecthire-100 text-perfecthire-800 text-sm font-medium">
                          {step.step}
                        </div>
                        <span className="font-medium text-perfecthire-800">{step.role}</span>
                        {step.required && (
                          <span className="text-xs bg-perfecthire-100 text-perfecthire-800 px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="border-perfecthire-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Approval Step
                </Button>
              </div>

              <div className="flex justify-end">
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defaults">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Default Settings</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Configure default values for new offers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expiration-days">Offer Expiration (Days)</Label>
                  <Input id="expiration-days" type="number" defaultValue="7" />
                  <p className="text-xs text-perfecthire-500">
                    Number of days before an offer expires after being sent
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-template">Default Offer Template</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Full-time Offer</SelectItem>
                      <SelectItem value="contract">Contract Position</SelectItem>
                      <SelectItem value="executive">Executive Offer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-start-days">Default Start Date (Days from Acceptance)</Label>
                  <Input id="default-start-days" type="number" defaultValue="14" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-send" />
                <Label htmlFor="auto-send">Automatically send offers after final approval</Label>
              </div>

              <div className="flex justify-end">
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

