"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, User, LinkedinIcon, Filter } from "lucide-react"

export default function CandidateSearchPage() {
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Mock function to simulate AI-powered candidate search
  const searchCandidates = () => {
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-perfecthire-900">Find Candidates</h1>

      <Tabs defaultValue="ai">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="ai">AI Sourcing</TabsTrigger>
          <TabsTrigger value="manual">Manual Search</TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">AI-Powered Candidate Sourcing</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Let our AI find and rank the best candidates based on your job requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-selection" className="text-perfecthire-800">
                  Select Job
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job posting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job1">Senior Software Engineer</SelectItem>
                    <SelectItem value="job2">UX Designer</SelectItem>
                    <SelectItem value="job3">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  className="w-full bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
                  onClick={searchCandidates}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Find Candidates
                    </>
                  )}
                </Button>
              </div>

              {hasSearched && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-perfecthire-900">Top Candidates</h3>
                    <Button variant="outline" size="sm" className="border-perfecthire-300 text-perfecthire-800">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "Jordan Casey",
                        title: "Senior Software Engineer at Tech Corp",
                        match: "98%",
                        skills: ["React", "TypeScript", "AWS", "Node.js"],
                        experience: "8 years",
                      },
                      {
                        id: 2,
                        name: "Taylor Morgan",
                        title: "Full Stack Developer at Innovation Inc",
                        match: "95%",
                        skills: ["JavaScript", "React", "Python", "Docker"],
                        experience: "6 years",
                      },
                      {
                        id: 3,
                        name: "Alex Rivera",
                        title: "Frontend Lead at StartupXYZ",
                        match: "92%",
                        skills: ["React", "Vue.js", "CSS", "UI/UX"],
                        experience: "7 years",
                      },
                    ].map((candidate) => (
                      <Card key={candidate.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={`/placeholder.svg?height=50&width=50`} />
                                <AvatarFallback>
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-lg font-semibold text-perfecthire-900">{candidate.name}</h4>
                                <p className="text-sm text-perfecthire-600">{candidate.title}</p>
                                <div className="flex mt-2 flex-wrap gap-1">
                                  {candidate.skills.map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="secondary"
                                      className="bg-perfecthire-100 text-perfecthire-800 mr-1"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100">
                                {candidate.match} Match
                              </Badge>
                              <p className="text-sm mt-1 text-perfecthire-600">{candidate.experience} exp</p>
                              <div className="flex gap-2 mt-2 justify-end">
                                <Button size="sm" variant="outline" className="border-perfecthire-300">
                                  <LinkedinIcon className="h-4 w-4 text-perfecthire-800" />
                                </Button>
                                <Button size="sm" variant="outline" className="border-perfecthire-300">
                                  <User className="h-4 w-4 text-perfecthire-800" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                              Contact Candidate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Manual Candidate Search</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Search for candidates using specific criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-perfecthire-800">
                  Keywords
                </Label>
                <Input id="keywords" placeholder="e.g. React, JavaScript, Full Stack" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-perfecthire-800">
                    Location
                  </Label>
                  <Input id="location" placeholder="e.g. New York, Remote" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-perfecthire-800">
                    Experience
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (6+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

