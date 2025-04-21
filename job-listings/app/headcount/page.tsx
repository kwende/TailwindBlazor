"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Users,
  DollarSign,
  Calendar,
  PlusCircle,
  Download,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react"
import HeadcountTable from "@/components/headcount-table"
import DepartmentTree from "@/components/department-tree"
import NewPositionModal from "@/components/new-position-modal"

export default function HeadcountPage() {
  const [year, setYear] = useState("2025")
  const [showNewPositionModal, setShowNewPositionModal] = useState(false)

  // Mock data for charts
  const headcountData = [
    { name: "Jan", current: 120, planned: 125 },
    { name: "Feb", current: 125, planned: 130 },
    { name: "Mar", current: 130, planned: 135 },
    { name: "Apr", current: 135, planned: 140 },
    { name: "May", current: 140, planned: 145 },
    { name: "Jun", current: 145, planned: 150 },
    { name: "Jul", current: 150, planned: 155 },
    { name: "Aug", current: 155, planned: 160 },
    { name: "Sep", current: 160, planned: 165 },
    { name: "Oct", current: 165, planned: 170 },
    { name: "Nov", current: 170, planned: 175 },
    { name: "Dec", current: 175, planned: 180 },
  ]

  const departmentData = [
    { name: "Engineering", value: 45, color: "#3b82f6" },
    { name: "Product", value: 20, color: "#10b981" },
    { name: "Marketing", value: 15, color: "#f59e0b" },
    { name: "Sales", value: 25, color: "#8b5cf6" },
    { name: "HR", value: 10, color: "#ec4899" },
    { name: "Finance", value: 10, color: "#6366f1" },
  ]

  const budgetData = [
    { name: "Q1", allocated: 1200000, spent: 1150000 },
    { name: "Q2", allocated: 1300000, spent: 1200000 },
    { name: "Q3", allocated: 1400000, spent: 1250000 },
    { name: "Q4", allocated: 1500000, spent: 1100000 },
  ]

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      requestedBy: "Jamie Smith",
      date: "2025-03-15",
      status: "pending",
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      requestedBy: "Taylor Brown",
      date: "2025-03-10",
      status: "pending",
    },
    {
      id: 3,
      title: "UX Researcher",
      department: "Product",
      requestedBy: "Morgan Lee",
      date: "2025-03-05",
      status: "approved",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-perfecthire-900">Headcount Planning</h1>
          <p className="text-perfecthire-600">Plan, track, and manage your company's workforce</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
            onClick={() => setShowNewPositionModal(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Position
          </Button>

          <Button variant="outline" className="border-perfecthire-300">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Headcount</CardTitle>
            <Users className="h-4 w-4 text-perfecthire-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-perfecthire-900">125</div>
            <p className="text-xs text-perfecthire-500">+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Users className="h-4 w-4 text-perfecthire-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-perfecthire-900">12</div>
            <p className="text-xs text-perfecthire-500">3 in final interview stage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiring Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-perfecthire-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-perfecthire-900">$1.2M</div>
            <p className="text-xs text-perfecthire-500">75% of annual budget used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Calendar className="h-4 w-4 text-perfecthire-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-perfecthire-900">5</div>
            <p className="text-xs text-perfecthire-500">2 awaiting final approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-perfecthire-900">Headcount Forecast</CardTitle>
                <CardDescription className="text-perfecthire-600">
                  Current vs. planned headcount for {year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={headcountData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="planned" name="Planned" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-perfecthire-900">Department Distribution</CardTitle>
                <CardDescription className="text-perfecthire-600">Current headcount by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                          const radius = innerRadius + (outerRadius - innerRadius) * 1.4
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180))
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180))
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#374151"
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              className="text-xs"
                            >
                              {name} ({(percent * 100).toFixed(0)}%)
                            </text>
                          )
                        }}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Hiring Budget Allocation</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Budget allocation and spending by quarter for {year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="allocated" name="Allocated Budget" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spent" name="Spent" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Department Structure</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Organizational structure and headcount by department
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-perfecthire-300">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DepartmentTree />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-perfecthire-900">Headcount Planning</CardTitle>
                  <CardDescription className="text-perfecthire-600">
                    Plan and track headcount changes for {year}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-perfecthire-300">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button
                    className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
                    onClick={() => setShowNewPositionModal(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Position
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <HeadcountTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-perfecthire-900">Position Approvals</CardTitle>
              <CardDescription className="text-perfecthire-600">
                Review and approve new position requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <h3 className="font-medium text-perfecthire-900">{approval.title}</h3>
                        <Badge
                          className={`ml-2 ${
                            approval.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {approval.status === "pending" ? (
                            <Clock className="mr-1 h-3 w-3" />
                          ) : (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {approval.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-perfecthire-600">
                        {approval.department} • Requested by {approval.requestedBy} on{" "}
                        {new Date(approval.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      {approval.status === "pending" ? (
                        <>
                          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                            Reject
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                        </>
                      ) : (
                        <Button variant="outline" className="border-perfecthire-300">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {pendingApprovals.length === 0 && (
                  <div className="text-center py-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-perfecthire-100">
                      <CheckCircle className="h-6 w-6 text-perfecthire-600" />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-perfecthire-900">No pending approvals</h3>
                    <p className="mt-1 text-sm text-perfecthire-500">All position requests have been processed.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Position Modal */}
      {showNewPositionModal && <NewPositionModal onClose={() => setShowNewPositionModal(false)} />}
    </div>
  )
}

