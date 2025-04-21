import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Calendar, CheckCircle } from "lucide-react"

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-perfecthire-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-perfecthire-900">12</div>
          <p className="text-xs text-perfecthire-500">+2 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
          <Users className="h-4 w-4 text-perfecthire-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-perfecthire-900">124</div>
          <p className="text-xs text-perfecthire-500">+18 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled Interviews</CardTitle>
          <Calendar className="h-4 w-4 text-perfecthire-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-perfecthire-900">24</div>
          <p className="text-xs text-perfecthire-500">+5 from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offers Accepted</CardTitle>
          <CheckCircle className="h-4 w-4 text-perfecthire-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-perfecthire-900">8</div>
          <p className="text-xs text-perfecthire-500">+3 from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

