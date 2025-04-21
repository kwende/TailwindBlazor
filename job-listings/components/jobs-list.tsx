import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit } from "lucide-react"
import Link from "next/link"

export default function JobsList() {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 24,
      status: "active",
      postedDate: "2025-03-01",
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Product",
      location: "New York, NY",
      applicants: 18,
      status: "active",
      postedDate: "2025-02-28",
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      applicants: 32,
      status: "active",
      postedDate: "2025-02-20",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-perfecthire-900">Job Listings</h3>
        <Link href="/jobs/create">
          <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium text-perfecthire-900">{job.title}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.applicants}</TableCell>
              <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 text-perfecthire-700" />
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

