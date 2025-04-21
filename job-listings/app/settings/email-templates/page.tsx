import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function EmailTemplatesPage() {
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
          <h1 className="text-3xl font-bold text-perfecthire-900">Email Templates</h1>
          <p className="text-perfecthire-600 mt-1">Customize email templates for candidate communications</p>
        </div>
      </div>

      <Tabs defaultValue="application">
        <TabsList className="mb-6">
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="offer">Offer</TabsTrigger>
          <TabsTrigger value="rejection">Rejection</TabsTrigger>
        </TabsList>

        <TabsContent value="application">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Application Email Templates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage emails sent during the application process
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
                    name: "Application Received",
                    description: "Sent to candidates when their application is received",
                    lastUpdated: "2025-03-01",
                  },
                  {
                    name: "Application Under Review",
                    description: "Sent to candidates when their application moves to review stage",
                    lastUpdated: "2025-02-20",
                  },
                  {
                    name: "Assessment Invitation",
                    description: "Invitation to complete an assessment test",
                    lastUpdated: "2025-02-15",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-perfecthire-100">
                        <Mail className="h-5 w-5 text-perfecthire-700" />
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
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Interview Email Templates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage emails sent during the interview process
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
                    name: "Interview Invitation",
                    description: "Sent to candidates to schedule an interview",
                    lastUpdated: "2025-03-05",
                  },
                  {
                    name: "Interview Confirmation",
                    description: "Confirmation of scheduled interview with details",
                    lastUpdated: "2025-03-02",
                  },
                  {
                    name: "Interview Reminder",
                    description: "Reminder sent 24 hours before scheduled interview",
                    lastUpdated: "2025-02-28",
                  },
                  {
                    name: "Interview Follow-up",
                    description: "Thank you email sent after interview completion",
                    lastUpdated: "2025-02-25",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-perfecthire-100">
                        <Mail className="h-5 w-5 text-perfecthire-700" />
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
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offer">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Offer Email Templates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage emails sent during the offer process
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
                    name: "Offer Letter",
                    description: "Email with offer letter attachment",
                    lastUpdated: "2025-03-10",
                  },
                  {
                    name: "Offer Reminder",
                    description: "Reminder for pending offer response",
                    lastUpdated: "2025-03-08",
                  },
                  {
                    name: "Offer Acceptance Confirmation",
                    description: "Confirmation after candidate accepts offer",
                    lastUpdated: "2025-03-05",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-perfecthire-100">
                        <Mail className="h-5 w-5 text-perfecthire-700" />
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
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejection">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Rejection Email Templates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Manage emails sent to rejected candidates
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
                    name: "Application Rejection",
                    description: "Sent to candidates who don't meet initial requirements",
                    lastUpdated: "2025-03-12",
                  },
                  {
                    name: "Post-Interview Rejection",
                    description: "Sent to candidates after unsuccessful interview",
                    lastUpdated: "2025-03-10",
                  },
                  {
                    name: "Final Stage Rejection",
                    description: "Sent to candidates who reached final stages but weren't selected",
                    lastUpdated: "2025-03-08",
                  },
                ].map((template, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-perfecthire-100">
                        <Mail className="h-5 w-5 text-perfecthire-700" />
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
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="border-perfecthire-300">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

