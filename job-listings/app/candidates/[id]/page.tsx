"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  FileText,
  Clock,
  ChevronRight,
  MessageSquare,
  CalendarPlus,
  Download,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock candidate data - in a real app, this would be fetched from your API/database
  const candidate = {
    id: Number.parseInt(params.id),
    name: "Alex Johnson",
    position: "Senior Software Engineer",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    stage: "interview",
    match: 95,
    source: "AI Sourcing",
    lastActivity: "2025-03-15T10:30:00Z",
    appliedDate: "2025-03-01T09:15:00Z",
    tags: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science in Computer Science",
        years: "2018 - 2020",
      },
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        years: "2014 - 2018",
      },
    ],
    experience: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Software Engineer",
        years: "2022 - Present",
        description:
          "Led development of cloud-based solutions using React, Node.js, and AWS. Improved system performance by 40% through architecture optimization.",
      },
      {
        company: "Digital Solutions LLC",
        position: "Software Engineer",
        years: "2020 - 2022",
        description:
          "Developed and maintained web applications using React and TypeScript. Collaborated with cross-functional teams to deliver features on time.",
      },
      {
        company: "StartupXYZ",
        position: "Junior Developer",
        years: "2018 - 2020",
        description:
          "Assisted in building frontend components and implementing responsive designs. Participated in code reviews and agile development processes.",
      },
    ],
    skills: [
      { name: "React", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "AWS", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "Docker", level: 70 },
    ],
    interviews: [
      {
        id: 1,
        type: "Technical Interview",
        date: "2025-03-10T14:00:00Z",
        interviewers: ["Jamie Smith", "Taylor Brown"],
        status: "completed",
        feedback: "Strong technical skills, especially in React and system design.",
      },
      {
        id: 2,
        type: "Cultural Fit",
        date: "2025-03-15T11:00:00Z",
        interviewers: ["Morgan Lee"],
        status: "scheduled",
        feedback: null,
      },
    ],
    notes: [
      {
        id: 1,
        author: "Jamie Smith",
        date: "2025-03-10T16:30:00Z",
        content:
          "Alex demonstrated strong problem-solving skills during the technical interview. Their experience with React and AWS is impressive.",
      },
      {
        id: 2,
        author: "Taylor Brown",
        date: "2025-03-10T17:15:00Z",
        content:
          "I was particularly impressed with Alex's system design approach. They clearly articulated trade-offs and considerations.",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Resume.pdf",
        type: "resume",
        uploadDate: "2025-03-01T09:15:00Z",
      },
      {
        id: 2,
        name: "Cover Letter.pdf",
        type: "cover_letter",
        uploadDate: "2025-03-01T09:15:00Z",
      },
      {
        id: 3,
        name: "Portfolio.pdf",
        type: "portfolio",
        uploadDate: "2025-03-02T14:30:00Z",
      },
    ],
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "application":
        return "bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "assessment":
        return "bg-perfecthire-200 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "interview":
        return "bg-perfecthire-300 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/candidates">
            <Button variant="outline" size="sm" className="border-perfecthire-300">
              Back to Candidates
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-perfecthire-900">{candidate.name}</h1>
          <Badge variant="outline" className={getStageColor(candidate.stage)}>
            {candidate.stage}
          </Badge>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button variant="outline" className="border-perfecthire-300">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Link href={`/interviews/schedule?candidateId=${candidate.id}`}>
            <Button variant="outline" className="border-perfecthire-300">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </Link>
          <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
            <ChevronRight className="mr-2 h-4 w-4" />
            Advance Stage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidate Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-perfecthire-900">Candidate Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                <AvatarFallback className="text-xl">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-perfecthire-900">{candidate.name}</h3>
              <p className="text-perfecthire-600">{candidate.position}</p>
              <div className="flex items-center mt-2">
                <Badge
                  variant="outline"
                  className="bg-perfecthire-100 text-perfecthire-800 flex items-center gap-1 mr-2"
                >
                  <Star className="h-3 w-3" />
                  {candidate.match}% Match
                </Badge>
                <Badge variant="outline" className="bg-perfecthire-50 text-perfecthire-700">
                  {candidate.source}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-perfecthire-700">
                <Mail className="h-4 w-4 mr-3" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Phone className="h-4 w-4 mr-3" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <MapPin className="h-4 w-4 mr-3" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Linkedin className="h-4 w-4 mr-3" />
                <span>{candidate.linkedin}</span>
              </div>
              <div className="flex items-center text-perfecthire-700">
                <Clock className="h-4 w-4 mr-3" />
                <span>Applied on {new Date(candidate.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h4 className="font-medium mb-3 text-perfecthire-800">Skills & Tags</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-perfecthire-50 text-perfecthire-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-3 text-perfecthire-800">Documents</h4>
              <div className="space-y-2">
                {candidate.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-perfecthire-600" />
                      <span className="text-sm text-perfecthire-800">{doc.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Profile Tab - Experience, Match Details, Timeline */}
            <TabsContent value="profile" className="mt-6 space-y-6">
              {/* Experience Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-perfecthire-200 pl-4 pb-2">
                        <h3 className="font-semibold text-perfecthire-900">{exp.position}</h3>
                        <p className="text-perfecthire-700">{exp.company}</p>
                        <p className="text-sm text-perfecthire-600">{exp.years}</p>
                        <p className="mt-2 text-perfecthire-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Match Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Match Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-perfecthire-800">Overall Match</span>
                      <Badge className="bg-perfecthire-100 text-perfecthire-800 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {candidate.match}% Match
                      </Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3 text-perfecthire-800">Key Matching Factors</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-perfecthire-800">Technical Skills</span>
                            <span className="text-sm text-perfecthire-600">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-perfecthire-800">Experience Relevance</span>
                            <span className="text-sm text-perfecthire-600">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-perfecthire-800">Career Trajectory</span>
                            <span className="text-sm text-perfecthire-600">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-perfecthire-800">Likelihood to Respond</span>
                            <span className="text-sm text-perfecthire-600">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-perfecthire-800">AI Insights</h4>
                      <p className="text-sm text-perfecthire-700 bg-perfecthire-50 p-3 rounded-md">
                        Alex has a strong background in the technologies required for this role. Their career
                        progression shows consistent growth and increasing responsibilities. Based on their profile,
                        they are likely open to new opportunities at this time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Candidate Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative pl-6 border-l-2 border-perfecthire-200">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-perfecthire-300"></div>
                      <div className="mb-1">
                        <span className="text-xs text-perfecthire-600">
                          {new Date(candidate.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium text-perfecthire-900">Application Received</h3>
                      <p className="text-sm text-perfecthire-700">Candidate applied for {candidate.position}</p>
                    </div>

                    {candidate.interviews.map((interview, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-perfecthire-200">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-perfecthire-300"></div>
                        <div className="mb-1">
                          <span className="text-xs text-perfecthire-600">
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-medium text-perfecthire-900">
                          {interview.status === "completed" ? "Interview Completed" : "Interview Scheduled"}
                        </h3>
                        <p className="text-sm text-perfecthire-700">{interview.type}</p>
                      </div>
                    ))}

                    {candidate.notes.map((note, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-perfecthire-200">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-perfecthire-300"></div>
                        <div className="mb-1">
                          <span className="text-xs text-perfecthire-600">
                            {new Date(note.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-medium text-perfecthire-900">Note Added</h3>
                        <p className="text-sm text-perfecthire-700">{note.author} added a note about the candidate</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-perfecthire-200 pl-4 pb-2">
                        <h3 className="font-semibold text-perfecthire-900">{edu.degree}</h3>
                        <p className="text-perfecthire-700">{edu.institution}</p>
                        <p className="text-sm text-perfecthire-600">{edu.years}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-perfecthire-900">Skills Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-perfecthire-800">{skill.name}</span>
                          <span className="text-sm text-perfecthire-600">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interviews Tab */}
            <TabsContent value="interviews" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-perfecthire-900">Interviews</CardTitle>
                    <Link href={`/interviews/schedule?candidateId=${candidate.id}`}>
                      <Button size="sm" className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Schedule Interview
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {candidate.interviews.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.interviews.map((interview) => (
                        <div key={interview.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="font-semibold text-perfecthire-900">{interview.type}</h3>
                              <p className="text-sm text-perfecthire-600">
                                {new Date(interview.date).toLocaleDateString()} at{" "}
                                {new Date(interview.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="text-sm text-perfecthire-700 mt-1">
                                Interviewers: {interview.interviewers.join(", ")}
                              </p>
                            </div>
                            <Badge
                              className={`mt-2 md:mt-0 ${
                                interview.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-perfecthire-100 text-perfecthire-800"
                              }`}
                            >
                              {interview.status}
                            </Badge>
                          </div>
                          {interview.feedback && (
                            <div className="mt-3 p-3 bg-perfecthire-50 rounded-md">
                              <p className="text-sm text-perfecthire-700">{interview.feedback}</p>
                            </div>
                          )}
                          <div className="mt-3 flex justify-end">
                            <Link href={`/interviews/${interview.id}`}>
                              <Button variant="outline" size="sm" className="border-perfecthire-300">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-perfecthire-600">No interviews scheduled yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-perfecthire-900">Notes</CardTitle>
                    <Button size="sm" className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {candidate.notes.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.notes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs">
                                  {note.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-perfecthire-800">{note.author}</span>
                            </div>
                            <span className="text-xs text-perfecthire-600">
                              {new Date(note.date).toLocaleDateString()} at{" "}
                              {new Date(note.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-perfecthire-700">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-perfecthire-600">No notes added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

