"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Mail,
  Users,
  BarChart2,
  ClipboardCheck,
  MessageSquare,
  Send,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// Mock job data
const jobs = [
  { id: "1", title: "Senior Software Engineer" },
  { id: "2", title: "Product Manager" },
  { id: "3", title: "UX Designer" },
  { id: "4", title: "Marketing Specialist" },
  { id: "5", title: "Sales Representative" },
]

// Mock candidate data
interface Candidate {
  id: string
  name: string
  currentPosition: string
  company: string
  location: string
  matchScore: number
  skills: string[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  contact: {
    email: string
    phone: string
    linkedin?: string
  }
  notes?: string
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    currentPosition: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "CI/CD"],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2021 - Present",
        description:
          "Lead developer for customer-facing applications. Implemented new React component library reducing development time by 40%.",
      },
      {
        title: "Frontend Developer",
        company: "WebDev Co",
        duration: "2018 - 2021",
        description:
          "Developed responsive web applications using React and TypeScript. Collaborated with UX team to implement design systems.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of California, Berkeley",
        year: "2018",
      },
    ],
    contact: {
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      linkedin: "linkedin.com/in/alexjohnson",
    },
  },
  {
    id: "2",
    name: "Sarah Chen",
    currentPosition: "Full Stack Engineer",
    company: "Innovate Labs",
    location: "Seattle, WA",
    matchScore: 92,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Docker", "Kubernetes"],
    experience: [
      {
        title: "Full Stack Engineer",
        company: "Innovate Labs",
        duration: "2020 - Present",
        description:
          "Developed and maintained microservices architecture. Implemented CI/CD pipelines reducing deployment time by 60%.",
      },
      {
        title: "Software Engineer",
        company: "DataTech",
        duration: "2017 - 2020",
        description:
          "Built data visualization tools using D3.js and React. Optimized database queries improving performance by 35%.",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "University of Washington",
        year: "2017",
      },
      {
        degree: "B.S. Information Systems",
        institution: "Boston University",
        year: "2015",
      },
    ],
    contact: {
      email: "sarah.chen@example.com",
      phone: "(555) 987-6543",
      linkedin: "linkedin.com/in/sarahchen",
    },
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    currentPosition: "Backend Developer",
    company: "Cloud Systems",
    location: "Austin, TX",
    matchScore: 88,
    skills: ["Java", "Spring Boot", "Microservices", "AWS", "Kafka", "PostgreSQL"],
    experience: [
      {
        title: "Backend Developer",
        company: "Cloud Systems",
        duration: "2019 - Present",
        description:
          "Designed and implemented scalable microservices. Reduced API response time by 45% through optimization.",
      },
      {
        title: "Java Developer",
        company: "Enterprise Solutions",
        duration: "2016 - 2019",
        description:
          "Maintained and enhanced legacy Java applications. Migrated monolithic application to microservices architecture.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Engineering",
        institution: "University of Texas at Austin",
        year: "2016",
      },
    ],
    contact: {
      email: "michael.rodriguez@example.com",
      phone: "(555) 234-5678",
    },
    notes: "Strong backend skills but limited frontend experience. Interested in learning React.",
  },
  {
    id: "4",
    name: "Emily Wilson",
    currentPosition: "DevOps Engineer",
    company: "TechOps Inc.",
    location: "Chicago, IL",
    matchScore: 85,
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "Python", "Bash"],
    experience: [
      {
        title: "DevOps Engineer",
        company: "TechOps Inc.",
        duration: "2020 - Present",
        description:
          "Implemented infrastructure as code using Terraform. Reduced deployment failures by 70% through automated testing.",
      },
      {
        title: "Systems Administrator",
        company: "Network Solutions",
        duration: "2017 - 2020",
        description:
          "Managed on-premise and cloud infrastructure. Migrated services to AWS reducing operational costs by 30%.",
      },
    ],
    education: [
      {
        degree: "B.S. Information Technology",
        institution: "Illinois Institute of Technology",
        year: "2017",
      },
    ],
    contact: {
      email: "emily.wilson@example.com",
      phone: "(555) 345-6789",
    },
  },
  {
    id: "5",
    name: "David Kim",
    currentPosition: "Mobile Developer",
    company: "App Innovations",
    location: "New York, NY",
    matchScore: 82,
    skills: ["React Native", "Swift", "Kotlin", "JavaScript", "Firebase", "Redux"],
    experience: [
      {
        title: "Mobile Developer",
        company: "App Innovations",
        duration: "2019 - Present",
        description:
          "Developed cross-platform mobile applications using React Native. Implemented state management with Redux.",
      },
      {
        title: "iOS Developer",
        company: "Mobile Solutions",
        duration: "2016 - 2019",
        description:
          "Built native iOS applications using Swift. Integrated with RESTful APIs and implemented offline functionality.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "New York University",
        year: "2016",
      },
    ],
    contact: {
      email: "david.kim@example.com",
      phone: "(555) 456-7890",
      linkedin: "linkedin.com/in/davidkim",
    },
  },
]

