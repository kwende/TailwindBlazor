import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InterviewsList from "@/components/interviews-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function InterviewsPage({ searchParams }: { searchParams: { feedback?: string } }) {
  const showFeedbackAlert = searchParams.feedback === "submitted"

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-perfecthire-900">Interviews</h1>

      {showFeedbackAlert && (
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your feedback has been submitted successfully. The candidate will be notified of the next steps.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Interviews</TabsTrigger>
          <TabsTrigger value="feedback">Pending Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Upcoming Interviews</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Interviews scheduled for the coming days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InterviewsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Past Interviews</CardTitle>
              <CardDescription className="text-perfecthire-600">Interviews that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <InterviewsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Pending Feedback</CardTitle>
              <CardDescription className="text-perfecthire-600">Interviews that require your feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <InterviewsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

