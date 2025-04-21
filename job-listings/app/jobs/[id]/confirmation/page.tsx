import Link from "next/link"
import { jobListings, getSimilarJobs } from "@/data/jobs"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface ConfirmationPageProps {
  params: {
    id: string
  }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const job = jobListings.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  const similarJobs = getSimilarJobs(params.id, 3)

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-10">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for applying to the {job.title} position at our company. We've received your application and
              will review it shortly.
            </p>
            <p className="text-sm mb-6">
              You should receive a confirmation email at the address you provided. If you don't see it, please check
              your spam folder.
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <Button>Browse More Jobs</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {similarJobs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">You might also be interested in these roles:</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarJobs.map((job) => (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.department}</CardDescription>
                      </div>
                      <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1 h-4 w-4"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {job.location}
                    </div>
                    <p className="text-sm line-clamp-2">{job.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/jobs/${job.id}/apply`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Apply Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

