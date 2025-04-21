"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle, User, Clock } from "lucide-react"
import { submitInterviewFeedback } from "@/lib/actions"

export default function InterviewFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [decision, setDecision] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    notes: [
      {
        id: "n1",
        interviewer: "Jamie Smith",
        content: `# Technical Assessment

The candidate demonstrated strong knowledge of React and modern JavaScript practices. They were able to explain complex concepts clearly and provided good examples from their past work.

## Strengths
- Deep understanding of React hooks and state management
- Experience with performance optimization
- Good communication skills when explaining technical concepts

## Areas for Improvement
- Limited experience with GraphQL
- Could improve knowledge of testing strategies

Overall, I believe the candidate has the technical skills required for this position.`,
        timestamp: "2025-03-20T11:15:00Z",
      },
      {
        id: "n2",
        interviewer: "Taylor Brown",
        content: `# Cultural Fit Assessment

Alex showed great enthusiasm for our company mission and values. They asked thoughtful questions about our team structure and work processes.

## Observations
- Collaborative approach to problem-solving
- Values align well with our company culture
- Demonstrated adaptability through past experiences

I think Alex would be a good cultural fit for our team and would contribute positively to our work environment.`,
        timestamp: "2025-03-20T11:30:00Z",
      },
    ],
  }

  const handleSubmit = async () => {
    if (!decision) return

    setIsSubmitting(true)

    try {
      // In a real app, this would call your API
      await submitInterviewFeedback({
        interviewId: interview.id,
        candidateId: interview.candidate.id,
        decision,
        feedback: feedbackText,
      })

      // Redirect to the interviews list with a success message
      router.push("/interviews?feedback=submitted")
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-perfecthire-900">Interview Feedback</h1>
        <p className="text-perfecthire-600">Review interview notes and provide your decision</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Information */}
        <Card className="lg:col-span-1">
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
          </CardContent>
        </Card>

        {/* Interview Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Interview Notes</CardTitle>
            <CardDescription className="text-perfecthire-600">Review the notes from all interviewers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={interview.notes[0].id}>
              <TabsList className="mb-4">
                {interview.notes.map((note) => (
                  <TabsTrigger key={note.id} value={note.id}>
                    {note.interviewer}
                  </TabsTrigger>
                ))}
              </TabsList>

              {interview.notes.map((note) => (
                <TabsContent key={note.id} value={note.id} className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-perfecthire-500">
                    <span>{new Date(note.timestamp).toLocaleString()}</span>
                  </div>

                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {note.content.split("\n\n").map((paragraph, i) => {
                      if (paragraph.startsWith("# ")) {
                        return (
                          <h2 key={i} className="text-xl font-bold text-perfecthire-900 mt-4">
                            {paragraph.substring(2)}
                          </h2>
                        )
                      } else if (paragraph.startsWith("## ")) {
                        return (
                          <h3 key={i} className="text-lg font-semibold text-perfecthire-800 mt-3">
                            {paragraph.substring(3)}
                          </h3>
                        )
                      } else if (paragraph.startsWith("- ")) {
                        return (
                          <ul key={i} className="list-disc pl-5 my-2">
                            {paragraph.split("\n").map((item, j) => (
                              <li key={j} className="text-perfecthire-700">
                                {item.substring(2)}
                              </li>
                            ))}
                          </ul>
                        )
                      } else {
                        return (
                          <p key={i} className="text-perfecthire-700">
                            {paragraph}
                          </p>
                        )
                      }
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Feedback and Decision */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Your Feedback</CardTitle>
            <CardDescription className="text-perfecthire-600">
              Provide your feedback and decision on this candidate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-perfecthire-800">Decision</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className={`flex-1 ${decision === "pass" ? "bg-green-600 hover:bg-green-700" : "bg-perfecthire-100 text-perfecthire-800 hover:bg-perfecthire-200"}`}
                  onClick={() => setDecision("pass")}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Pass to Next Round
                </Button>
                <Button
                  className={`flex-1 ${decision === "reject" ? "bg-red-600 hover:bg-red-700" : "bg-perfecthire-100 text-perfecthire-800 hover:bg-perfecthire-200"}`}
                  onClick={() => setDecision("reject")}
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Reject Candidate
                </Button>
                <Button
                  className={`flex-1 ${decision === "hold" ? "bg-amber-500 hover:bg-amber-600" : "bg-perfecthire-100 text-perfecthire-800 hover:bg-perfecthire-200"}`}
                  onClick={() => setDecision("hold")}
                >
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Hold for Later
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 text-perfecthire-800">Additional Feedback</h3>
              <Textarea
                placeholder="Add your feedback about this candidate..."
                rows={5}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              className="mr-2 border-perfecthire-300 text-perfecthire-800"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
              onClick={handleSubmit}
              disabled={!decision || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