// Mock job details data
const jobDetails = {
  "1": {
    title: "Senior Software Engineer",
    description:
      "We are looking for a Senior Software Engineer to join our growing engineering team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and mentoring junior developers.",
    requirements: [
      "5+ years of experience in software development",
      "Strong proficiency in JavaScript, TypeScript, and React",
      "Experience with Node.js and RESTful APIs",
      "Knowledge of cloud services (AWS, Azure, or GCP)",
      "Bachelor's degree in Computer Science or related field",
    ],
    hiringManager: {
      name: "Jennifer Lee",
      position: "Engineering Director",
      email: "jennifer.lee@example.com",
    },
  },
  "2": {
    title: "Product Manager",
    description:
      "We're seeking an experienced Product Manager to help us define and launch innovative products. You'll work closely with engineering, design, and marketing teams to deliver products that meet customer needs and business objectives.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management abilities",
      "Experience with agile methodologies",
      "Bachelor's degree in Business, Computer Science, or related field",
    ],
    hiringManager: {
      name: "Michael Chen",
      position: "Head of Product",
      email: "michael.chen@example.com",
    },
  },
  "3": {
    title: "UX Designer",
    description:
      "Join our design team to create exceptional user experiences for our products. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement your designs.",
    requirements: [
      "3+ years of UX design experience",
      "Proficiency in design tools like Figma and Sketch",
      "Experience with user research and usability testing",
      "Strong portfolio demonstrating your design process",
      "Bachelor's degree in Design, HCI, or related field",
    ],
    hiringManager: {
      name: "Sarah Johnson",
      position: "Design Lead",
      email: "sarah.johnson@example.com",
    },
  },
  "4": {
    title: "Marketing Specialist",
    description:
      "We are looking for a Marketing Specialist to join our team and help drive our marketing initiatives. You will be responsible for creating content, managing social media, and analyzing campaign performance.",
    requirements: [
      "2+ years of marketing experience",
      "Strong writing and content creation skills",
      "Experience with social media management and analytics",
      "Knowledge of SEO and digital marketing best practices",
      "Bachelor's degree in Marketing, Communications, or related field",
    ],
    hiringManager: {
      name: "David Wilson",
      position: "Marketing Director",
      email: "david.wilson@example.com",
    },
  },
  "5": {
    title: "Sales Representative",
    description:
      "Join our sales team to help grow our customer base and revenue. You will be responsible for prospecting, presenting our solutions, and closing deals with new and existing customers.",
    requirements: [
      "2+ years of sales experience, preferably in B2B software",
      "Strong communication and negotiation skills",
      "Experience with CRM systems like Salesforce",
      "Track record of meeting or exceeding sales targets",
      "Bachelor's degree in Business or related field preferred",
    ],
    hiringManager: {
      name: "Emily Rodriguez",
      position: "Sales Manager",
      email: "emily.rodriguez@example.com",
    },
  },
}

// Mock candidate pipeline data
const candidatePipeline = {
  toReview: 5,
  reachout: 3,
  replied: 2,
}

