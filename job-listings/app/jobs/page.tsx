"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Edit,
  Download,
  PlusCircle,
  Search,
  ArrowUpDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Globe,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam === "pending" ? "pending" : "published")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortField, setSortField] = useState("title")
  const [sortDirection, setSortDirection] = useState("asc")

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set("tab", activeTab)
    router.push(`/jobs?${params.toString()}`, { scroll: false })
  }, [activeTab, router, searchParams])

  // Mock data for published jobs
  const publishedJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 24,
      status: "active",
      postedDate: "2025-03-01",
      closingDate: "2025-04-01",
      hiringManager: "Jamie Smith",
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Product",
      location: "New York, NY",
      applicants: 18,
      status: "active",
      postedDate: "2025-02-28",
      closingDate: "2025-03-28",
      hiringManager: "Taylor Brown",
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      applicants: 32,
      status: "active",
      postedDate: "2025-02-20",
      closingDate: "2025-03-20",
      hiringManager: "Morgan Lee",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 15,
      status: "active",
      postedDate: "2025-02-15",
      closingDate: "2025-03-15",
      hiringManager: "Jamie Smith",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      applicants: 22,
      status: "active",
      postedDate: "2025-02-10",
      closingDate: "2025-03-10",
      hiringManager: "Casey Jones",
    },
    {
      id: 6,
      title: "Sales Representative",
      department: "Sales",
      location: "Boston, MA",
      applicants: 12,
      status: "closing soon",
      postedDate: "2025-01-25",
      closingDate: "2025-03-05",
      hiringManager: "Riley Green",
    },
    {
      id: 7,
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Austin, TX",
      applicants: 8,
      status: "closing soon",
      postedDate: "2025-01-20",
      closingDate: "2025-03-03",
      hiringManager: "Jordan Casey",
    },
  ]

  // Mock data for pending approval jobs
  const pendingJobs = [
    {
      id: 101,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      status: "pending",
      requestedBy: "Jamie Smith",
      requestDate: "2025-03-10",
      approver: "Alex Director",
      notes: "Need to fill this position ASAP due to team expansion.",
    },
    {
      id: 102,
      title: "Data Analyst",
      department: "Data Science",
      location: "Seattle, WA",
      status: "pending",
      requestedBy: "Taylor Brown",
      requestDate: "2025-03-08",
      approver: "Morgan Director",
      notes: "New position for the data team to support growth initiatives.",
    },
    {
      id: 103,
      title: "Content Writer",
      department: "Marketing",
      location: "Chicago, IL",
      status: "pending",
      requestedBy: "Casey Jones",
      requestDate: "2025-03-05",
      approver: "Jordan Director",
      notes: "Need additional content support for Q2 campaigns.",
    },
    {
      id: 104,
      title: "HR Coordinator",
      department: "Human Resources",
      location: "New York, NY",
      status: "pending",
      requestedBy: "Riley Green",
      requestDate: "2025-03-03",
      approver: "Alex Director",
      notes: "Supporting role for the growing HR team.",
    },
    {
      id: 105,
      title: "Backend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      status: "pending",
      requestedBy: "Jamie Smith",
      requestDate: "2025-03-01",
      approver: "Morgan Director",
      notes: "Critical hire for the API team.",
    },
  ]

  // Filter published jobs based on search query and filters
  const filteredPublishedJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.hiringManager.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation

    return matchesSearch && matchesDepartment && matchesLocation
  })

  // Filter pending jobs based on search query and filters
  const filteredPendingJobs = pendingJobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.approver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation

    return matchesSearch && matchesDepartment && matchesLocation
  })

  // Sort jobs
  const sortJobs = (jobs) => {
    try {
      return [...jobs].sort((a, b) => {
        let comparison = 0
        if (sortField === "title") {
          comparison = a.title.localeCompare(b.title)
        } else if (sortField === "department") {
          comparison = a.department.localeCompare(b.department)
        } else if (sortField === "location") {
          comparison = a.location.localeCompare(b.location)
        } else if (sortField === "postedDate" && a.postedDate && b.postedDate) {
          comparison = new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        } else if (sortField === "requestDate" && a.requestDate && b.requestDate) {
          comparison = new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        }

        return sortDirection === "asc" ? comparison : -comparison
      })
    } catch (error) {
      console.error("Error sorting jobs:", error)
      return jobs // Return unsorted jobs if there's an error
    }
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString // Return the original string if there's an error
    }
  }

  const sortedPublishedJobs = sortJobs(filteredPublishedJobs)
  const sortedPendingJobs = sortJobs(filteredPendingJobs)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "closing soon":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            <Clock className="mr-1 h-3 w-3" />
            Closing Soon
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-perfecthire-100 text-perfecthire-800 dark:bg-perfecthire-900 dark:text-perfecthire-100"
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending Approval
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            {status}
          </Badge>
        )
    }
  }

  // Get unique departments for filter
  const departments = [...new Set([...publishedJobs, ...pendingJobs].map((job) => job.department))]

  // Get unique locations for filter
  const locations = [...new Set([...publishedJobs, ...pendingJobs].map((job) => job.location))]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-perfecthire-900">Jobs</h1>
          <p className="text-perfecthire-600">Manage and track all job postings</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link href="/jobs/create">
            <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </Link>
          <Button variant="outline" className="border-perfecthire-300">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-perfecthire-500" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8 w-full bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="published" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Published Jobs
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Pending Approval
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Published Jobs</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredPublishedJobs.length} active job postings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                          Job Title
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("department")}>
                          Department
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("location")}>
                          Location
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          Applicants
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("postedDate")}>
                          Posted Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Closing Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPublishedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium text-perfecthire-900">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="hover:text-perfecthire-700 hover:underline transition-colors"
                          >
                            {job.title}
                          </Link>
                        </TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell>{formatDate(job.postedDate)}</TableCell>
                        <TableCell>{formatDate(job.closingDate)}</TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4 text-perfecthire-700" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={`/jobs/${job.id}`}>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Job
                                  </DropdownMenuItem>
                                </Link>
                                <Link href={`/jobs/${job.id}/edit`}>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Job
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                  <Globe className="mr-2 h-4 w-4" />
                                  View Public Listing
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Close Job
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPublishedJobs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No published jobs found matching your criteria.</p>
                </div>
              )}

              {filteredPublishedJobs.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredPublishedJobs.length} of {publishedJobs.length} jobs
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

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-perfecthire-900">Jobs Pending Approval</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    {filteredPendingJobs.length} jobs awaiting manager approval
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                          Job Title
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("department")}>
                          Department
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("location")}>
                          Location
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("requestDate")}>
                          Request Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Approver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPendingJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium text-perfecthire-900">{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.requestedBy}</TableCell>
                        <TableCell>{formatDate(job.requestDate)}</TableCell>
                        <TableCell>{job.approver}</TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/jobs/${job.id}/review`}>
                              <Button variant="outline" size="sm" className="border-perfecthire-300">
                                <Eye className="mr-2 h-4 w-4" />
                                Review
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4 text-perfecthire-700" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <Link href={`/jobs/${job.id}/edit`}>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Before Approval
                                  </DropdownMenuItem>
                                </Link>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPendingJobs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-perfecthire-600">No pending jobs found matching your criteria.</p>
                </div>
              )}

              {filteredPendingJobs.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-perfecthire-600">
                    Showing {filteredPendingJobs.length} of {pendingJobs.length} pending jobs
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

