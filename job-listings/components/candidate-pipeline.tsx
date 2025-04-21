"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone, Calendar, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

type CandidateStage = "applied" | "screening" | "interview" | "offer" | "rejected"

interface Candidate {
  id: number
  name: string
  email: string
  position: string
  stage: CandidateStage
  match: string
  appliedDate: string
  source: string
  resume?: string
  notes?: string
}

interface CandidatePipelineProps {
  jobId: string
}

interface CandidateCardProps {
  candidate: Candidate
  onDragStart: (e: React.DragEvent, candidate: Candidate) => void
}

export function CandidatePipeline({ jobId }: CandidatePipelineProps) {
  // In a real app, you would fetch this data from an API based on the jobId
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      position: "Senior Software Engineer",
      stage: "applied",
      match: "95%",
      appliedDate: "2025-03-15",
      source: "AI Sourcing",
      notes: "Strong background in React and Node.js",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      position: "Senior Software Engineer",
      stage: "screening",
      match: "88%",
      appliedDate: "2025-03-14",
      source: "LinkedIn",
      notes: "Good portfolio, needs technical assessment",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      position: "Senior Software Engineer",
      stage: "interview",
      match: "92%",
      appliedDate: "2025-03-10",
      source: "AI Sourcing",
      notes: "First interview scheduled for next week",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      position: "Senior Software Engineer",
      stage: "offer",
      match: "97%",
      appliedDate: "2025-03-05",
      source: "AI Sourcing",
      notes: "Offer letter sent, waiting for response",
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james@example.com",
      position: "Senior Software Engineer",
      stage: "rejected",
      match: "75%",
      appliedDate: "2025-03-08",
      source: "Indeed",
      notes: "Not enough experience with required technologies",
    },
    {
      id: 6,
      name: "Olivia Martinez",
      email: "olivia@example.com",
      position: "Senior Software Engineer",
      stage: "applied",
      match: "85%",
      appliedDate: "2025-03-16",
      source: "Referral",
      notes: "Referred by current employee",
    },
    {
      id: 7,
      name: "Daniel Lee",
      email: "daniel@example.com",
      position: "Senior Software Engineer",
      stage: "screening",
      match: "90%",
      appliedDate: "2025-03-13",
      source: "AI Sourcing",
      notes: "Technical assessment sent",
    },
    {
      id: 8,
      name: "Sophia Garcia",
      email: "sophia@example.com",
      position: "Senior Software Engineer",
      stage: "interview",
      match: "93%",
      appliedDate: "2025-03-09",
      source: "LinkedIn",
      notes: "Second interview scheduled",
    },
  ])

  const draggedCandidate = useRef<Candidate | null>(null)

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  const getStageTitle = (stage: CandidateStage): string => {
    switch (stage) {
      case "applied":
        return "Applied"
      case "screening":
        return "Screening"
      case "interview":
        return "Interview"
      case "offer":
        return "Offer"
      case "rejected":
        return "Rejected"
      default:
        return stage
    }
  }

  const getStageIcon = (stage: CandidateStage) => {
    switch (stage) {
      case "applied":
        return <Clock className="h-4 w-4" />
      case "screening":
        return <Clock className="h-4 w-4" />
      case "interview":
        return <Calendar className="h-4 w-4" />
      case "offer":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStageColor = (stage: CandidateStage): string => {
    switch (stage) {
      case "applied":
        return "bg-perfecthire-100 text-perfecthire-800"
      case "screening":
        return "bg-perfecthire-200 text-perfecthire-800"
      case "interview":
        return "bg-perfecthire-300 text-perfecthire-800"
      case "offer":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stages: CandidateStage[] = ["applied", "screening", "interview", "offer", "rejected"]

  const candidatesByStage = stages.reduce(
    (acc, stage) => {
      acc[stage] = candidates.filter((c) => c.stage === stage)
      return acc
    },
    {} as Record<CandidateStage, Candidate[]>,
  )

  const handleDragStart = (e: React.DragEvent, candidate: Candidate) => {
    draggedCandidate.current = candidate
    e.dataTransfer.setData("text/plain", candidate.id.toString())
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetStage: CandidateStage) => {
    e.preventDefault()

    if (!draggedCandidate.current) return

    const candidateId = Number.parseInt(e.dataTransfer.getData("text/plain"))
    const candidate = candidates.find((c) => c.id === candidateId)

    if (candidate && candidate.stage !== targetStage) {
      // Update the candidate's stage
      const updatedCandidates = candidates.map((c) => (c.id === candidateId ? { ...c, stage: targetStage } : c))

      setCandidates(updatedCandidates)

      // Show a toast notification
      toast({
        title: "Candidate moved",
        description: `${candidate.name} moved to ${getStageTitle(targetStage)}`,
      })
    }

    draggedCandidate.current = null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-perfecthire-900">Candidate Pipeline</h2>
        <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Add Candidate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <Card
            key={stage}
            className="overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <CardHeader className={`py-3 ${getStageColor(stage)}`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium flex items-center gap-1">
                  {getStageIcon(stage)}
                  {getStageTitle(stage)}
                </CardTitle>
                <Badge variant="outline" className="bg-white text-perfecthire-800">
                  {candidatesByStage[stage]?.length || 0}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 min-h-[400px]">
              <div className="space-y-3">
                {candidatesByStage[stage]?.length === 0 ? (
                  <p className="text-sm text-perfecthire-600 text-center py-4">No candidates</p>
                ) : (
                  candidatesByStage[stage]?.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} onDragStart={handleDragStart} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CandidateCard({ candidate, onDragStart }: CandidateCardProps) {
  return (
    <Card
      className="overflow-hidden border border-gray-200 hover:border-perfecthire-300 transition-colors cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, candidate)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={candidate.name} />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/candidates/${candidate.id}`}>
                <h3 className="font-medium text-perfecthire-900 hover:text-perfecthire-700 transition-colors">
                  {candidate.name}
                </h3>
              </Link>
              <p className="text-xs text-perfecthire-600">{candidate.email}</p>
              <div className="flex items-center mt-1">
                <Badge
                  variant="outline"
                  className="text-xs bg-perfecthire-50 text-perfecthire-800 border-perfecthire-200"
                >
                  {candidate.match}
                </Badge>
                <span className="text-xs text-perfecthire-500 ml-2">
                  Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/candidates/${candidate.id}`}>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Move to Next Stage
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Reject Candidate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {candidate.notes && (
          <div className="mt-2 text-xs text-perfecthire-700 bg-gray-50 p-2 rounded">
            <p>{candidate.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

