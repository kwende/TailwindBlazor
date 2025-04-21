import { jobListings } from "@/data/jobs"
import { notFound } from "next/navigation"
import JobApplicationForm from "@/components/job-application-form"

interface JobApplyPageProps {
  params: {
    id: string
  }
}

export default function JobApplyPage({ params }: JobApplyPageProps) {
  const job = jobListings.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-muted-foreground">
            {job.department} • {job.location} • {job.type}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <p className="mb-4">{job.description}</p>

          <h3 className="font-semibold mt-4 mb-2">Responsibilities:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4 mb-2">Requirements:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {job.salary && (
            <p className="mt-4">
              <span className="font-semibold">Salary Range:</span> {job.salary}
            </p>
          )}
        </div>

        <JobApplicationForm jobId={job.id} jobTitle={job.title} />
      </div>
    </div>
  )
}

