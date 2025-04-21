"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Users, UserPlus, PlusCircle } from "lucide-react"

export default function DepartmentTree() {
  // Mock data for department structure
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Engineering",
      headcount: 45,
      open: true,
      teams: [
        {
          id: 11,
          name: "Frontend",
          headcount: 15,
          open: false,
          roles: [
            { id: 111, title: "Senior Frontend Engineer", count: 5 },
            { id: 112, title: "Frontend Engineer", count: 8 },
            { id: 113, title: "UI Developer", count: 2 },
          ],
        },
        {
          id: 12,
          name: "Backend",
          headcount: 18,
          open: false,
          roles: [
            { id: 121, title: "Senior Backend Engineer", count: 6 },
            { id: 122, title: "Backend Engineer", count: 10 },
            { id: 123, title: "Database Administrator", count: 2 },
          ],
        },
        {
          id: 13,
          name: "DevOps",
          headcount: 12,
          open: false,
          roles: [
            { id: 131, title: "DevOps Engineer", count: 7 },
            { id: 132, title: "Site Reliability Engineer", count: 5 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Product",
      headcount: 20,
      open: false,
      teams: [
        {
          id: 21,
          name: "Product Management",
          headcount: 8,
          open: false,
          roles: [
            { id: 211, title: "Senior Product Manager", count: 3 },
            { id: 212, title: "Product Manager", count: 5 },
          ],
        },
        {
          id: 22,
          name: "Design",
          headcount: 12,
          open: false,
          roles: [
            { id: 221, title: "UX Designer", count: 6 },
            { id: 222, title: "UI Designer", count: 4 },
            { id: 223, title: "Product Designer", count: 2 },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Marketing",
      headcount: 15,
      open: false,
      teams: [
        {
          id: 31,
          name: "Digital Marketing",
          headcount: 8,
          open: false,
          roles: [
            { id: 311, title: "SEO Specialist", count: 2 },
            { id: 312, title: "Content Marketer", count: 3 },
            { id: 313, title: "Social Media Manager", count: 3 },
          ],
        },
        {
          id: 32,
          name: "Brand",
          headcount: 7,
          open: false,
          roles: [
            { id: 321, title: "Brand Manager", count: 2 },
            { id: 322, title: "Graphic Designer", count: 3 },
            { id: 323, title: "Event Coordinator", count: 2 },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Sales",
      headcount: 25,
      open: false,
      teams: [
        {
          id: 41,
          name: "Sales Development",
          headcount: 10,
          open: false,
          roles: [{ id: 411, title: "Sales Development Representative", count: 10 }],
        },
        {
          id: 42,
          name: "Account Executives",
          headcount: 15,
          open: false,
          roles: [
            { id: 421, title: "Senior Account Executive", count: 5 },
            { id: 422, title: "Account Executive", count: 10 },
          ],
        },
      ],
    },
  ])

  const toggleDepartment = (deptId) => {
    setDepartments(departments.map((dept) => (dept.id === deptId ? { ...dept, open: !dept.open } : dept)))
  }

  const toggleTeam = (deptId, teamId) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === deptId
          ? {
              ...dept,
              teams: dept.teams.map((team) => (team.id === teamId ? { ...team, open: !team.open } : team)),
            }
          : dept,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div key={dept.id} className="border rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-perfecthire-50 hover:bg-perfecthire-100"
            onClick={() => toggleDepartment(dept.id)}
          >
            <div className="flex items-center">
              {dept.open ? (
                <ChevronDown className="h-5 w-5 text-perfecthire-700 mr-2" />
              ) : (
                <ChevronRight className="h-5 w-5 text-perfecthire-700 mr-2" />
              )}
              <Users className="h-5 w-5 text-perfecthire-700 mr-2" />
              <h3 className="font-medium text-perfecthire-900">{dept.name}</h3>
              <Badge className="ml-2 bg-perfecthire-100 text-perfecthire-800">{dept.headcount}</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-perfecthire-700 hover:text-perfecthire-900">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Team
            </Button>
          </div>

          {dept.open && (
            <div className="pl-6">
              {dept.teams.map((team) => (
                <div key={team.id}>
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-perfecthire-50"
                    onClick={() => toggleTeam(dept.id, team.id)}
                  >
                    <div className="flex items-center">
                      {team.open ? (
                        <ChevronDown className="h-4 w-4 text-perfecthire-600 mr-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-perfecthire-600 mr-2" />
                      )}
                      <h4 className="text-perfecthire-800">{team.name}</h4>
                      <Badge className="ml-2 bg-perfecthire-100 text-perfecthire-700 text-xs">{team.headcount}</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-perfecthire-600 hover:text-perfecthire-800">
                      <UserPlus className="h-3 w-3 mr-1" />
                      Add Role
                    </Button>
                  </div>

                  {team.open && (
                    <div className="pl-6 pb-2">
                      {team.roles.map((role) => (
                        <div key={role.id} className="flex items-center justify-between py-2 px-3">
                          <div className="flex items-center">
                            <span className="w-4 h-4 mr-2"></span>
                            <span className="text-perfecthire-700">{role.title}</span>
                          </div>
                          <Badge className="bg-perfecthire-50 text-perfecthire-700 text-xs">{role.count}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

