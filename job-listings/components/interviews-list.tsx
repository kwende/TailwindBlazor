import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video, Phone, Users, Eye, PlusCircle, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function InterviewsList() {
  const interviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Software Engineer",
      date: "2025-03-20T10:00:00Z",
      type: "video",
      interviewers: ["Jamie Smith", "Taylor Brown"],
      status: "completed",
      feedbackStatus: "pending",
    },
    {
      id: 2,
      candidate: "Sarah Wilson",
      position: "UX Designer",
      date: "2025-03-19T14:30:00Z",
      type: "panel",
      interviewers: ["Morgan Lee", "Casey Jones", "Riley Green"],
      status: "scheduled",
      feedbackStatus: null,
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "Product Manager",
      date: "2025-03-18T11:00:00Z",
      type: "phone",
      interviewers: ["Jamie Smith"],
      status: "completed",
      feedbackStatus: "provided",
    },
  ]

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 mr-1" />
      case "phone":
        return <Phone className="h-4 w-4 mr-1" />
      case "panel":
        return <Users className="h-4 w-4 mr-1" />
      default:
        return <Calendar className="h-4 w-4 mr-1" />
    }
  }

  const getFeedbackStatusIcon = (status: string | null) => {
    if (!status) return null

    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
      case "provided":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-perfecthire-900">Upcoming Interviews</h3>
        <Link href="/interviews/schedule">
          <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Interviewers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell className="font-medium text-perfecthire-900">{interview.candidate}</TableCell>
              <TableCell>{interview.position}</TableCell>
              <TableCell>
                {new Date(interview.date).toLocaleDateString()} at{" "}
                {new Date(interview.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getInterviewTypeIcon(interview.type)}
                  {interview.type}
                </div>
              </TableCell>
              <TableCell>{interview.interviewers.join(", ")}</TableCell>
              <TableCell>
                <Badge
                  variant={interview.status === "scheduled" ? "outline" : "secondary"}
                  className={
                    interview.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-perfecthire-100 text-perfecthire-800"
                  }
                >
                  {interview.status}
                </Badge>
              </TableCell>
              <TableCell>
                {interview.status === "completed" &&
                  (interview.feedbackStatus === "pending" ? (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center w-fit">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Required
                    </Badge>
                  ) : interview.feedbackStatus === "provided" ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center w-fit">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Provided
                    </Badge>
                  ) : null)}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/interviews/${interview.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 text-perfecthire-700" />
                    </Button>
                  </Link>

                  {interview.status === "completed" && interview.feedbackStatus === "pending" && (
                    <Link href={`/interviews/${interview.id}/feedback`}>
                      <Button size="sm" className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                        Feedback
                      </Button>
                    </Link>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

