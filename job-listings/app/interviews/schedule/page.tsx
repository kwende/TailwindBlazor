"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, RefreshCcw, Plus, Video, Users, Phone } from "lucide-react"
import { format } from "date-fns"

export default function ScheduleInterviewPage() {
  const [date, setDate] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState("")

  // Mock function for interview questions generation
  const generateQuestions = async () => {
    setIsGenerating(true)
    // In a real app, this would call an AI API
    setTimeout(() => {
      setGeneratedQuestions(`# Technical Skills Assessment

1. Can you describe your experience with modern JavaScript frameworks, particularly React?
2. How do you approach performance optimization in web applications?
3. Describe a complex technical problem you've solved recently and your approach to solving it.
4. How do you stay updated with the latest technologies and best practices?

# Problem-Solving

1. How would you design a system that needs to handle millions of concurrent users?
2. Describe your approach to debugging a production issue.
3. Tell me about a time when you had to make a technical decision with incomplete information.

# Team Collaboration

1. How do you approach code reviews?
2. Describe a situation where you had a disagreement with a team member about a technical approach. How did you resolve it?
3. How do you onboard new team members to your codebase?`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Schedule Interview</h1>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Interview Details</TabsTrigger>
          <TabsTrigger value="questions">Interview Questions</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Invite</TabsTrigger>
        </TabsList>

        <Card className="mt-6">
          <TabsContent value="details">
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>Set up the basic details for this interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate1">Alex Johnson</SelectItem>
                    <SelectItem value="candidate2">Sarah Wilson</SelectItem>
                    <SelectItem value="candidate3">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job1">Senior Software Engineer</SelectItem>
                    <SelectItem value="job2">UX Designer</SelectItem>
                    <SelectItem value="job3">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interviewers">Interviewers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interviewer1">Jamie Smith</SelectItem>
                    <SelectItem value="interviewer2">Taylor Brown</SelectItem>
                    <SelectItem value="interviewer3">Morgan Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Interview Type</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 justify-start">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </Button>
                    <Button variant="outline" className="flex-1 justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone
                    </Button>
                    <Button variant="outline" className="flex-1 justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Panel
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Interview Date</Label>
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Continue to Questions</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="questions">
            <CardHeader>
              <CardTitle>Interview Questions</CardTitle>
              <CardDescription>Create or generate questions based on the job and candidate profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" onClick={generateQuestions} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Generate Questions
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="questions">Interview Questions</Label>
                <Textarea
                  id="questions"
                  placeholder="Enter or generate interview questions"
                  rows={15}
                  value={generatedQuestions}
                  onChange={(e) => setGeneratedQuestions(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>Continue to Schedule</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="schedule">
            <CardHeader>
              <CardTitle>Schedule & Send Invites</CardTitle>
              <CardDescription>Choose available times and send calendar invites</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Calendar Integration</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Google Calendar
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-700"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Outlook Calendar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map((time) => (
                    <Button key={time} variant="outline" className="justify-start">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message to Candidate</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to the calendar invite"
                  rows={4}
                  defaultValue="We're excited to learn more about your experience and discuss how you might fit with our team. Please prepare to discuss your background and experience related to the role."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>Send Interview Invitation</Button>
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}

