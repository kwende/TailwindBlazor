import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Video, Clock, User, FileText, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  // Mock interview data - in a real app, this would be fetched from your API/database
  const interview = {
    id: params.id,
    candidate: {
      id: "c123",
      name: "Alex Johnson",
      position: "Senior Software Engineer",
      email: "alex@example.com",
      stage: "interview",
    },
    date: "2025-03-20T10:00:00Z",
    type: "video",
    interviewers: ["Jamie Smith", "Taylor Brown"],
    status: "completed",
    questions: [
      "Tell me about your experience with React and modern JavaScript frameworks.",
      "How do you approach performance optimization in web applications?",
      "Describe a complex technical problem you've solved recently.",
      "How do you stay updated with the latest technologies?",
      "Tell me about a time when you had to work under a tight deadline.",
      "How do you approach code reviews?",
      "What's your experience with cloud services like AWS or Azure?",
      "How do you handle disagreements within a team?",
    ],
    feedback: null,
  }

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 mr-2 text-perfecthire-700" />
      default:
        return <Calendar className="h-5 w-5 mr-2 text-perfecthire-700" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-perfecthire-900">Interview Details</h1>
          <p className="text-perfecthire-600">
            {new Date(interview.date).toLocaleDateString()} at{" "}
            {new Date(interview.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
          <Link href={`/interviews/${params.id}/feedback`}>
            <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
              <FileText className="mr-2 h-4 w-4" />
              Provide Feedback
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Candidate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                <AvatarFallback className="text-lg">
                  {interview.candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-perfecthire-900">{interview.candidate.name}</h3>
              <p className="text-perfecthire-600">{interview.candidate.position}</p>
              <Badge className="mt-2 bg-perfecthire-100 text-perfecthire-800">{interview.candidate.stage}</Badge>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center text-perfecthire-700">
                <User className="h-4 w-4 mr-2" />
                <span>{interview.candidate.email}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                {getInterviewTypeIcon(interview.type)}
                <span className="capitalize">{interview.type} Interview</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {new Date(interview.date).toLocaleDateString()} at{" "}
                  {new Date(interview.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2 text-perfecthire-800">Interviewers</h4>
              <div className="space-y-2">
                {interview.interviewers.map((interviewer, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {interviewer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-perfecthire-700">{interviewer}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2 text-perfecthire-800">Status</h4>
              <Badge
                className={`${
                  interview.status === "scheduled"
                    ? "bg-perfecthire-100 text-perfecthire-800"
                    : interview.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-perfecthire-200 text-perfecthire-800"
                }`}
              >
                {interview.status}
              </Badge>

              {interview.status === "completed" && !interview.feedback && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Feedback required
                  </p>
                </div>
              )}

              {interview.feedback && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Feedback provided
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interview Questions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Interview Questions</CardTitle>
            <CardDescription className="text-perfecthire-600">Questions prepared for this interview</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="questions">
              <TabsList>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="mt-4">
                <div className="space-y-4">
                  {interview.questions.map((question, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex items-start">
                        <span className="bg-perfecthire-100 text-perfecthire-800 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-perfecthire-800">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                {interview.status === "completed" ? (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2 text-perfecthire-800">Jamie Smith</h3>
                      <p className="text-perfecthire-700">
                        The candidate demonstrated strong knowledge of React and modern JavaScript practices. They were
                        able to explain complex concepts clearly and provided good examples from their past work.
                      </p>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2 text-perfecthire-800">Taylor Brown</h3>
                      <p className="text-perfecthire-700">
                        Alex showed great enthusiasm for our company mission and values. They asked thoughtful questions
                        about our team structure and work processes.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-perfecthire-600">Notes will be available after the interview is completed.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

