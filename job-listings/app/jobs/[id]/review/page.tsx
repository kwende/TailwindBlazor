"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Building,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function JobReviewPage({ params }: { params: { id: string } }) {
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)

  // Mock job data - in a real app, this would be fetched from your API/database
  const job = {
    id: Number.parseInt(params.id),
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full-time",
    salaryRange: "$90,000 - $120,000",
    status: "pending",
    requestedBy: "Jamie Smith",
    requestDate: "2025-03-10",
    approver: "Alex Director",
    notes: "Need to fill this position ASAP due to team expansion.",
    description: `## About the Role
We are looking for a Frontend Developer to join our engineering team. In this role, you will be responsible for implementing visual elements that users see and interact with in a web application.

## Key Responsibilities
- Develop new user-facing features using React.js
- Build reusable components and front-end libraries for future use
- Translate designs and wireframes into high-quality code
- Optimize components for maximum performance across a vast array of web-capable devices and browsers
- Collaborate with back-end developers and web designers to improve usability

## Requirements
- 3+ years of experience with React.js and modern JavaScript (ES6+)
- Strong proficiency in HTML, CSS, and responsive design
- Experience with state management libraries (Redux, Context API)
- Familiarity with RESTful APIs and GraphQL
- Understanding of Git version control
- Bachelor's degree in Computer Science or equivalent experience`,
    requirements: [
      "3+ years of experience with React.js and modern JavaScript (ES6+)",
      "Strong proficiency in HTML, CSS, and responsive design",
      "Experience with state management libraries (Redux, Context API)",
      "Familiarity with RESTful APIs and GraphQL",
      "Understanding of Git version control",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "Redux", "Git", "REST APIs", "GraphQL"],
    hiringManager: "Jamie Smith",
    team: "Frontend Engineering",
    expectedStartDate: "2025-04-15",
    screeningQuestions: [
      "How many years of experience do you have with React?",
      "Describe a challenging project you worked on recently.",
      "What is your experience with state management in React?",
      "Are you comfortable working in a remote environment?",
    ],
  }

  const handleSubmit = async (action: "approve" | "reject") => {
    setDecision(action)
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1500)
      })

      // In a real app, you would make an actual API call here
      // await approveOrRejectJob(job.id, action, feedbackText);

      // In a real app, you would redirect or show a success message
    } catch (error) {
      console.error("Error processing job action:", error)
      // Handle error appropriately, e.g., show error message to user
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="outline" size="sm" className="border-perfecthire-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-perfecthire-900">Review Job Posting</h1>
          <Badge variant="outline" className="bg-perfecthire-100 text-perfecthire-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending Approval
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Job Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 rounded-full bg-perfecthire-100 mb-4">
                <Briefcase className="h-8 w-8 text-perfecthire-800" />
              </div>
              <h3 className="text-xl font-semibold text-perfecthire-900">{job.title}</h3>
              <p className="text-perfecthire-600">{job.department}</p>
              <Badge variant="outline" className="mt-2 bg-perfecthire-50 text-perfecthire-700">
                {job.employmentType}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-perfecthire-700">
                <MapPin className="h-4 w-4 mr-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <DollarSign className="h-4 w-4 mr-3" />
                <span>{job.salaryRange}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Building className="h-4 w-4 mr-3" />
                <span>Team: {job.team}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Users className="h-4 w-4 mr-3" />
                <span>Hiring Manager: {job.hiringManager}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Calendar className="h-4 w-4 mr-3" />
                <span>Expected Start: {job.expectedStartDate}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h4 className="font-medium mb-3 text-perfecthire-800">Required Skills</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-perfecthire-50 text-perfecthire-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h4 className="font-medium mb-3 text-perfecthire-800">Request Details</h4>
              <div className="space-y-2">
                <div className="flex items-center text-perfecthire-700">
                  <Users className="h-4 w-4 mr-3" />
                  <span>Requested by: {job.requestedBy}</span>
                </div>
                <div className="flex items-center text-perfecthire-700">
                  <Clock className="h-4 w-4 mr-3" />
                  <span>Requested on: {new Date(job.requestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-perfecthire-700">
                  <Users className="h-4 w-4 mr-3" />
                  <span>Approver: {job.approver}</span>
                </div>
              </div>
              {job.notes && (
                <div className="mt-4 p-3 bg-perfecthire-50 rounded-md">
                  <p className="text-sm text-perfecthire-700">{job.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description">Job Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="questions">Screening Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {job.description.split("\n\n").map((paragraph, i) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2 key={i} className="text-xl font-bold text-perfecthire-900 mt-4">
                            {paragraph.substring(3)}
                          </h2>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Job Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-perfecthire-700">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Screening Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.screeningQuestions.map((question, index) => (
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Approval Decision</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Review the job posting and provide your decision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-perfecthire-800">Feedback</h3>
                  <Textarea
                    placeholder="Add your feedback or comments about this job posting..."
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
              <Link href={`/jobs/${job.id}/edit`}>
                <Button variant="outline" className="border-perfecthire-300 w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Before Decision
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 w-full sm:w-auto"
                onClick={() => handleSubmit("reject")}
                disabled={isSubmitting}
              >
                <XCircle className="mr-2 h-4 w-4" />
                {isSubmitting && decision === "reject" ? "Rejecting..." : "Reject Job"}
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                onClick={() => handleSubmit("approve")}
                disabled={isSubmitting}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {isSubmitting && decision === "approve" ? "Approving..." : "Approve Job"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

