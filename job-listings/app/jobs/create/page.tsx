"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, PlusCircle, RefreshCcw, Search } from "lucide-react"

export default function CreateJobPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState("")

  // Mock function for job description generation
  const generateJobDescription = async () => {
    setIsGenerating(true)
    // In a real app, this would call an AI API
    setTimeout(() => {
      setGeneratedDescription(`## Senior Software Engineer

### About the Role
We are looking for a Senior Software Engineer to join our dynamic engineering team. In this role, you will design, develop, and maintain high-quality software solutions that drive our business forward. You'll collaborate with cross-functional teams to solve complex technical challenges and mentor junior developers.

### Key Responsibilities
- Design and implement scalable, maintainable software solutions
- Collaborate with product managers and designers to define features
- Write clean, efficient, and well-documented code
- Lead code reviews and provide constructive feedback
- Troubleshoot and debug complex software issues
- Mentor junior developers and promote best practices

### Requirements
- 5+ years of professional software development experience
- Strong proficiency in JavaScript/TypeScript and modern frameworks
- Experience with cloud services (AWS, Azure, or GCP)
- Good understanding of data structures, algorithms, and design patterns
- Excellent problem-solving and communication skills
- Bachelor's degree in Computer Science or equivalent experience`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create Job Posting</h1>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="description">Job Description</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="questions">Screening Questions</TabsTrigger>
        </TabsList>

        <Card className="mt-6">
          <TabsContent value="basic">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about the job position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Senior Software Engineer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employment-type">Employment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. New York, NY or Remote" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary-range">Salary Range</Label>
                  <Input id="salary-range" placeholder="e.g. $100,000 - $130,000" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={() => setActiveTab("description")}>Continue</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="description">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Create a detailed job description or use AI to generate one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" onClick={generateJobDescription} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Enter job description or use AI to generate one"
                  rows={15}
                  value={generatedDescription}
                  onChange={(e) => setGeneratedDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("requirements")}>Continue</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="requirements">
            <CardHeader>
              <CardTitle>Job Requirements</CardTitle>
              <CardDescription>Define the qualifications and skills required for this position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Required Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="e.g. 5+ years of professional software development experience"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Textarea id="skills" placeholder="e.g. JavaScript, React, Node.js, AWS" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea
                  id="education"
                  placeholder="e.g. Bachelor's degree in Computer Science or equivalent experience"
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("description")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("questions")}>Continue</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="questions">
            <CardHeader>
              <CardTitle>Screening Questions</CardTitle>
              <CardDescription>Add screening questions to filter candidates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <Label>Question 1</Label>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                  <Input
                    placeholder="Enter your question"
                    className="mb-2"
                    defaultValue="How many years of experience do you have with React?"
                  />
                  <Select defaultValue="dropdown">
                    <SelectTrigger>
                      <SelectValue placeholder="Question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <Label>Question 2</Label>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                  <Input
                    placeholder="Enter your question"
                    className="mb-2"
                    defaultValue="Describe a challenging project you worked on recently."
                  />
                  <Select defaultValue="text">
                    <SelectTrigger>
                      <SelectValue placeholder="Question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("requirements")}>
                Back
              </Button>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Create & Find Candidates
              </Button>
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}

