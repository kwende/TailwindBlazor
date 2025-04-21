import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"

export default function JobsLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Button className="bg-[#0B8474] hover:bg-[#086b5d]">
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Job</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all" disabled>
              All Jobs
            </TabsTrigger>
            <TabsTrigger value="published" disabled>
              Published
            </TabsTrigger>
            <TabsTrigger value="draft" disabled>
              Draft
            </TabsTrigger>
            <TabsTrigger value="archived" disabled>
              Archived
            </TabsTrigger>
            <TabsTrigger value="pending" disabled>
              Pending Approval
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search jobs..." className="w-full sm:w-[250px] pl-8" disabled />
            </div>
            <Button variant="outline" size="sm" disabled>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-12 w-full text-sm text-muted-foreground">
                  <div className="col-span-4">Job Title</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Applicants</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-0">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="grid grid-cols-12 w-full py-4 border-t items-center">
                    <div className="col-span-4">
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="col-span-2">
                      <Skeleton className="h-5 w-4/5" />
                    </div>
                    <div className="col-span-2">
                      <Skeleton className="h-5 w-4/5" />
                    </div>
                    <div className="col-span-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="col-span-1">
                      <Skeleton className="h-5 w-8" />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