export default function HireaidePage() {
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [showResults, setShowResults] = useState<boolean>(false)
  const [showReview, setShowReview] = useState<boolean>(false)
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0)

  const handleSourceCandidates = () => {
    if (!selectedJob) return

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setCandidates(mockCandidates)
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const handleReviewCandidates = () => {
    setShowReview(true)
    setCurrentCandidateIndex(0)
  }

  const handleNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1)
    }
  }

  const handlePreviousCandidate = () => {
    if (currentCandidateIndex > 0) {
      setCurrentCandidateIndex(currentCandidateIndex - 1)
    }
  }

  const handlePassCandidate = (candidateId: string) => {
    // In a real app, you would call an API to update the candidate status
    console.log(`Passed candidate ${candidateId}`)
    handleNextCandidate()
  }

  const handleRejectCandidate = (candidateId: string) => {
    // In a real app, you would call an API to update the candidate status
    console.log(`Rejected candidate ${candidateId}`)
    handleNextCandidate()
  }

  const currentCandidate = candidates[currentCandidateIndex]

  return (
    <div className="container mx-auto py-8 px-4">
      {!showReview ? (
        <>
          {!showResults ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-perfecthire-900 mb-2">Hireaide</h1>
                  <p className="text-perfecthire-600 max-w-2xl">
                    Perfect Hire HireAid is an AI-powered sourcing platform integrated directly into Perfect Hire,
                    designed to automate the candidate discovery process and turn job descriptions into smart lead
                    lists—just like a sales CRM for recruiters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-perfecthire-900" />
                  <span className="text-perfecthire-900 font-medium">AI-Powered Sourcing</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Search className="h-5 w-5 text-perfecthire-700" />
                      AI-Powered Candidate Search
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-perfecthire-600">
                      Our system reads the entire context of the job, not just keywords, and finds the best-fit
                      candidates using semantic search and vector similarity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-perfecthire-700" />
                      Career Trajectory Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-perfecthire-600">
                      Instead of just checking boxes, the system looks at growth patterns—who's advancing quickly,
                      making meaningful moves, and showing impact.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-perfecthire-700" />
                      Predictive Analytics (Intent to Leave)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-perfecthire-600">
                      AI analyzes employment history, industry churn, and other signals to tell you: "This person is
                      likely open to new opportunities right now."
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mail className="h-5 w-5 text-perfecthire-700" />
                      Automated Outreach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-perfecthire-600">
                      Once we've built the list, AI writes tailored messages (email, LinkedIn, SMS) that feel personal
                      and human. No templates, no spam.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-perfecthire-700" />
                      Team Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-perfecthire-600">
                      All sourcing lists live inside Perfect Hire. Anyone on the hiring team can view, comment, update,
                      and track activity in real-time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-perfecthire-900 mb-2">{jobDetails[selectedJob]?.title}</h2>
                      <p className="text-perfecthire-600 mb-4">{jobDetails[selectedJob]?.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {jobDetails[selectedJob]?.requirements.slice(0, 3).map((req, index) => (
                          <Badge key={index} variant="outline" className="bg-perfecthire-50">
                            {req}
                          </Badge>
                        ))}
                        {jobDetails[selectedJob]?.requirements.length > 3 && (
                          <Badge variant="outline" className="bg-perfecthire-50">
                            +{jobDetails[selectedJob]?.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="md:w-64 flex flex-col items-center md:items-end">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-right">
                          <p className="font-medium text-perfecthire-900">
                            {jobDetails[selectedJob]?.hiringManager.name}
                          </p>
                          <p className="text-sm text-perfecthire-600">
                            {jobDetails[selectedJob]?.hiringManager.position}
                          </p>
                        </div>
                        <Avatar>
                          <AvatarFallback>
                            {jobDetails[selectedJob]?.hiringManager.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-perfecthire-600">{jobDetails[selectedJob]?.hiringManager.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-perfecthire-50 to-white border-perfecthire-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-perfecthire-700" />
                      To Review
                    </CardTitle>
                    <CardDescription>Candidates waiting for your review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-perfecthire-900">{candidatePipeline.toReview}</span>
                      <Badge className="bg-amber-100 text-amber-800">New</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-perfecthire-200 text-perfecthire-800 hover:bg-perfecthire-50"
                      onClick={handleReviewCandidates}
                    >
                      Review Candidates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-blue-700" />
                      Reachout
                    </CardTitle>
                    <CardDescription>Candidates ready for outreach</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-900">{candidatePipeline.reachout}</span>
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-800 hover:bg-blue-50">
                      Send Messages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-700" />
                      Replied
                    </CardTitle>
                    <CardDescription>Candidates who have responded</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-green-900">{candidatePipeline.replied}</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-green-200 text-green-800 hover:bg-green-50">
                      View Conversations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your candidate pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-perfecthire-600">
                            {candidate.currentPosition} at {candidate.company}
                          </div>
                        </div>
                        <Badge
                          className={`
                            ${
                              candidate.matchScore >= 90
                                ? "bg-green-100 text-green-800"
                                : candidate.matchScore >= 80
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          `}
                        >
                          {candidate.matchScore}% Match
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentCandidateIndex(candidates.findIndex((c) => c.id === candidate.id))
                            setShowReview(true)
                          }}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleReviewCandidates}>
                    View All Candidates
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          <Card className={`mb-8 ${showResults ? "mt-8" : ""}`}>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Source Candidates with AI</CardTitle>
              <CardDescription>
                Select a job description and let HireAid find the best candidates, analyze their career trajectory, and
                prepare personalized outreach.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-perfecthire-700">Select Job Description</label>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSourceCandidates}
                disabled={!selectedJob || isLoading}
                className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-4 rounded-full mr-2" />
                    Sourcing Candidates...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find & Score Candidates
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => setShowReview(false)} className="text-perfecthire-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePreviousCandidate}
                disabled={currentCandidateIndex === 0}
                className="border-perfecthire-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-perfecthire-600">
                {currentCandidateIndex + 1} of {candidates.length}
              </span>
              <Button
                variant="outline"
                onClick={handleNextCandidate}
                disabled={currentCandidateIndex === candidates.length - 1}
                className="border-perfecthire-300"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {currentCandidate && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col items-center w-full">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={currentCandidate.name} />
                          <AvatarFallback className="text-xl">
                            {currentCandidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl text-center">{currentCandidate.name}</CardTitle>
                        <CardDescription className="text-center">{currentCandidate.currentPosition}</CardDescription>
                        <div className="text-sm text-perfecthire-600 mt-1 text-center">{currentCandidate.company}</div>
                        <div className="text-sm text-perfecthire-600 mt-1 text-center">{currentCandidate.location}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Match Score</div>
                        <div className="flex items-center justify-between mb-2">
                          <Progress
                            value={currentCandidate.matchScore}
                            className={`h-2 flex-1 mr-2 ${
                              currentCandidate.matchScore >= 90
                                ? "bg-green-100"
                                : currentCandidate.matchScore >= 80
                                  ? "bg-amber-100"
                                  : "bg-red-100"
                            }`}
                          />
                          <Badge
                            className={`
                              ${
                                currentCandidate.matchScore >= 90
                                  ? "bg-green-100 text-green-800"
                                  : currentCandidate.matchScore >= 80
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            `}
                          >
                            {currentCandidate.matchScore}%
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Contact Information</div>
                        <div className="space-y-1 text-sm">
                          <div>Email: {currentCandidate.contact.email}</div>
                          <div>Phone: {currentCandidate.contact.phone}</div>
                          {currentCandidate.contact.linkedin && (
                            <div>LinkedIn: {currentCandidate.contact.linkedin}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {currentCandidate.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-perfecthire-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {currentCandidate.notes && (
                        <div>
                          <div className="text-sm font-medium text-perfecthire-700 mb-2">Notes</div>
                          <div className="text-sm text-perfecthire-600 bg-gray-50 p-2 rounded">
                            {currentCandidate.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleRejectCandidate(currentCandidate.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handlePassCandidate(currentCandidate.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Pass
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="experience" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="experience" className="flex-1">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex-1">
                      Education
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="experience" className="mt-4 space-y-4">
                    {currentCandidate.experience.map((exp, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{exp.title}</CardTitle>
                              <CardDescription>{exp.company}</CardDescription>
                            </div>
                            <div className="text-sm text-perfecthire-600">{exp.duration}</div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-perfecthire-700">{exp.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="education" className="mt-4 space-y-4">
                    {currentCandidate.education.map((edu, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{edu.degree}</CardTitle>
                              <CardDescription>{edu.institution}</CardDescription>
                            </div>
                            <div className="text-sm text-perfecthire-600">{edu.year}</div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>

                {/* Match Details section moved outside of tabs */}
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Match Analysis</CardTitle>
                      <CardDescription>How this candidate matches the job requirements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Skills Match</div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Technical Skills</div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(currentCandidate.matchScore * 0.95)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.95} className="h-2 bg-green-100 mb-2" />

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Soft Skills</div>
                          <Badge className="bg-amber-100 text-amber-800">
                            {Math.round(currentCandidate.matchScore * 0.9)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.9} className="h-2 bg-amber-100" />
                      </div>

                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Experience Match</div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Years of Experience</div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(currentCandidate.matchScore * 0.98)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.98} className="h-2 bg-green-100 mb-2" />

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Industry Relevance</div>
                          <Badge className="bg-amber-100 text-amber-800">
                            {Math.round(currentCandidate.matchScore * 0.85)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.85} className="h-2 bg-amber-100" />
                      </div>

                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Education Match</div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Degree Relevance</div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(currentCandidate.matchScore * 0.92)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.92} className="h-2 bg-green-100" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-perfecthire-700 mb-2">Career Trajectory</div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Growth Rate</div>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(currentCandidate.matchScore * 0.94)}%
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.94} className="h-2 bg-green-100 mb-2" />

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-perfecthire-600">Intent to Leave</div>
                          <Badge
                            className={`
                              ${currentCandidate.matchScore >= 90 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}
                            `}
                          >
                            {currentCandidate.matchScore >= 90 ? "High" : "Medium"}
                          </Badge>
                        </div>
                        <Progress value={currentCandidate.matchScore * 0.9} className="h-2 bg-amber-100" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

