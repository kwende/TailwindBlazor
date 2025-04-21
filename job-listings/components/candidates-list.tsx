import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function CandidatesList() {
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Senior Software Engineer",
      email: "alex@example.com",
      stage: "interview",
      match: "95%",
      source: "AI Sourcing",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      position: "UX Designer",
      email: "sarah@example.com",
      stage: "application",
      match: "88%",
      source: "LinkedIn",
    },
    {
      id: 3,
      name: "Michael Brown",
      position: "Product Manager",
      email: "michael@example.com",
      stage: "assessment",
      match: "92%",
      source: "AI Sourcing",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Senior Software Engineer",
      email: "emily@example.com",
      stage: "offer",
      match: "97%",
      source: "AI Sourcing",
    },
  ]

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "application":
        return "bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "assessment":
        return "bg-perfecthire-200 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "interview":
        return "bg-perfecthire-300 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      case "offer":
        return "bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-perfecthire-900">Candidates</h3>
        <Link href="/candidates/search">
          <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">Find Candidates</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
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
              <TableCell>{candidate.source}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
                >
                  {candidate.match}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStageColor(candidate.stage)}>
                  {candidate.stage}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/candidates/${candidate.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 text-perfecthire-700" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

