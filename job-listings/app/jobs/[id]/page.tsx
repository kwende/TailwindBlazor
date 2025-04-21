"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Calendar, MapPin, Building, CheckCircle, Clock, XCircle, Download, Edit } from "lucide-react"
import { CandidatePipeline } from "@/components/candidate-pipeline"

interface JobDetails {
  id: number
  title: string
  department: string
  location: string
  applicants: number
  status: string
  postedDate: string
  closingDate: string
  hiringManager: string
  description: string
  requirements: string[]
  benefits: string[]
  stats: {
    totalApplicants: number
    inReview: number
    interviewed: number
    offered: number
    rejected: number
  }
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id

  // In a real app, you would fetch this data from an API
  const job: JobDetails = {
    id: Number.parseInt(jobId),
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    applicants: 24,
    status: "active",
    postedDate: "2025-03-01",
    closingDate: "2025-04-01",
    hiringManager: "Jamie Smith",
    description:
      "We are looking for a Senior Software Engineer to join our team. The ideal candidate will have experience with React, Node.js, and cloud technologies.",
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with React and Node.js",
      "Familiarity with cloud platforms (AWS, Azure, GCP)",
      "Good communication skills",
    ],
    benefits: [
      "Competitive salary",
      "Remote work options",
      "Health insurance",
      "401(k) matching",
      "Professional development budget",
    ],
    stats: {
      totalApplicants: 24,
      inReview: 8,
      interviewed: 5,
      offered: 2,
      rejected: 9,
    },
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "closing soon":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            <Clock className="mr-1 h-3 w-3" />
            Closing Soon
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="mr-1 h-3 w-3" />
            Closed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-perfecthire-900">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center text-perfecthire-600">
                <Building className="mr-1 h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center text-perfecthire-600">
                <MapPin className="mr-1 h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center text-perfecthire-600">
                <Calendar className="mr-1 h-4 w-4" />
                Posted: {formatDate(job.postedDate)}
              </div>
              <div className="flex items-center text-perfecthire-600">
                <Users className="mr-1 h-4 w-4" />
                {job.applicants} Applicants
              </div>
              {getStatusBadge(job.status)}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-perfecthire-300">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="border-perfecthire-300">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
              <Users className="mr-2 h-4 w-4" />
              Find Candidates
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="candidates" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-perfecthire-700">{job.description}</p>

              <h3 className="font-semibold text-perfecthire-900 mt-6 mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-perfecthire-700">
                {job.requirements.map((req, index) => (
                  <li key={`req-${index}`}>{req}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-perfecthire-900 mt-6 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-perfecthire-700">
                {job.benefits.map((benefit, index) => (
                  <li key={`benefit-${index}`}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-perfecthire-900">Total Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-perfecthire-900">{job.stats.totalApplicants}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-perfecthire-900">In Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-perfecthire-900">{job.stats.inReview}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-perfecthire-900">Interviewed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-perfecthire-900">{job.stats.interviewed}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-perfecthire-900">Offer Extended</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-perfecthire-900">{job.stats.offered}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          <CandidatePipeline jobId={jobId} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Job Settings</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Manage job visibility, application form, and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-perfecthire-700">Job settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

