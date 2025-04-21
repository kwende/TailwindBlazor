"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Filter, Download, PlusCircle, Search, ArrowUpDown, Star } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedSource, setSelectedSource] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Mock data for candidates
  const allCandidates = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Senior Software Engineer",
      email: "alex@example.com",
      stage: "interview",
      match: "95%",
      source: "AI Sourcing",
      location: "San Francisco, CA",
      lastActivity: "2025-03-15T10:30:00Z",
      tags: ["React", "Node.js", "AWS"],
    },
    {
      id: 2,
      name: "Sarah Wilson",
      position: "UX Designer",
      email: "sarah@example.com",
      stage: "application",
      match: "88%",
      source: "LinkedIn",
      location: "New York, NY",
      lastActivity: "2025-03-14T14:45:00Z",
      tags: ["Figma", "UI/UX", "User Research"],
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "Product Manager",
      email: "michael@example.com",
      stage: "assessment",
      match: "92%",
      source: "AI Sourcing",
      location: "Chicago, IL",
      lastActivity: "2025-03-13T09:15:00Z",
      tags: ["Agile", "Product Strategy", "Roadmapping"],
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Senior Software Engineer",
      email: "emily@example.com",
      stage: "offer",
      match: "97%",
      source: "AI Sourcing",
      location: "Austin, TX",
      lastActivity: "2025-03-12T16:20:00Z",
      tags: ["Python", "Machine Learning", "Data Science"],
    },
    {
      id: 5,
      name: "James Miller",
      position: "Frontend Developer",
      email: "james@example.com",
      stage: "interview",
      match: "91%",
      source: "Referral",
      location: "Seattle, WA",
      lastActivity: "2025-03-11T11:10:00Z",
      tags: ["React", "TypeScript", "CSS"],
    },
    {
      id: 6,
      name: "Olivia Garcia",
      position: "DevOps Engineer",
      email: "olivia@example.com",
      stage: "application",
      match: "85%",
      source: "Job Board",
      location: "Denver, CO",
      lastActivity: "2025-03-10T13:25:00Z",
      tags: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      id: 7,
      name: "William Rodriguez",
      position: "Data Analyst",
      email: "william@example.com",
      stage: "assessment",
      match: "89%",
      source: "LinkedIn",
      location: "Boston, MA",
      lastActivity: "2025-03-09T15:40:00Z",
      tags: ["SQL", "Tableau", "Python"],
    },
    {
      id: 8,
      name: "Sophia Martinez",
      position: "Marketing Manager",
      email: "sophia@example.com",
      stage: "interview",
      match: "93%",
      source: "AI Sourcing",
      location: "Los Angeles, CA",
      lastActivity: "2025-03-08T10:05:00Z",
      tags: ["Digital Marketing", "Content Strategy", "SEO"],
    },
    {
      id: 9,
      name: "Benjamin Lee",
      position: "Backend Developer",
      email: "benjamin@example.com",
      stage: "application",
      match: "87%",
      source: "Job Board",
      location: "Portland, OR",
      lastActivity: "2025-03-07T09:30:00Z",
      tags: ["Java", "Spring Boot", "Microservices"],
    },
    {
      id: 10,
      name: "Ava Thompson",
      position: "UI Designer",
      email: "ava@example.com",
      stage: "offer",
      match: "96%",
      source: "Referral",
      location: "Miami, FL",
      lastActivity: "2025-03-06T14:15:00Z",
      tags: ["Adobe XD", "Sketch", "UI Design"],
    },
    {
      id: 11,
      name: "Ethan Clark",
      position: "Full Stack Developer",
      email: "ethan@example.com",
      stage: "assessment",
      match: "90%",
      source: "AI Sourcing",
      location: "Atlanta, GA",
      lastActivity: "2025-03-05T11:45:00Z",
      tags: ["JavaScript", "React", "Node.js"],
    },
    {
      id: 12,
      name: "Isabella Walker",
      position: "Product Designer",
      email: "isabella@example.com",
      stage: "interview",
      match: "94%",
      source: "LinkedIn",
      location: "San Diego, CA",
      lastActivity: "2025-03-04T16:50:00Z",
      tags: ["Product Design", "Wireframing", "Prototyping"],
    },
  ]

  // Filter candidates based on search query and filters
  const filteredCandidates = allCandidates.filter((candidate) => {
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStage = selectedStage === "all" || candidate.stage === selectedStage
    const matchesSource = selectedSource === "all" || candidate.source === selectedSource

    return matchesSearch && matchesStage && matchesSource
  })

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    let comparison = 0
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "position") {
      comparison = a.position.localeCompare(b.position)
    } else if (sortField === "match") {
      comparison = Number.parseInt(a.match) - Number.parseInt(b.match)
    } else if (sortField === "lastActivity") {
      comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
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
        <div>
          <h1 className="text-3xl font-bold text-perfecthire-900">Candidates</h1>
          <p className="text-perfecthire-600">Manage and track all candidates in your pipeline</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link href="/candidates/search">
            <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </Link>
          <Button variant="outline" className="border-perfecthire-300">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedStage("all")}>
            All Candidates
          </TabsTrigger>
          <TabsTrigger value="application" onClick={() => setSelectedStage("application")}>
            Application
          </TabsTrigger>
          <TabsTrigger value="assessment" onClick={() => setSelectedStage("assessment")}>
            Assessment
          </TabsTrigger>
          <TabsTrigger value="interview" onClick={() => setSelectedStage("interview")}>
            Interview
          </TabsTrigger>
          <TabsTrigger value="offer" onClick={() => setSelectedStage("offer")}>
            Offer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">All Candidates</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredCandidates.length} candidates found
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-perfecthire-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedSource("all")}>All Sources</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("AI Sourcing")}>AI Sourcing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("LinkedIn")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Referral")}>Referral</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Job Board")}>Job Board</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                          Position
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("match")}>
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          Last Activity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-perfecthire-900">{candidate.name}</p>
                              <p className="text-sm text-perfecthire-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100 flex items-center gap-1"
                          >
                            <Star className="h-3 w-3" />
                            {candidate.match}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStageColor(candidate.stage)}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidate.lastActivity).toLocaleDateString()} at{" "}
                          {new Date(candidate.lastActivity).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 text-perfecthire-700" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No candidates found matching your criteria.</p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredCandidates.length} of {allCandidates.length} candidates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Application Stage</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredCandidates.length} candidates found
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-perfecthire-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedSource("all")}>All Sources</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("AI Sourcing")}>AI Sourcing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("LinkedIn")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Referral")}>Referral</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Job Board")}>Job Board</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                          Position
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("match")}>
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          Last Activity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-perfecthire-900">{candidate.name}</p>
                              <p className="text-sm text-perfecthire-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100 flex items-center gap-1"
                          >
                            <Star className="h-3 w-3" />
                            {candidate.match}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStageColor(candidate.stage)}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidate.lastActivity).toLocaleDateString()} at{" "}
                          {new Date(candidate.lastActivity).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 text-perfecthire-700" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No candidates found matching your criteria.</p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredCandidates.length} of {allCandidates.length} candidates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Assessment Stage</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredCandidates.length} candidates found
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-perfecthire-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedSource("all")}>All Sources</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("AI Sourcing")}>AI Sourcing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("LinkedIn")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Referral")}>Referral</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Job Board")}>Job Board</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                          Position
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("match")}>
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          Last Activity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-perfecthire-900">{candidate.name}</p>
                              <p className="text-sm text-perfecthire-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100 flex items-center gap-1"
                          >
                            <Star className="h-3 w-3" />
                            {candidate.match}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStageColor(candidate.stage)}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidate.lastActivity).toLocaleDateString()} at{" "}
                          {new Date(candidate.lastActivity).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 text-perfecthire-700" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No candidates found matching your criteria.</p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredCandidates.length} of {allCandidates.length} candidates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Interview Stage</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredCandidates.length} candidates found
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-perfecthire-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedSource("all")}>All Sources</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("AI Sourcing")}>AI Sourcing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("LinkedIn")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Referral")}>Referral</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Job Board")}>Job Board</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                          Position
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("match")}>
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          Last Activity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-perfecthire-900">{candidate.name}</p>
                              <p className="text-sm text-perfecthire-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100 flex items-center gap-1"
                          >
                            <Star className="h-3 w-3" />
                            {candidate.match}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStageColor(candidate.stage)}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidate.lastActivity).toLocaleDateString()} at{" "}
                          {new Date(candidate.lastActivity).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 text-perfecthire-700" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No candidates found matching your criteria.</p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredCandidates.length} of {allCandidates.length} candidates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="offer" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Offer Stage</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredCandidates.length} candidates found
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-perfecthire-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedSource("all")}>All Sources</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("AI Sourcing")}>AI Sourcing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("LinkedIn")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Referral")}>Referral</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSource("Job Board")}>Job Board</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Candidate
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("position")}>
                          Position
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("match")}>
                          Match
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastActivity")}>
                          Last Activity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-perfecthire-900">{candidate.name}</p>
                              <p className="text-sm text-perfecthire-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.location}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100 flex items-center gap-1"
                          >
                            <Star className="h-3 w-3" />
                            {candidate.match}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStageColor(candidate.stage)}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(candidate.lastActivity).toLocaleDateString()} at{" "}
                          {new Date(candidate.lastActivity).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 text-perfecthire-700" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No candidates found matching your criteria.</p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredCandidates.length} of {allCandidates.length} candidates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

